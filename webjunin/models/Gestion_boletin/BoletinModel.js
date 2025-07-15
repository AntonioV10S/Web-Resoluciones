import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";
import {Tipo_BoletinModel} from "../../models/Gestion_boletin/Tipo_boletinModel.js";


export const BoletinModel = sequelize.define('Tipo_Boletin',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    imagen:{
        type: DataTypes.STRING,
        allowNull: false
    },
    fechamax_mostrar:{
        type: DataTypes.DATE,
        allowNull: false
    },
    id_tipo_boletin:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mensaje:{
        type: DataTypes.STRING,
        allowNull: false
    },
    estadoEliminado:{
        type: DataTypes.BOOLEAN,
        allowNull:false
    },
    fechaRegistro:{
        type: DataTypes.DATE,
        allowNull:false
    }
},{
    tableName: 'boletin',
    schema: 'esq_boletin',
    timestamps: false
});

BoletinModel.belongsTo(Tipo_BoletinModel,{
    foreignKey: 'id_tipo_boletin'
});




