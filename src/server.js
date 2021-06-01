const mongoose = require('mongoose');
require('dotenv').config();

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

// process.on('uncaughtException', err => {
//   console.log(err.name, err.message);
//   console.log('Uncaught exception!  -- SHUTTING DOWN....');
//   process.exit(1);
// });

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

// process.on('unhandledRejection', err => {
//   console.log(err.name, err.message);
//   console.log('Unhandled rejection!  -- SHUTTING DOWN....');
//   server.close(() => {
//     process.exit(1);
//   });
// });

// process.on('SIGTERM', () => {
//   console.log('SIGTERM received. Shutting down gracefully');
//   server.close(() => {
//     console.log('Process terminated')
//   })
// })
