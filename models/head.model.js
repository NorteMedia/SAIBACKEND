const sql = require("../config/conexion");

const Head = function(head) {
  this.email_head = head.email_head;
  this.nombre_head = head.nombre_head;
  
};

Head.create = (newHead, result) => {
  sql.query("INSERT INTO head SET ?", newHead, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created head: ", { id: res.insertId, ...newHead });
    result(null, { id: res.insertId, ...newHead });
  });
};

Head.findById = (id, result) => {
  sql.query(`SELECT * FROM head WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found head: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Head with the id
    result({ kind: "not_found" }, null);
  });
};

Head.getAll = (title, result) => {
  let query = "SELECT * FROM head";

  if (title) {
    query += ` WHERE email_head LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("head: ", res);
    result(null, res);
  });
};


Head.updateById = (id, head, result) => {
  sql.query(
    "UPDATE head SET title = ?, description = ?, published = ? WHERE id = ?",
    [head.title, head.description, head.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Head with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated head: ", { id: id, ...head });
      result(null, { id: id, ...head });
    }
  );
};

Head.remove = (id, result) => {
  sql.query("DELETE FROM head WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Head with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted head with id: ", id);
    result(null, res);
  });
};



module.exports = Head;