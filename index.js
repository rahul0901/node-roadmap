import express from 'express';
import route from './Routes/index.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';

const app = express();
dotenv.config();
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', function(req, res){
    res.send('hi from backend');
});

app.use('/api/v1', route);

mongoose.connect(process.env.MongoUrl).then(()=>console.log('Database Connected!'));

app.listen(8000, ()=> console.log('Server running on 8000'));