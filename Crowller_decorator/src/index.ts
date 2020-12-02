import express from 'express';
import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import './controller/login';
import './controller/crowller';
import router from './router';

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(
    cookieSession({
      name: 'session',
      keys: ['dddd'],
      maxAge: 24 * 60 * 60 * 1000
    })
);

app.use(router);

app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(7001, () => {
    console.log('server is running')
})
