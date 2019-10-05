import mongoose from 'mongoose';
import config from '../config';

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true, useCreateIndex: true });
mongoose.set('useFindAndModify', false);

const gracefulShutdown = (msg, callback) => {
  mongoose.connection.close(() => {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  })
};

mongoose.connection.on('error', err => {
  console.log({ event: 'mongoose:error', err });
  process.exit(0);
});

mongoose.connection.on('connected', () => console.log({ event: 'mongoose:connected' }));
mongoose.connection.on('disconnected', () => console.log({ event: 'mongoose:disconnected' }));
mongoose.connection.on('reconnected', () => console.log({ event: 'mongoose:reconnected' }));
process.once('SIGUSR2', () => {
  gracefulShutdown('nodemon restart', () => {
    process.kill(process.pid, 'SIGUSR2');
  });
});
process.on('SIGINT', () => {
  gracefulShutdown('app termination', () => {
    process.exit(0);
  });
});
process.on('SIGTERM', () => {
  gracefulShutdown('Heroku app shutdown', () => {
    process.exit(0);
  });
});
