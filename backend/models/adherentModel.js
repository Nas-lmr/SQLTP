class AdherentModel {
  constructor(db) {
    this.connection = db.connection;
  }

  /* create a user  */
  create(adherent) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO adherent (firstname, lastname, role_id) VALUES (?, ?, ?)`;
      const values = [adherent.firstname, adherent.lastname, adherent.role_id];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
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

  /* update a user */
  update(firstname, lastname, role_id, id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE adherent SET firstname =?,lastname=?, role_id =? WHERE id =?`;
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

  /* requêtes filtrées */

  readfiltred() {
    return new Promise((resolve, reject) => {
      const query = ` SELECT ouvrage.title , ouvrage.language, 
        category.level,category.discipline
        FROM ouvrage 
        JOIN category ON ouvrage.category_id = category.id
        WHERE level = "Beginner" AND discipline  = "History" AND language = "French"`;
      this.connection.execute(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /* filtred ouvrage byid  */

  readfiltredById(id) {
    return new Promise((resolve, reject) => {
      const query = ` SELECT ouvrage.title , ouvrage.language, 
      category.level,category.discipline
      FROM ouvrage 
      JOIN category ON ouvrage.category_id = category.id
      WHERE ouvrage.id = ? `;
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

module.exports = {AdherentModel };
