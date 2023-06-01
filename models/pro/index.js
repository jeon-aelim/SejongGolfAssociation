module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "pros",
    {
      pro_idx: {
        primaryKey: true,
        type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement:true, 
      },
      pro_aqc_date: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pro_aqc_center: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pro_profile: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pro_intro: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pro_lesson_place: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pro_team: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      pro_major_lesson: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
    
    },
    {
      charset: "utf8",
      collate: "utf8_general_ci",
      timestamps: false,
    }
  );
  
};
