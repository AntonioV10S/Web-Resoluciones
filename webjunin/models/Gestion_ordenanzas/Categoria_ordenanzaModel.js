import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";

export const CategoriaOrdenanzaModel = sequelize.define('CategoriaOrdenanza',{
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
    estadoEliminado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    fechaRegistro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    }

},{
    tableName: 'categoria_ordenanza',
    schema: 'esq_ordenanzas',
    timestamps: false
});


