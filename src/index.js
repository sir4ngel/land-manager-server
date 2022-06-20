const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const { errorHandler } = require('./middlewares');
const landRoutes = require('./routes/lands.routes')

const PORT = 3001;

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(landRoutes);
app.use(errorHandler);

app.listen(PORT);