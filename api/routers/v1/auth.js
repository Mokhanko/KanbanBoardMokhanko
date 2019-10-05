import { Router } from 'express';
import { auth } from './../../controllers';

const authRouter = Router();

authRouter.post('/register', auth.register);
authRouter.post('/sign_in', auth.sign_in);

export default authRouter;
