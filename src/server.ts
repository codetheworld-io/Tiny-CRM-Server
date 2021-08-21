import * as http from 'http';
import dotenv from 'dotenv';
import app from './app';
import mongoose from 'mongoose';
import { initSocketIo } from './socket';

(async () => {
  dotenv.config();

  const server = http.createServer(app);

  await mongoose.connect(process.env.MONGO_URI as string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  initSocketIo(server);

  server.listen(process.env.PORT, () => {
    console.log(`listening on *: ${process.env.PORT}`);
  });
})();

