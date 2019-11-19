import io from 'socket.io-client';

const socket = io('http://127.0.0.1:8000/', {
  transports: ['websocket'],
  forceNew: true,
});

socket.on('reconnect_attempt', () => {
  socket.io.opts.transports = ['polling', 'websocket'];
});

function authenticate(cb) {
  socket.on('allow_access', info => cb(null, info));
  socket.emit('auth', 'let me in');
}

const newOrder = (fnc) => {
  socket.on('new_orders', (a) => {
    fnc(a);
  })
}

const updatedOrder = (fnc) => {
  socket.on('order_updated', (a) => {
    fnc(a);
  })
}

const deletedOrder = (fnc) => {
  socket.on('order_deleted', (a) => {
    fnc(a);
  })
}


export { authenticate, newOrder, updatedOrder, deletedOrder };
