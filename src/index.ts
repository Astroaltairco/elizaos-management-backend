import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
// import { subscribeToGroupMessages } from './services/MTProto/subscribeToGroupMessages';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4002;

// subscribeToGroupMessages({
//   userId: '6497995612',
//   chatId: '2329713805',
// });

app.use(cors());
app.use(express.json());
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
