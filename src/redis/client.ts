import { createClient } from 'redis';
import { REDIS_URL, REDIS_USERNAME, REDIS_PASSWORD } from '@/config';
import { sleep } from '@/utils/sleep';

export type resdisClientType = ReturnType<typeof createClient>;

const redisClient = createClient({
  url: REDIS_URL,
  // username: REDIS_USERNAME,
  // password: REDIS_PASSWORD,
});

redisClient.on('error', function (error) {
  console.error(`RedisClient Error`, error);
});

const retryDelay = (retryCount: number) =>
  Math.min(1000 * 2 ** retryCount, 30000);

export const getConnectedRedisClient = async () => {
  let retries = 0;
  const maxRetries = 5;

  while (!redisClient.isOpen && retries < maxRetries) {
    try {
      await redisClient.connect();
    } catch (error) {
      retries += 1;
      console.error(
        `RedisClient Connection Error. Retrying ${retries}/${maxRetries}`,
        error
      );
      if (retries === maxRetries) throw error;
      await sleep(retryDelay(retries));
    }
  }
  return redisClient;
};
