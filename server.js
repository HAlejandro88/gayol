const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');
const cors = require('cors');


dotenv.config({ path: './config/config.env' });

connectDB();

const auth = require('./routes/auth');
const List = require('./routes/ListaVenta');
const docs = require('./routes/documentsRoutes');
const masterList = require('./routes/MasterList');
const newsRoutes = require('./routes/news');

const app = express();

app.use(cors({origin: true, credentials: true}));
app.use(express.json());

app.use(cookieParser())

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// TODO: HACER UN MIDDLEWARE para subir archivos
// FIXME: BORRAR REQUIRES NO NECESARIOS

// routes 
app.use('/api/v1/auth/', auth);
app.use('/api/v1/listSales', List);
app.use('/api/v1/docs', docs);
app.use('/api/v1/master', masterList);
app.use('/api/v1/news', newsRoutes);

app.get('/',(req,res) => {
    res.status(200).json({
        success: true,
        data: {
            message: 'bienvendido a las apis de gayol'
        }
    })
})

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen( PORT,
                            console.log(`Serve runnig in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    server.close(() => process.exit(1));
})

