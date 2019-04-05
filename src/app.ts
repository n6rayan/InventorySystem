import * as express from 'express';
import * as bodyParser from 'body-parser';
import { routes } from './routes/routes';

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(routes);

app.listen(port);

export default app;