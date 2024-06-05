class OuvrageModel {
  constructor(db) {
    this.connection = db.connection;
  }

  /* create a ouvrage  */
  create(ouvrage) {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO ouvrage (title, language, category_id, author_id, user_id, pret_id, reserve_id) VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const values = [
        ouvrage.title,
        ouvrage.language,
        ouvrage.category_id,
        ouvrage.author_id,
        ouvrage.user_id,
        ouvrage.pret_id,
        ouvrage.reserve_id,
      ];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      });
    });
  }

  /* get a ouvrage by id */
  read(id) {
    return new Promise((resolve, reject) => {
      const query = ` SELECT * FROM ouvrage  WHERE id = ?`;
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

  /* get all the ouvrage */
  readAll() {
    return new Promise((resolve, reject) => {
      const query = ` SELECT * FROM ouvrage `;
      this.connection.execute(query, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /* update a ouvrage */
  update(
    title,
    language,
    category_id,
    author_id,
    user_id,
    pret_id,
    reserve_id,
    id
  ) {
    return new Promise((resolve, reject) => {
      const query = `UPDATE ouvrage SET title =?,language=?, category_id =?, author_id =?,user_id=?,pret_id=?,reserve_id=? WHERE id =?`;
      const values = [
        title,
        language,
        category_id,
        author_id,
        user_id,
        pret_id,
        reserve_id,
        id,
      ];
      this.connection.execute(query, values, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  /* delete a ouvrage  */
  delete(id) {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM ouvrage WHERE id = ?`;
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

module.exports = { OuvrageModel };
