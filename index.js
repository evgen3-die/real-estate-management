const express = require('express');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const sequelize = new Sequelize('real_estate', 'root', '', {
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  }
});
const models = require('./models')(sequelize, Sequelize);

app.get('/api/object-cards', (req, res) => {
  models.Object.findAll({
    include: [
      models.Feature,
      models.Room,
      { model: models.City, include: [models.Region] }
    ],
    order: [
      ['date_add', 'DESC']
    ]
  }).then((objects) => {
    res.send(objects);
  });
});

app.get('/api/object-card/:id', (req, res) => {
  models.Object.find({
    where: { id: req.params.id },
    include: [
      models.Feature,
      models.Room,
      { model: models.City, include: [models.Region] }
    ]
  }).then((object) => {
    res.send(object);
  });
});

app.post('/api/object-card/', (req, res) => {
  models.Object.create({
    name: req.body.name,
    short_description: req.body.short_description,
    full_description: req.body.full_description,
    address: req.body.address,
    city_id: req.body.city_id,
    Feature: req.body.features,
    Room: req.body.rooms
  }, { include: [models.Feature, models.Room] })
    .then((object) => {
      req.body.features.forEach(feature => {
        models.Feature.create({
          name: feature.name,
          value: feature.value,
          object_id: object.id
        });
      });

      req.body.rooms.forEach(room => {
        models.Room.create({
          area: room.area,
          floor: room.floor,
          cost_month_meter: room.cost_month_meter,
          object_id: object.id
        });
      });
    });
});

app.get('/api/city/', (req, res) => {
  models.City.findAll({
    limit: 5,
    where: {
      name: sequelize.where(sequelize.fn('LOWER', sequelize.col('name')), 'LIKE', `%${req.query.query}%`)
    }
  }).then((cities) => {
    res.send(cities);
  });
});

app.listen(3000, () => console.log('app listening on port 3000!'));
