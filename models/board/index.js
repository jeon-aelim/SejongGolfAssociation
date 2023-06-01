module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "boards",
      {
        board_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true, 
          allowNull: false,
        },
        board_type:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        board_title:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        board_content:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        board_date:{
            type:DataTypes.DATE,
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
  