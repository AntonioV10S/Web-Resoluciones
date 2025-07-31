import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const LocalModel = sequelize.define('Local', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  estadoEliminado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true
  },
  id_tipo_local:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
  ubicacion: {
        type: DataTypes.STRING,
        allowNull: true
  },
  
}, {
  tableName: 'local',
  schema: 'esq_local',
  timestamps: false
});
