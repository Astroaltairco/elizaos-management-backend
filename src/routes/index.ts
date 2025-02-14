// @ts-ignore

import { Router } from 'express';
// import { sendCode } from '@/actions/sendCode';
// import { verifyCode } from '@/actions/verifyCode';
// import { getUserChats } from '@/actions/getUserChats';

import { fetchAllCharacters } from '@/services/fetchAllCharacters';
import { startAgent } from '@/actions/startAgent';
import { stopAgent } from '@/actions/stopAgent';

const router = Router();
//
// router.post('/auth/send-code', sendCode);
// @ts-ignore
// router.post('/user/chats', getUserChats);
// @ts-ignore
// router.post('/auth/verify-code', verifyCode);

router.get('/characters', fetchAllCharacters);
// @ts-ignore
router.post('/start-agent', startAgent);

// @ts-ignore
router.post('/stop-agent', stopAgent);

export default router;
