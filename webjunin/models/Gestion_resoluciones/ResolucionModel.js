import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";
import { Tipo_resolucionModel } from "../Gestion_resoluciones/Tipo_resolucionModel.js";

export const ResolucionModel = sequelize.define('Resolucion',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true,
        allowNull: false
    },
    descripcion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estadoEliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dia_publicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tipo_resolucion: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'resolucion',
    schema: 'esq_resoluciones',
    timestamps: false
});

ResolucionModel.belongsTo(Tipo_resolucionModel,{
    foreignKey: 'id_tipo_resolucion'
});