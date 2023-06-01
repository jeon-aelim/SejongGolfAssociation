module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "forms",
      {
        form_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true, 
          allowNull: false,
        },
        form_handicap:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        form_plus_id:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        form_plus_name:{
            type:DataTypes.STRING(255),
            allowNull:false,
        },
        form_add_date:{
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
  