import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas que  NÃO precisam de autenticação
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

// Rotas que precisam de autenticação
routes.put('/users', UserController.update);
routes.get('/providers', ProviderController.index);

// Appointments
routes.post('/appointments', AppointmentController.store);
routes.get('/appointments', AppointmentController.index);
routes.delete('/appointments/:id', AppointmentController.delete);

// Schedule
routes.get('/schedule', ScheduleController.index);

// Notification
routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

// Rota para upload, utiliza o multer como middleare, para gerenciar o upload
routes.post('/files', upload.single('file'), FileController.store);

export default routes;
