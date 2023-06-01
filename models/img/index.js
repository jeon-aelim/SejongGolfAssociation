module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "imgs",
      {
         img_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true,
          allowNull: false,
          },
          
          img_url: {
            type: DataTypes.STRING(255),
            allowNull: true,
          }
  },
  
      {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: false,
      }
    );
  };
  