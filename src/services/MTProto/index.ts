// // @ts-ignore
// import MTProto from '@mtproto/core';
// import { TELEGRAM_API_HASH, TELEGRAM_API_ID } from '@/config';
// import path from 'path';
// import { sleep } from '@/utils/sleep';

// export const createMTProto = (userId: string): any => {
//   return new MTProto({
//     api_id: TELEGRAM_API_ID,
//     api_hash: TELEGRAM_API_HASH,
//     storageOptions: {
//       path: path.resolve(__dirname, `../../sessions/session_${userId}.json`),
//     },
//   });
// };

// export const callTelegramAPI = async (
//   mtproto: MTProto,
//   method: string,
//   params: any,
//   options: any = {}
// ): Promise<any> => {
//   try {
//     return await mtproto.call(method, params, options);
//   } catch (error: any) {
//     console.log(`${method} error:`, error);

//     const { error_code, error_message } = error;

//     if (error_code === 420) {
//       const seconds = Number(error_message.split('FLOOD_WAIT_')[1]);
//       const ms = seconds * 1000;
//       await sleep(ms);
//       return callTelegramAPI(mtproto, method, params, options);
//     }

//     if (error_code === 303) {
//       const [type, dcIdAsString] = error_message.split('_MIGRATE_');
//       const dcId = Number(dcIdAsString);

//       if (type === 'PHONE') {
//         await mtproto.setDefaultDc(dcId);
//       } else {
//         Object.assign(options, { dcId });
//       }
//       return callTelegramAPI(mtproto, method, params, options);
//     }

//     return Promise.reject(error);
//   }
// };
