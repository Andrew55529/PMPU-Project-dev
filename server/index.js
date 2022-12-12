require('dotenv').config()
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const router = require('./router/index')
const errorMidleware = require('./middlewares/error-middleware')
const useragent = require('express-useragent');

const PORT =process.env.PORT || 5000;

const app = express()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(useragent.express());

app.use('/api', router);
app.use(errorMidleware);

const start = async () => {
    try {
        app.listen(PORT,console.log(`Server started on PORT = ${PORT}`), '0.0.0.0')
    } catch (e) {
        console.log(e);

    }
}

start()