import { Router } from 'express';
import v1 from './routers';

const api = Router();

api.use('/v1', v1);

export default api;
