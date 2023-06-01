module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "excutives",
    {
      excutive_idx: {
        primaryKey: true,
        type: DataTypes.INTEGER,
         allowNull: false,
         autoIncrement:true, 
      },
      excutive_country: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      excutive_duty1: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      excutive_duty2: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      excutive_resign_status: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      excutive_resign_date: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      excutive_resign_reason: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      excutive_duty2_chair: {
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
