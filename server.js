
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import middlewares from './middlewares';
import metric from './controllers/metric'

const app = express();

app.use(middlewares);
app.use('/api/v1/metric', metric);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
