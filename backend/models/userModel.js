// const bcrypt = require("bcrypt");

// class UserModel {
//   constructor(db) {
//     this.connection = db.connection;
//   }

//   /* create a user  */
//   create(user) {
//     return new Promise((resolve, reject) => {
//       bcrypt
//         .hash(user.password, 10)
//         .then((passwordhash) => {
//           const query = `INSERT INTO adherent  (firstname, lastname,email,password, role_id) VALUES (?, ?, ?, ?, ?)`;
//           this.connection.execute(
//             query,
//             [user.email, passwordhash, user.adherent_id],
//             (error, result) => {
//               if (error) {
//                 return reject(error);
//               }
//               resolve(result);
//             }
//           );
//         })
//         .catch((err) => {
//           reject(err);
//         });
//     });
//   }

//   /* get a user by id */
//   read(id) {
//     return new Promise((resolve, reject) => {
//       const query = ` SELECT * FROM user  WHERE id = ?`;
//       const values = [id];
//       this.connection.execute(query, values, (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }

//   /* login  */
//   login(email, password) {
//     return new Promise((resolve, reject) => {
//       const query = `SELECT * FROM adherent WHERE email = ? `;
//       const values = [email];

//       this.connection.execute(query, values, (error, result) => {
//         if (error) {
//           return reject(error);
//         }

//         if (result.length === 0) {
//           return reject(new Error("User not found"));
//         }

//         const adherent = result[0];
//         bcrypt.compare(password, adherent.password, (err, passwordMatch) => {
//           if (err) {
//             return reject(err);
//           }

//           if (!passwordMatch) {
//             return reject(new Error("Incorrect password"));
//           }

//           resolve(adherent);
//         });
//       });
//     });
//   }

//   /* get all the user */
//   readAll() {
//     return new Promise((resolve, reject) => {
//       const query = ` SELECT * FROM user `;
//       this.connection.execute(query, (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }

//   /* update a user */
//   update(email, password, adherent_id, id) {
//     return new Promise((resolve, reject) => {
//       const query = `UPDATE user SET email =?,password=?, adherent_id =? WHERE id =?`;
//       const values = [email, password, adherent_id, id];
//       this.connection.execute(query, values, (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }

//   /* delete a user  */
//   delete(id) {
//     return new Promise((resolve, reject) => {
//       const query = `DELETE FROM user WHERE id = ?`;
//       const values = [id];
//       this.connection.execute(query, values, (error, result) => {
//         if (error) {
//           reject(error);
//         } else {
//           resolve(result);
//         }
//       });
//     });
//   }
// }

// module.exports = { UserModel };
