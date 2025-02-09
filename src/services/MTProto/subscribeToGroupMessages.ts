import { createMTProto, callTelegramAPI } from '@/services/MTProto';
import { getConnectedRedisClient } from '@/redis/client';
import { sendMessage } from './sendMessage';

interface SubscribeToGroupMessagesInput {
  userId: string;
  chatId: string;
}

const initializeUpdates = async (mtproto: any) => {
  try {
    await callTelegramAPI(mtproto, 'updates.getState', {});
    console.log('Update listener initialized.');
  } catch (error) {
    console.error('Error initializing updates:', error);
  }
};

export const subscribeToGroupMessages = async ({
  userId,
  chatId,
}: SubscribeToGroupMessagesInput) => {
  console.info(
    `Subscribing to group messages for user ${userId} in chat ${chatId}`
  );
  const redisClient = await getConnectedRedisClient();
  const sessionFile = await redisClient.get(`telegram_session:${userId}`);
  if (!sessionFile) {
    console.error(`Session file for user ${userId} not found.`);
    return;
  }

  const mtproto = createMTProto(userId);

  await initializeUpdates(mtproto);

  mtproto.updates.on('updates', async (update: any) => {
    if (update.updates) {
      for (const updateItem of update.updates) {
        if (updateItem._ === 'updateNewChannelMessage' && updateItem.message) {
          const chatIdFromUpdate = update.chats?.find(
            (chat: any) => chat.id === chatId
          );

          if (chatIdFromUpdate) {
            console.log(
              `New message in group ${chatId}:`,
              updateItem.message.message
            );

            await callTelegramAPI(mtproto, 'messages.sendMessage', {
              peer: {
                _: 'inputPeerChannel',
                channel_id: chatId,
                access_hash: chatIdFromUpdate.access_hash,
              },
              message: 'Hello from the bot!',
              random_id: Math.floor(Math.random() * 1000000000),
              reply_to_msg_id: updateItem.message.id,
            });
            // await redis.xadd("telegram_messages", "*",
            //     "user_id", user_id,
            //     "chat_id", chatId,
            //     "message", updateItem.message.message,
            //     "timestamp", Date.now()
            // );
          }
        }
      }
    }
  });
};
