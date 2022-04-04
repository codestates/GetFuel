import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import authRouter from './router/auth.js';
import boardRouter from './router/posts.js';
import opinetRouter from './router/opinet.js';
import { connectDB } from './database/database.js';
import { config } from './configuration/config.js';
import googleOauthHandler from './controller/sesstionController.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.use(
//   cors({
//     origin: ['http://localhost:3000'],
//     credentials: true,
//     methods: ['GET', 'POST', 'OPTIONS']
//   })
// );
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(cookieParser());



app.use('/auth', authRouter);
app.use('/posts', boardRouter);
app.use('/opinet', opinetRouter);
app.get('/api/sessions/oauth/google', googleOauthHandler);

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
