import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import api from './api';
import db from './services/db';
import config from './config'

const app = express();
const server = app.listen(5000);

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);
app.get('/', (req, res) => res.send('Server is running!'));
