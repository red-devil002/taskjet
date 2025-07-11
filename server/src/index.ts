//route dircktory: server/src/routes for our backend.
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';

// Route Imports
import projectRoutes from './routes/project.routes';
import taskRoutes from './routes/task.routes';

// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());


// Routes
app.get('/', (req, res) => {
  res.send('This is the home route!');
});

app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);

// Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


