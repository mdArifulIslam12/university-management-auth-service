import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/users/user.router';
import gobalErrorHandler from './app/middlewares/gobalErrorHandler';
// import ApiError from './errors/ApiError'
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom router
app.use('/api/v1/users', UserRoutes);

// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
// Promise.reject(new Error('Unhanlder error'))
// throw new Error('this not able')
// res.send('sdfsdf')
// })

// gobal error handler
app.use(gobalErrorHandler);

export default app;
