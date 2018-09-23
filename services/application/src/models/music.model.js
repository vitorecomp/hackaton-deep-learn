module.exports = (sequelize, DataTypes) => {

	let Musica = sequelize.define('music', {
		id: {
			type:DataTypes.INTEGER,
			field:'id',
			primaryKey: true,
			autoIncrement: true
		},
		token: {
			type:DataTypes.TEXT,
			field:'sptid',
		},

	}, {
		underscored: false,
		timestamps: false
	})

	return Musica
}
