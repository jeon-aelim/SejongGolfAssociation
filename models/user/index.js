module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "users",
    {
      user_idx: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement:true, 
        allowNull: false,

      },
      user_id: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      user_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_type: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_birth: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_second_password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_gender: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user_phone: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      user_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
      },
      user_postal_code: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_detail_address: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      user_use_permit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      user_permit_date: {
        type:DataTypes.DATE,
        allowNull: true,
      },
      user_drop_reason: {
        type:DataTypes.STRING(255),
        allowNull: true,
      },
      user_drop_status: {
        type:DataTypes.BOOLEAN,
        allowNull: true,
      },
      user_drop_date: {
        type:DataTypes.DATE,
        allowNull: true,
      },
      user_join_date: {
        type:DataTypes.DATE,
        allowNull: false,
      },
      user_img: {
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
