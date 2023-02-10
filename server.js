require('dotenv').config();
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log(`UNCAUGHT EXCEPTION - ${err.name}: ${err.message}`);
  process.exit(1);
});

const app = require('./app');

mongoose
  .connect(process.env.DATABASE_CONNECTION_STRING, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(`UNHANDLED REJECTION - ${err.name}: ${err.message}`);

  server.close(() => {
    process.exit(1);
  });
});
