module.exports = (db) => {
  db.Board.belongsTo(db.User, {
    foreignKey: "user_idx",
    onDelete: "cascade",
  });

  db.Board.hasMany(db.Img, {
    foreignKey: "board_idx",
    sourceKey: "board_idx",
    onDelete: "cascade",
  });
  db.Board.hasMany(db.Document, {
    foreignKey: "board_idx",
    sourceKey: "board_idx",
    onDelete: "cascade",
  });
  db.Board.hasMany(db.Contest_intro, {
    foreignKey: "board_idx",
    sourceKey: "board_idx",
    onDelete: "cascade",
  });
};
