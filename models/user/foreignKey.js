module.exports = (db) => {
   
    db.User.hasMany(db.Pro, {
        foreignKey: {name: "user_idx", 
        allowNull:false,
       constraints: false,
       onDelete:'cascade',
},
        sourceKey: "user_idx"
      });
    db.User.hasMany(db.Excutive, {
       foreignKey: {name: "user_idx", 
       allowNull:false,
      constraints: false,
      onDelete:'cascade',
},
       sourceKey: "user_idx"
     });
    db.User.hasMany(db.Citizen, {
        foreignKey: {name: "user_idx", 
        allowNull:false,
       constraints: false,
       onDelete:'cascade',
},
        sourceKey: "user_idx"
      });
      db.User.hasMany(db.Apply_contest, {
        foreignKey: "user_idx",
        sourceKey: "user_idx"
      });
  };
  
