import { Router } from 'express';
import { createUserController } from './services/CreateUser';


const router = Router();

router.post('/users', (req, res) => {
    return createUserController.handle(req, res);
});

export { router };