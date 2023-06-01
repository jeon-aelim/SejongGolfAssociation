module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
      "documents",
      {
        document_idx: {
          primaryKey: true,
          type: DataTypes.INTEGER,
          autoIncrement:true,
          allowNull: false,
          },
          document_type: {
            type: DataTypes.STRING(255),
            allowNull: true,
          },
          document_url: {
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
  