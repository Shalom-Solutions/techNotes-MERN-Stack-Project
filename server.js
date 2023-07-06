const express = require("express");
const app = express();
const path = require("path");
const {logger} = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const cookieParser = require('cookie-parser')
const PORT =  process.env.PORT || 3500

app.use(logger);
app.use(cors(corsOptions));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/', require('./routes/root'));


app.all('*', require('./routes/404'));


app.use(errorHandler);
app.listen(PORT, () => console.log(`server running at ${PORT}`));