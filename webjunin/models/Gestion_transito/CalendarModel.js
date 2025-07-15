import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const CalendarModel = sequelize.define('Calendarizacion',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    mes:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estadoEliminado:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro:{
        type: DataTypes.DATE,
        allowNull: false
    }
},{
    tableName: 'transito_calendarizacion',
    schema: 'esq_transito',
    timestamps: false
});