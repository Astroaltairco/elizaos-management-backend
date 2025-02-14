// import { Request, Response } from 'express';
// import { z } from 'zod';
// import { createMTProto, callTelegramAPI } from '@/services/MTProto';
// import { getConnectedRedisClient } from '@/redis/client';

// const verifyCodeSchema = z.object({
//   input: z.object({
//     input: z.object({
//       userId: z.string(),
//     }),
//   }),
// });

// export const getUserChats = async (req: Request, res: Response) => {
//   try {
//     const { input } = verifyCodeSchema.parse(req.body);
//     const { userId } = input.input;
//     const redisClient = await getConnectedRedisClient();

//     const sessionFile = await redisClient.get(`telegram_session:${userId}`);
//     if (!sessionFile) {
//       console.error(`Session file for user ${userId} not found.`);
//       return;
//     }
//     console.log(`Session file for user ${userId}: ${sessionFile}`);
//     const mtproto = createMTProto(userId);

//     const result = await callTelegramAPI(mtproto, 'messages.getDialogs', {
//       offset_date: 0,
//       offset_id: 0,
//       limit: 100,
//       offset_peer: { _: 'inputPeerEmpty' },
//     });

//     if (!result || !result.chats) {
//       console.error(
//         'Failed to retrieve chats. Result is undefined or malformed.'
//       );
//       return [];
//     }

//     const chats = result.chats.map((chat: any) => ({
//       id: chat.id,
//       title: chat.title,
//       type: chat._,
//     }));

//     res.status(200).json({
//       chats,
//       success: true,
//     });
//   } catch (error) {
//     console.error(error);
//     if (error instanceof Error) {
//       res.status(400).json({ message: error.message });
//     } else {
//       res.status(400).json({ message: 'An unknown error occurred', error });
//     }
//   }
// };
