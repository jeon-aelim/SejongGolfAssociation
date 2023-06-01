module.exports = (db) => {
       db.Citizen.belongsTo(db.User, {
         foreignKey: {name: "user_idx", 
         allowNull:false,
        constraints: false,
        onDelete:'cascade',
       }
     });
    
  };
  