import { Router } from 'express';
import { sendCode } from '@/actions/sendCode';
import { verifyCode } from '@/actions/verifyCode';
import { getUserChats } from '@/actions/getUserChats';

const router = Router();

router.post('/auth/send-code', sendCode);
// @ts-ignore
router.post('/user/chats', getUserChats);
// @ts-ignore
router.post('/auth/verify-code', verifyCode);

export default router;
