const faker = require("@faker-js/faker");
const { db } = require("./database/client");

const insertRoles = (callback) => {
  const roles = ["Admin", "User", "Guest"];
  let completed = 0;
  roles.forEach((role) => {
    db.connection.query(
      "INSERT INTO role (role_name) VALUES (?)",
      [role],
      (err) => {
        if (err) return callback(err);
        if (++completed === roles.length) {
          console.log("Roles inserted.");
          callback();
        }
      }
    );
  });
};

const insertAdherents = (num, callback) => {
  let completed = 0;
  for (let i = 0; i < num; i++) {
    const firstname = faker.faker.person.firstName();
    const lastname = faker.faker.person.lastName();
    const email = faker.faker.internet.email();
    const password = faker.faker.internet.password();
    const role_id = Math.floor(Math.random() * 3) + 1;
    db.connection.execute(
      "INSERT INTO adherent (firstname, lastname, email, password, role_id) VALUES (?, ?, ?, ?, ?)",
      [firstname, lastname, email, password, role_id],
      (err) => {
        if (err) return callback(err);
        if (++completed === num) {
          console.log(`${num} users inserted.`);
          callback();
        }
      }
    );
  }
};

const insertAuthors = (num, callback) => {
  let completed = 0;
  for (let i = 0; i < num; i++) {
    const firstname = faker.faker.person.firstName();
    const lastname = faker.faker.person.lastName();
    db.connection.execute(
      "INSERT INTO author (firstname, lastname) VALUES (?, ?)",
      [firstname, lastname],
      (err) => {
        if (err) return callback(err);
        if (++completed === num) {
          console.log(`${num} authors inserted.`);
          callback();
        }
      }
    );
  }
};

const insertFormats = (callback) => {
  const formats = ["Hardcover", "Paperback", "E-book"];
  let completed = 0;
  formats.forEach((format) => {
    db.connection.query(
      "INSERT INTO format (format_name) VALUES (?)",
      [format],
      (err) => {
        if (err) return callback(err);
        if (++completed === formats.length) {
          console.log("Formats inserted.");
          callback();
        }
      }
    );
  });
};

const insertCategories = (callback) => {
  const categories = ["Fiction", "Non-Fiction", "Science", "Biography"];
  let completed = 0;
  categories.forEach((category) => {
    const format_id = Math.floor(Math.random() * 3) + 1;
    db.connection.execute(
      "INSERT INTO category (category_name, format_id) VALUES (?, ?)",
      [category, format_id],
      (err) => {
        if (err) return callback(err);
        if (++completed === categories.length) {
          console.log("Categories inserted.");
          callback();
        }
      }
    );
  });
};

const insertPrets = (num, callback) => {
  let completed = 0;
  for (let i = 0; i < num; i++) {
    const output_date = faker.faker.date.past();
    const input_date = faker.faker.date.future();
    const is_lended = faker.faker.datatype.boolean();
    db.connection.execute(
      "INSERT INTO pret (output_date, input_date, is_lended) VALUES (?, ?, ?)",
      [output_date, input_date, is_lended],
      (err) => {
        if (err) return callback(err);
        if (++completed === num) {
          console.log(`${num} prets inserted.`);
          callback();
        }
      }
    );
  }
};

const insertReserves = (num, callback) => {
  let completed = 0;
  for (let i = 0; i < num; i++) {
    const reservation_date = faker.faker.date.recent();
    const pick_up_date = faker.faker.date.future();
    const is_reserved = faker.faker.datatype.boolean();
    db.connection.execute(
      "INSERT INTO reserve (reservation_date, pick_up_date, is_reserved) VALUES (?, ?, ?)",
      [reservation_date, pick_up_date, is_reserved],
      (err) => {
        if (err) return callback(err);
        if (++completed === num) {
          console.log(`${num} reserves inserted.`);
          callback();
        }
      }
    );
  }
};

const insertOuvrages = (num, callback) => {
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Japanese",
    "Korean",
    "Italian",
    "Portuguese",
    "Russian",
  ];
  let completed = 0;
  for (let i = 0; i < num; i++) {
    const title = faker.faker.lorem.words(3);
    const language = faker.faker.helpers.arrayElement(languages);
    const category_id = Math.floor(Math.random() * 4) + 1;
    const author_id = Math.floor(Math.random() * 10) + 1;
    const adherent_id = Math.floor(Math.random() * 10) + 1;
    const pret_id = Math.floor(Math.random() * 10) + 1;
    const reserve_id = Math.floor(Math.random() * 10) + 1;

    db.connection.execute(
      "INSERT INTO ouvrage (title, language, category_id, author_id, adherent_id, pret_id, reserve_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        title,
        language,
        category_id,
        author_id,
        adherent_id,
        pret_id,
        reserve_id,
      ],
      (err) => {
        if (err) return callback(err);
        if (++completed === num) {
          console.log(`${num} ouvrages inserted.`);
          callback();
        }
      }
    );
  }
};

const populateDatabase = () => {
  insertRoles((err) => {
    if (err) return console.error("Error populating roles:", err);

    insertAdherents(50, (err) => {
      if (err) return console.error("Error populating adherents:", err);

      insertAuthors(30, (err) => {
        if (err) return console.error("Error populating authors:", err);

        insertFormats((err) => {
          if (err) return console.error("Error populating formats:", err);

          insertCategories((err) => {
            if (err) return console.error("Error populating categories:", err);

            insertPrets(100, (err) => {
              if (err) return console.error("Error populating prets:", err);

              insertReserves(100, (err) => {
                if (err)
                  return console.error("Error populating reserves:", err);

                insertOuvrages(300, (err) => {
                  if (err)
                    return console.error("Error populating ouvrages:", err);

                  db.stop();
                });
              });
            });
          });
        });
      });
    });
  });
};

populateDatabase();
