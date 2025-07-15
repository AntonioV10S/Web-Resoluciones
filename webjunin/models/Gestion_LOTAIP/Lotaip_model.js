import { DataTypes } from "sequelize";
import { sequelize } from "../../database/pg_conection.js";
import { NumeralModel } from "../Gestion_LOTAIP/Numeral_model.js";
import { YearMesModel } from "../Gestion_mes_year/Year_mes_model.js"
import { TipoArchivoModel } from "../Gestion_LOTAIP/TipoArchivo_model.js";

export const LotaipModel = sequelize.define('Lotaip',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    url: {
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
    id_numeral: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    id_year_mes:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_tipo_archivo: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    tableName: 'lotaip',
    schema: 'esq_LOTAIP',
    timestamps: false
});

LotaipModel.belongsTo(NumeralModel,{
    foreignKey: 'id_numeral'
});

LotaipModel.belongsTo(YearMesModel,{
    foreignKey: 'id_year_mes'
});

LotaipModel.belongsTo(TipoArchivoModel,{
    foreignKey: 'id_tipo_archivo'
});