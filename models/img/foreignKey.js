module.exports = db => {
    db.Img.belongsTo(db.Board, {
        foreignKey: "board_idx",
        onDelete: "cascade",
    });
}
