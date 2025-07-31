import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const TipoLocalModel = sequelize.define('tipo_boletin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadoEliminado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }
}, {
  tableName: 'tipo_local',
  schema: 'esq_local', 
  timestamps: false,
});