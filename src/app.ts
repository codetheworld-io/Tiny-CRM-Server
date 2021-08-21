import express, { Router } from 'express';
import callStateController from './controllers/call.state.controller';
import * as path from 'path';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(process.env.PUBLIC_DIR as string, 'index.html'));
});

const router = Router();
router.post('/call-states', callStateController.handleNewCallState);

app.use('/api/v1', router);

export default app;
