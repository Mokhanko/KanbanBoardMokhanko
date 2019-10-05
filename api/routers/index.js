import { Router } from 'express';
import { authRouter, cardRouter, listRouter } from './v1';

const v1 = Router();
v1.use('/auth', authRouter);
v1.use('/card', cardRouter);
v1.use('/list', listRouter);

export default v1;
