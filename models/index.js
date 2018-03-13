module.exports = (sequelize, DataTypes) => {
  const Region = sequelize.define('region', {
    name: DataTypes.STRING
  });

  const City = sequelize.define('city', {
    name: DataTypes.STRING,
    region_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Region,
        key: 'id'
      }
    }
  });

  const Object = sequelize.define('object', {
    name: DataTypes.STRING,
    short_description: DataTypes.STRING,
    full_description: DataTypes.TEXT,
    date_add: DataTypes.DATE,
    address: DataTypes.STRING,
    city_id: DataTypes.STRING
  });

  const Feature = sequelize.define('feature', {
    name: DataTypes.STRING,
    value: DataTypes.TEXT,
    object_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Object,
        key: 'id'
      }
    }
  });

  const Room = sequelize.define('room', {
    area: DataTypes.INTEGER,
    floor: DataTypes.INTEGER,
    cost_month_meter: DataTypes.INTEGER
  });

  Object.hasMany(Room);
  Object.hasMany(Feature);
  Object.belongsTo(City);

  City.hasMany(Object);
  City.belongsTo(Region);

  Region.hasMany(City);
  Room.belongsTo(Object);
  Feature.belongsTo(Object);

  return { Region, City, Object, Feature, Room };
};
