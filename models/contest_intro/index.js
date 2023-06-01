module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "contest_intros",
      {
        contest_intro_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true, 
          allowNull: false,
        },
        contest_intro_start_date:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        contest_intro_end_date:{
            type:DataTypes.STRING(150),
            allowNull:false,
        },
        contest_intro_place:{
            type:DataTypes.STRING(1500),
            allowNull:false,
        }
  },
  
      {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: false,
      }
    );
  };
  