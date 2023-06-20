import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import gobalErrorHandler from './app/middlewares/gobalErrorHandler';
import routes from './app/routes';
import httpStatus from 'http-status';
const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// custom router
app.use('/api/v1', routes);

// testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   next(Promise.reject(new Error('Unhanlder error')));
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
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

// const academicSemesters = {
//   year: '2025',
//   code: '02',
// };

// const unity = async () => {
//   const result = await generateAdminId();
//   console.log(result);
// };
// unity();

export default app;
