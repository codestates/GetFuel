import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import authRouter from './router/auth.js';
import boardRouter from './router/posts.js';
<<<<<<< HEAD
import commentRouter from './router/comment.js';
=======
>>>>>>> 97294cb8bc4bcded2ddc441b01149617a3d93e27
import { connectDB } from './database/database.js';
import { config } from './configuration/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/posts', boardRouter);
<<<<<<< HEAD
app.use('/comment', commentRouter);
=======
>>>>>>> 97294cb8bc4bcded2ddc441b01149617a3d93e27

app.use((error, req, res, next) => {
  if (error) {
    console.log(error);
    res.status(500).json({ message: 'Something Wrong!!!' });
  }
});

connectDB().then(() => {
  console.log('init!');
  app.listen(config.host.port);
});
<<<<<<< HEAD
=======

>>>>>>> 97294cb8bc4bcded2ddc441b01149617a3d93e27
