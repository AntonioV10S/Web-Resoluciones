import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const Tipo_resolucionModel = sequelize.define('TipoResolucion',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull:false
    },
    descripcion:{
        type: DataTypes.STRING,
        allowNull:false
    },
    estadoEliminado: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
}

},{
    tableName: 'tipo_resolucion',
    schema: 'esq_resoluciones',
    timestamps: false
});