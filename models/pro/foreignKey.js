module.exports = (db) => {
       db.Pro.belongsTo(db.User, {
         foreignKey: {name: "user_idx", 
         allowNull:false,
        constraints: false,
        onDelete:'cascade',
       }
     });
    
  };
  