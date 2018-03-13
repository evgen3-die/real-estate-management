const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
const Sequelize = require('sequelize');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

const sequelize = new Sequelize('real_estate', 'root', '', {
  dialect: 'mysql',
  define: {
    freezeTableName: true,
    timestamps: false,
    underscored: true
  }
});
const models = require('./models')(sequelize, Sequelize);
require('./passport')(passport, models.User);

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

app.delete('/api/object-card/:id', (req, res) => {
  if (req.isAuthenticated()) {
    models.Object.destroy({
      where: { id: req.params.id },
      include: [
        models.Feature,
        models.Room
      ]
    }).then((status) => {
      res.sendStatus(status ? 200 : 500);
    });
  }
});

app.post('/api/object-card/', (req, res) => {
  if (req.isAuthenticated()) {
    models.Object.create({
      name: req.body.name,
      short_description: req.body.short_description,
      full_description: req.body.full_description,
      address: req.body.address,
      city_id: req.body.city_id,
      user_id: req.user.id,
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
  }
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

const withoutRedirect = (name) => {
  return (req, res, next) => {
    passport.authenticate(name, function (err, account) {
      req.logIn(account, function() {
        res.status(err ? 500 : 200).send(err ? err : account);
      });
    })(req, res, next);
  };
};

app.post('/api/register', withoutRedirect('local-register'));
app.post('/api/login', withoutRedirect('local-login'));
app.get('/api/check-login', (req, res) => res.send(req.isAuthenticated()));
app.get('/api/logout', (req, res) => req.session.destroy());

app.listen(3000, () => console.log('app listening on port 3000!'));
