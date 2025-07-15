import {DataTypes} from 'sequelize';
import {sequelize} from '../../database/pg_conection.js';

export const CategoriaModel = sequelize.define('CategoryNoti',{
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
	estadoEliminado:{
		type: DataTypes.BOOLEAN,
		allowNull: false
	}
},{
		tableName: 'Categoria_noticias',
		schema: 'esq_noticias',
		timestamps: false
});

// export default CategoriaModel;