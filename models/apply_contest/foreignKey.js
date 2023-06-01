module.exports = (db) => {
  db.Apply_contest.belongsTo(db.User, {
    foreignKey: "user_idx",
  });
  db.Apply_contest.belongsTo(db.Form, {
    foreignKey: "form_idx",
  });
};
