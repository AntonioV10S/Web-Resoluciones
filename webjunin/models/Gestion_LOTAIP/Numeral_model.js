import { DataTypes } from "sequelize";
import { sequelize } from '../../database/pg_conection.js';

export const NumeralModel = sequelize.define('NumeralLotaip',{

    id: {
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
    articulo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estadoEliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    indice : {
        type: DataTypes.INTEGER,
        allowNull:false
    }
},{
    tableName: 'numeral_lotaip',
    schema: 'esq_LOTAIP',
    timestamps: false
});