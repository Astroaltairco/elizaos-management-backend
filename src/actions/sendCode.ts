// import { Request, Response } from 'express';
// import { z } from 'zod';
// import { createMTProto, callTelegramAPI } from '@/services/MTProto';
// // import { getConnectedRedisClient } from '@/redis/client';

// const sendCodeSchema = z.object({
//   input: z.object({
//     input: z.object({
//       phoneNumber: z.string(),
//     }),
//   }),
// });

// export const sendCode = async (req: Request, res: Response) => {
//   try {
//     const { input } = sendCodeSchema.parse(req.body);
//     const { phoneNumber } = input.input;
//     const mtproto = createMTProto(phoneNumber);
//     const sessionFile = `session_${phoneNumber}.json`;
//     console.log(phoneNumber);
//     const result = await callTelegramAPI(mtproto, 'auth.sendCode', {
//       phone_number: phoneNumber,
//       settings: { _: 'codeSettings' },
//     });

//     console.log(result);

//     // const redisClient = await getConnectedRedisClient();
//     await redisClient.set(
//       `phone_code_hash:${phoneNumber}`,
//       result.phone_code_hash,
//       {
//         EX: 300,
//       }
//     ); // Expire in 5 minutes
//     await redisClient.set(`telegram_session:${phoneNumber}`, sessionFile);
//     res.status(200).json({
//       message: 'Code sent successfully',
//       phoneCodeHash: result.phone_code_hash,
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
