const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
const sequelize = new Sequelize('real_estate', 'root', '', {
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  }
});

const models = require('./models')(sequelize, Sequelize);

app.use(cors());

app.get('/api/object-cards', (req, res) => {
  models.Object.findAll({
    include: [{ all: true }]
  }).then((objects) => {
    res.send(objects);
  });
});

app.get('/api/object-card/:id', (req, res) => {
  models.Object.find({
    where: { id: req.params.id },
    include: [{ all: true }]
  }).then((object) => {
    res.send(object);
  });
});

app.listen(3000, function () {
  console.log('app listening on port 3000!');
});
