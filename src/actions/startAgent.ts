import { Request, Response } from 'express';
import { z } from 'zod';
import db from '@/db';
import { startAgentElizaOS } from '@/services/elizaOSClient';
import { start } from 'repl';
import { create } from 'domain';

const sendCodeSchema = z.object({
  input: z.object({
    input: z.object({
      characterId: z.string(),
    }),
  }),
});

export const startAgent = async (req: Request, res: Response) => {
  try {
    const { input } = sendCodeSchema.parse(req.body);
    const { characterId } = input.input;

    const character = await db('characters').where('id', characterId).first();

    if (!character) {
      console.error(
        'Failed to retrieve character. Result is undefined or malformed.'
      );
      return [];
    }

    const response = await startAgentElizaOS({
      characterJson: character.character as string,
    });

    if (!response) {
      console.error('Failed to start agent. Result is undefined or malformed.');
      return [];
    }

    const result = await db('characters')
      .where('id', characterId)
      .update({
        agent_id: response.id,
        is_active: true,
        start_at: new Date(),
      })
      .returning('*');

    res.status(200).json({
      id: result[0].id,
      agentId: result[0].agentId,
      character: result[0].character,
      isPublished: result[0].is_published,
      isActive: result[0].is_active,
      startAt: result[0].start_at,
      stopAt: result[0].stop_at,
      createdAt: result[0].created_at,
      updatedAt: result[0].updated_at,
      deletedAt: result[0].deleted_at,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred', error });
    }
  }
};
