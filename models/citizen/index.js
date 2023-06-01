module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "citizens",
    {
      citizen_idx: {
        primaryKey: true,
        type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement:true, 
      },
      citizen_handicap: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      citizen_team: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      citizen_plus_id: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      citizen_plus_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
     
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );
  
};
