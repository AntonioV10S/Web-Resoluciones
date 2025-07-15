import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const Tipo_BoletinModel = sequelize.define('TipoBoletin',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull:false
    },
    estadoEliminado:{
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
},{
    tableName: 'tipo_boletin',
    schema: 'esq_boletin',
    timestamps: false
});