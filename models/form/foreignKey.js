module.exports = (db) => {
  db.Form.hasMany(db.Apply_contest, {
    foreignKey: "form_idx",
    sourceKey: "form_idx"
  });
};
