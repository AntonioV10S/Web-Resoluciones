import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";
import { CategoriaOrdenanzaModel } from "../Gestion_ordenanzas/Categoria_ordenanzaModel.js";
import { YearMesModel } from "../Gestion_mes_year/Year_mes_model.js";

export const OrdenanzasModel = sequelize.define('Ordenanza',{
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
    dia_publicacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    estado: {
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
        allowNull: true,
    },
    id_year_mes:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_categoria_ordenanza: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
    },
    url_RegistroOficial: {
        type: DataTypes.STRING,
        allowNull: true
    }
    },{
        tableName: 'ordenanza',
        schema: 'esq_ordenanzas',
        timestamps: false
});

OrdenanzasModel.belongsTo(CategoriaOrdenanzaModel,{
    foreignKey: 'id_categoria_ordenanza'
});

OrdenanzasModel.belongsTo(YearMesModel,{
    foreignKey: 'id_year_mes'
});

