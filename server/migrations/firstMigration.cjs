exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("notes", {
    id: "id",
    title: { type: "varchar(1000)" },
    content: { type: "varchar(5000)" },
  });
};

exports.down = (pgm) => {};
