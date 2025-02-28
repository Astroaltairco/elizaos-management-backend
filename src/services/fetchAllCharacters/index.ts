import { Request, Response } from 'express';
import db from '@/db';

export const fetchAllCharacters = async (req: Request, res: Response) => {
  try {
    const characters = await db('characters')
      .select('*')
      .where('is_active', true);

    if (!characters) {
      console.error(
        'Failed to retrieve characters. Result is undefined or malformed.'
      );
      return [];
    }

    const data = characters.map((character: any) => ({
      ...character.character,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: 'An unknown error occurred', error });
    }
  }
};
