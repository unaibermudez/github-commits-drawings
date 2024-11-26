import express, { Request, Response } from 'express';
import routes from './routes';


const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies

// Register routes
app.use('/api', routes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
