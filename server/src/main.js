require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');

const sequelize = require('./db.js');
const models = require('./Models/models.js');
const APIRouter = require('./Routes/index');
const errorHandling = require('./Middlewares/errorHandlingMiddleware');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', APIRouter);
app.use(errorHandling);



const main = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    })
  } catch (e) {
    console.log(e);
  }
};

main();

