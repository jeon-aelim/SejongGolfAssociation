module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "popups",
      {
        popup_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true, 
          allowNull: false,
        },
        popup_name:{
            type:DataTypes.STRING(255),
            allowNull:true,
        },
        popup_start_date:{
            type:DataTypes.DATE,
            allowNull:true,
        },
        popup_end_date:{
            type:DataTypes.DATE,
            allowNull:true,
        },
        popup_status:{
            type:DataTypes.BOOLEAN,
            allowNull:true,
        }
        
  },
  
      {
        charset: "utf8",
        collate: "utf8_general_ci",
        timestamps: false,
      }
    );
  };
  