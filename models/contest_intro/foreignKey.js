module.exports = (db) => {
  db.Contest_intro.belongsTo(db.Board, {
    foreignKey: "board_idx",
    onDelete: "cascade",
  });
};
