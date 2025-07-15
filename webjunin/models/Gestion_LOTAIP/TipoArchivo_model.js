import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const TipoArchivoModel = sequelize.define('TipoArchivo',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estadoEliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    indice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    icono_tipo_archivo: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    tableName: 'tipo_archivo',
    schema: 'esq_LOTAIP',
    timestamps: false
});