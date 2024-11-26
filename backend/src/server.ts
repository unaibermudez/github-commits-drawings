import express, { Request, Response } from 'express';
import routes from './routes';
const colors = require('colors');



const app = express();
const port = process.env.PORT || 5000;

app.use(express.json()); // Middleware to parse JSON bodies

// Register routes
app.use('/api', routes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});


app.listen(port, () => {
  console.log(colors.green(`Server is running on http://localhost:${port}`)); 
});
