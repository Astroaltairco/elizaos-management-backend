// import { createMTProto, callTelegramAPI } from '@/services/MTProto';
// import { getConnectedRedisClient } from '@/redis/client';

// export const sendMessage = async ({
//   userId,
//   chatId,
//   message,
//   accessHash,
// }: {
//   userId: string;
//   chatId: string;
//   message: string;
//   accessHash: string;
// }) => {
//   const redisClient = await getConnectedRedisClient();

//   const sessionFile = await redisClient.get(`telegram_session:${userId}`);
//   if (!sessionFile) {
//     console.error(`Session file for user ${userId} not found.`);
//     return;
//   }

//   const mtproto = createMTProto(userId);

//   try {
//     await callTelegramAPI(mtproto, 'messages.sendMessage', {
//       peer: { _: 'inputPeerChannel', channel_id: chatId, accessHash },
//       message: message,
//       random_id: Math.floor(Math.random() * 1000000000),
//     });
//     console.log(`Replied to group ${chatId} with: ${message}`);
//   } catch (error) {
//     console.error('Failed to send reply:', error);
//   }
// };
