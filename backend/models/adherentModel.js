const bcrypt = require("bcrypt");

class AdherentModel {
  constructor(db) {
    this.connection = db.connection;
  }

  /* create a user  */
  create(adherent) {
    return new Promise((resolve, reject) => {
      bcrypt
        .hash(adherent.password, 10)
        .then((passwordhash) => {
          const query = `INSERT INTO adherent  (firstname, lastname, email, password) VALUES (?, ?, ?, ?)`;
          this.connection.execute(
            query,
            [
              adherent.firstname,
              adherent.lastname,
              adherent.email,
              passwordhash,
            ],
            (error, result) => {
              if (error) {
                return reject(error);
              }
              resolve(result);
            }
          );
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  /* get a user by id */
  read(id) {
    return new Promise((resolve, reject) => {
      const query = ` SELECT * FROM adherent  WHERE id = ?`;
      const values = [id];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /* get all the user */
  readAll() {
    return new Promise((resolve, reject) => {
      const query = ` SELECT * FROM adherent `;
      this.connection.execute(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  login(email, password) {
    return new Promise((resolve, reject) => {
      const query = `SELECT  email, password, role.role_name FROM adherent
      JOIN role ON adherent.role_id=role.id
      WHERE email = ? `;
      const values = [email];

      this.connection.execute(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }

        if (result.length === 0) {
          return reject(new Error("User not found"));
        }

        const adherent = result[0];
        bcrypt.compare(password, adherent.password, (err, passwordMatch) => {
          if (err) {
            return reject(err);
          }

          if (!passwordMatch) {
            return reject(new Error("Incorrect password"));
          }
          resolve({
            adherent: {
              adherentEmail: adherent.email,
              adherentId: adherent.id,
              adherentRole: adherent.role_name,
            },
          });
        });
      });
    });
  }

  /* update a user */
  update(firstname, lastname, role_id, id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE adherent SET firstname =?,lastname=?, email=?, password=? WHERE id =?`;
      const values = [firstname, lastname, role_id, id];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /* delete a user  */
  delete(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM adherent WHERE id = ?`;
      const values = [id];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
}

module.exports = { AdherentModel };
