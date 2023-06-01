module.exports = db => {
    db.Document.belongsTo(db.Board, {
        foreignKey: "board_idx",
        onDelete: "cascade",
    });
}
