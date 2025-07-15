import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const YearModel = sequelize.define('Year',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    year: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'year',
    schema: 'esq_mesYear',
    timestamps:false
})