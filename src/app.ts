import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.router';
const app: Application = express();

//perser
//perser
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users/', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World! # Mongoose-Express-CRUD-Mastery');
});

export default app;
