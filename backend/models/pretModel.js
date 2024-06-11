class PretModel {
  constructor(db) {
    this.connection = db.connection;
  }

  /* create a pret */
  create(pret) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO pret (output-date, input_date, islended_id) VALUES (?, ?, ?)`;
      const values = [pret.output_date, pret.input_date, pret.islended];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  /* get a pret by id */
  read(id) {
    return new Promise((resolve, reject) => {
      const query = ` SELECT * FROM pret  WHERE id = ?`;
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

  /* get all the pret */
  readAll() {
    return new Promise((resolve, reject) => {
      const query = ` SELECT pret.*, ouvrage.title, adherent.firstname, adherent.lastname,
      role.role_name FROM pret JOIN 
      ouvrage ON ouvrage.pret_id = pret.id JOIN
      adherent ON ouvrage.adherent_id = adherent.id JOIN 
      role ON adherent.role_id = role.id `;
      this.connection.execute(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /* update a pret */
  update(output_date, input_date, islended, id) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE pret SET output_date =?,input_date=?, islended =? WHERE id =?`;
      const values = [output_date, input_date, islended, id];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /* delete a pret  */
  delete(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM pret WHERE id = ?`;
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

module.exports = { PretModel };
