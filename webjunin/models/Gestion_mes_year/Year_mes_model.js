import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";
import { YearModel } from "../Gestion_mes_year/Year_model.js"

export const YearMesModel = sequelize.define('YearMes',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    }, 
    mes: {
        type: DataTypes.STRING,
        allowNull: false
    },
    id_year: {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'year_mes',
    schema: 'esq_mesYear',
    timestamps: false
});

YearMesModel.belongsTo(YearModel,{
    foreignKey: 'id_year'
});