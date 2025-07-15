import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/pg_conection.js';
import {CategoriaModel} from './Categorias_model.js';

export const NoticiasModel = sequelize.define('Noticia',{
	id: {
		type: DataTypes.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false
	},
	id_categoria:{
		type: DataTypes.INTEGER,
		allowNull: false
	},
	titular:{
		type: DataTypes.TEXT,
		allowNull: false
	},
	titulo:{
		type: DataTypes.TEXT,
		allowNull: false
	},
	cuerpo:{
		type: DataTypes.TEXT,
		allowNull: false
	},
	img_portada:{
		type: DataTypes.STRING,
		allowNull: false
	},
	img_cuerpo:{
		type: DataTypes.STRING,
		allowNull: true
	},
	lugar_noticia:{
		type: DataTypes.STRING,
		allowNull: false
	},
	fecha_publicacion:{
		type: DataTypes.DATE,
		allowNull: false
	},
	num_visualizaciones:{
		type: DataTypes.INTEGER,
		allowNull: false
	},
	estado:{
		type: DataTypes.STRING,
		allowNull: false
	},
	estadoEliminado:{
		type: DataTypes.BOOLEAN,
		allowNull: false
	},
	fechaRegistro:{
		type: DataTypes.DATE,
		allowNull:false
	}
	},{
		tableName: 'Noticias',
		schema: 'esq_noticias',
		timestamps: false
});

NoticiasModel.belongsTo(CategoriaModel,{
	foreignKey: 'id_categoria'
});
