module.exports = (db) => {
       db.Excutive.belongsTo(db.User, {
         foreignKey: {name: "user_idx", 
         allowNull:false,
        constraints: false,
        onDelete:'cascade',
       }
     });
    
  };
  