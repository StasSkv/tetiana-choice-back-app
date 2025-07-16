import { Router } from 'express';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
  getCurrentUserController,
} from '../../controllers/auth/auth.js';
import { loginUserSchema, registerUserSchema } from '../../validation/auth.js';
import { validateBody } from '../../middlewares/validateBody.js';
import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { authenticate } from '../../middlewares/authenticate.js';
import { updateUserSchema } from '../../validation/auth.js';
import { updateUserController } from '../../controllers/auth/auth.js';

const router = Router();

router.post(
  '/register',
  validateBody(registerUserSchema),
  ctrlWrapper(registerUserController),
);

router.post(
  '/login',
  validateBody(loginUserSchema),
  ctrlWrapper(loginUserController),
);

router.post('/logout', ctrlWrapper(logoutUserController));

router.post('/refresh', ctrlWrapper(refreshUserSessionController));

router.get('/current', ctrlWrapper(getCurrentUserController));

router.patch(
  '/update-user',
  authenticate,
  validateBody(updateUserSchema),
  ctrlWrapper(updateUserController),
);

export default router;
