module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "histories",
      {
        history_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true, 
          allowNull: false,
        },
        history_content:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        history_year:{
            type:DataTypes.STRING(150),
            allowNull:false,
        },
        history_start_date:{
            type:DataTypes.STRING(1500),
            allowNull:false,
        },
        history_end_date:{
            type:DataTypes.INTEGER,
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
  