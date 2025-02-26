import { updateAgentElizaOS } from "@/services/elizaOSClient";

import { Request, Response } from 'express';
import { z } from 'zod';
import db from '@/db';
import { stopAgentElizaOS } from '@/services/elizaOSClient';

const characterStyleSchema = z.object({
  all: z.array(z.string()),
  chat: z.array(z.string()),
  post: z.array(z.string())
});

const characterSettingsVoiceSchema = z.object({
  model: z.string()
});

const characterSettingsSecretsSchema = z.object({
  TWITTER_EMAIL: z.string().optional(),
  OPENAI_API_KEY: z.string().optional(),
  TWITTER_PASSWORD: z.string().optional(),
  TWITTER_USERNAME: z.string().optional()
});

const characterSettingsSchema = z.object({
  voice: characterSettingsVoiceSchema,
  secrets: characterSettingsSecretsSchema.optional(),
  embeddingModel: z.string().optional()
});

const characterSchema = z.object({
  bio: z.string(),
  lore: z.array(z.string()),
  name: z.string(),
  style: characterStyleSchema,
  system: z.string(),
  topics: z.array(z.string()),
  clients: z.array(z.string()),
  plugins: z.array(z.string()),
  settings: characterSettingsSchema,
  knowledge: z.array(z.string()),
  adjectives: z.array(z.string()),
  postExamples: z.array(z.string()),
  modelProvider: z.string(),
  messageExamples: z.array(z.string())
});

const sendCodeSchema = z.object({
  input: z.object({
    input: z.object({
      characterId: z.string(),
      character: characterSchema,
    }),
  }),
});

export const updateAgent = async (req: Request, res: Response) => {
  try {
    const { input } = sendCodeSchema.parse(req.body);
    const { characterId, character } = input.input;

    const characterRecord = await db('characters')
      .where('id', characterId)
      .first();

    if (!characterRecord || !characterRecord.agent_id) {
      console.error(
        'Failed to retrieve agent. Result is undefined or malformed.'
      );
      return [];
    }

    const response = await updateAgentElizaOS({
      agentId: characterRecord.agent_id,
      characterJson: character
    });

    if (!response) {
      console.error('Failed to update agent. Result is undefined or malformed.');
      return [];
    }

    const result = await db('characters')
      .where('id', characterId)
      .update({
        updated_at: new Date()
      })
      .returning('*');

    res.status(200).json({
      id: result[0].id,
      agentId: result[0].id,
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
