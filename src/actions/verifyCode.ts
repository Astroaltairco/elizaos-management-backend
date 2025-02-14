// import { Request, Response } from 'express';
// import { z } from 'zod';
// import { createMTProto, callTelegramAPI } from '@/services/MTProto';
// import { getConnectedRedisClient } from '@/redis/client';
// import fs from 'fs';
// import path from 'path';

// const verifyCodeSchema = z.object({
//   input: z.object({
//     input: z.object({
//       phoneNumber: z.string(),
//       phoneCode: z.string(),
//     }),
//   }),
// });

// export const verifyCode = async (req: Request, res: Response) => {
//   try {
//     const { input } = verifyCodeSchema.parse(req.body);
//     const { phoneNumber, phoneCode } = input.input;
//     const redisClient = await getConnectedRedisClient();

//     const phone_code_hash = await redisClient.get(
//       `phone_code_hash:${phoneNumber}`
//     );
//     if (!phone_code_hash)
//       return res.status(400).json({ error: 'Invalid or expired code' });

//     const sessionFile = await redisClient.get(
//       `telegram_session:${phoneNumber}`
//     );
//     if (!sessionFile)
//       return res
//         .status(400)
//         .json({
//           error: 'Session file not found. Please request a new login code.',
//         });

//     const mtproto = createMTProto(phoneNumber);

//     const signInResult = await callTelegramAPI(mtproto, 'auth.signIn', {
//       phone_number: phoneNumber,
//       phone_code: phoneCode,
//       phone_code_hash,
//     });

//     console.log(signInResult);

//     if (signInResult._ === 'auth.authorizationSignUpRequired') {
//       return res.status(401).json({ error: 'Account requires signup' });
//     }

//     const userId = signInResult.user.id;
//     const newSessionFile = `session_${userId}.json`;

//     renameSessionFile(
//       path.join(ensureSessionDirectory(), sessionFile),
//       path.join(ensureSessionDirectory(), newSessionFile)
//     );

//     await redisClient.set(`telegram_session:${userId}`, newSessionFile);
//     await redisClient.set(
//       `telegram:user:${userId}`,
//       JSON.stringify(signInResult.user)
//     );
//     await redisClient.del(`telegram_session:${phoneNumber}`);

//     res.status(200).json({
//       sessionFile: newSessionFile,
//       userId,
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

// const renameSessionFile = (oldPath: string, newPath: string) => {
//   if (fs.existsSync(oldPath)) {
//     fs.renameSync(oldPath, newPath);
//   }
// };

// const ensureSessionDirectory = () => {
//   const sessionDir = path.resolve(__dirname, '../sessions');
//   if (!fs.existsSync(sessionDir)) {
//     fs.mkdirSync(sessionDir, { recursive: true });
//   }
//   return sessionDir;
// };
