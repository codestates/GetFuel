import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
<<<<<<< HEAD
import authRouter from './router/auth.js'
=======
import authRouter from './router/auth.js';
import boardRouter from './router/posts.js';
import opinetRouter from './router/opinet.js';
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
import { connectDB } from './database/database.js';
import { config } from './configuration/config.js';

const app = express();

app.use(express.json());
<<<<<<< HEAD
app.use(express.urlencoded( { extended: false } ));

app.use(cors());
=======
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
app.use(helmet());
app.use(morgan('tiny'));
app.use(cookieParser());

<<<<<<< HEAD
app.use('/auth', authRouter);

app.use((error, req, res, next) => {
  if(error) {
    console.log(error);
    res.status(500).json({ message : "Something Wrong!!!" })
  }
})

connectDB().then(() => {
  console.log('init!')
  app.listen(config.host.port);
})
=======


app.use('/auth', authRouter);
app.use('/posts', boardRouter);
app.use('/opinet', opinetRouter);

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
>>>>>>> 41250f9a6bbce0f8adcbd8279352b5defd2e06b0
