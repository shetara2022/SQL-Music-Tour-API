'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage_Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Stage_Event.init({
    stage_event_id: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }, {
    sequelize,
    modelName: 'Stage_Event',
    tableName: 'stage_events',
    timestamps: false
  });
  return Stage_Event;
};