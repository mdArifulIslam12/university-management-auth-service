import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import gobalErrorHandler from './app/middlewares/gobalErrorHandler';
import routes from './app/modules/routes';
import httpStatus from 'http-status';
// import ApiError from './errors/ApiError'
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom router
app.use('/api/v1', routes);

// testing
// app.get('/', (req: Request, res: Response, next: NextFunction) => {
// Promise.reject(new Error('Unhanlder error'))
// throw new Error('this not able');
// throw new ApiError(400, 'dessfd sdfdsfsd ');
// res.send('sdfsdf')
// });

// gobal error handler
app.use(gobalErrorHandler);

// handle not route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'University route not found!',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Api not found!',
      },
    ],
  });
  next();
});

export default app;
