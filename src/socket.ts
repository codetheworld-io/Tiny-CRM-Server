import { Server } from 'socket.io';
import * as http from 'http';

let io: Server;

export function initSocketIo(server: http.Server) {
  if (io) {
    return;
  }

  io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected', socket.id);
  });
}

export function emitCallStateChange(data: {
  customerId: string,
  customerName: string,
  phone: string,
  state: string,
  date: string,
}) {
  if (!io) {
    return;
  }

  io.emit('call_state_change', data);
}
