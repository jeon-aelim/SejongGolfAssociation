module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "apply_contests",
      {
        apply_contest_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true, 
          allowNull: false,
        },
        apply_contest_title:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
       
  },
  
      {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: false,
      }
    );
  };
  