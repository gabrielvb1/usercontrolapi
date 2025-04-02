import { Router } from 'express';   
import Users from '../controller/Users';
import loginAuth from '../middleware/LoginAuth';

const router = Router();

router.post('/signup', Users.signUp);
router.post('/login', Users.login);
router.use(loginAuth);
router.get('/users', Users.getAllUsers)
router.post('/users', Users.createUserByLoggedUser);
router.put('/users/:id', Users.updateUser); 
router.delete('/users/:id', Users.deleteUser)

export default router;