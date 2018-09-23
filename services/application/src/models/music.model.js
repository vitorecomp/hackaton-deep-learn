module.exports = (sequelize, DataTypes) => {

	let Musica = sequelize.define('music', {
		id: {
			type:DataTypes.INTEGER,
			field:'id',
			primaryKey: true,
			autoIncrement: true
		},
	}, {
		underscored: false,
		timestamps: false
	})

	return Musica
}
