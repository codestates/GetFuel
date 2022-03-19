import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import 'express-async-errors';
import authRouter from './router/auth.js'
import { connectDB } from './database/database.js';
import { config } from './configuration/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));

app.use('/auth', authRouter);

app.use((error, req, res, next) => {
  if(error) {
    console.log(error);
    res.status(500).json({ message : "Something Wrong!!!" })
  }
})

connectDB().then(() => {
  console.log('connet!')
  app.listen(config.host.port);
})