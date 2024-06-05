const faker = require("@faker-js/faker");
const { Database } = require("./database/client");

const db = new Database();

const insertRoles = async () => {
  const roles = ["Admin", "User", "Guest"];
  for (const role of roles) {
    await db.connection.query("INSERT INTO role (role_name) VALUES (?)", [
      role,
    ]);
  }
  console.log("Roles inserted.");
};

const insertUsers = async (num) => {
  for (let i = 0; i < num; i++) {
    const firstname = faker.faker.name.firstName();
    const lastname = faker.faker.name.lastName();
    const role_id = Math.floor(Math.random() * 3) + 1;
    await db.connection(
      "INSERT INTO user (firstname, lastname, role_id) VALUES (?, ?, ?)",
      [firstname, lastname, role_id]
    );
  }
  console.log(`${num} users inserted.`);
};

const insertAuthors = async (num) => {
  for (let i = 0; i < num; i++) {
    const firstname = faker.faker.name.firstName();
    const lastname = faker.faker.name.lastName();
    await db.connection(
      "INSERT INTO author (firstname, lastname) VALUES (?, ?)",
      [firstname, lastname]
    );
  }
  console.log(`${num} authors inserted.`);
};

const insertFormats = async () => {
  const formats = ["Hardcover", "Paperback", "E-book"];
  for (const format of formats) {
    await db.connection("INSERT INTO format (format_name) VALUES (?)", [
      format,
    ]);
  }
  console.log("Formats inserted.");
};

const insertCategories = async () => {
  const categories = ["Fiction", "Non-Fiction", "Science", "Biography"];
  for (const category of categories) {
    const format_id = Math.floor(Math.random() * 3) + 1;
    await db.connection(
      "INSERT INTO category (category_name, format_id) VALUES (?, ?)",
      [category, format_id]
    );
  }
  console.log("Categories inserted.");
};

const insertPrets = async (num) => {
  for (let i = 0; i < num; i++) {
    const output_date = faker.faker.date.past();
    const input_date = faker.faker.date.future();
    const is_lended = faker.faker.datatype.boolean();
    await db.connection(
      "INSERT INTO pret (output_date, input_date, is_lended) VALUES (?, ?, ?)",
      [output_date, input_date, is_lended]
    );
  }
  console.log(`${num} prets inserted.`);
};

const insertReserves = async (num) => {
  for (let i = 0; i < num; i++) {
    const reservation_date = faker.faker.date.recent();
    const pick_up_date = faker.faker.date.future();
    const is_reserved = faker.faker.datatype.boolean();
    await db.connection(
      "INSERT INTO reserve (reservation_date, pick_up_date, is_reserved) VALUES (?, ?, ?)",
      [reservation_date, pick_up_date, is_reserved]
    );
  }
  console.log(`${num} reserves inserted.`);
};

const insertOuvrages = async (num) => {
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

  for (let i = 0; i < num; i++) {
    const title = faker.faker.lorem.words(3); // Generate a title with 3 words
    const language = faker.faker.helpers.arrayElement(languages);
    const category_id = Math.floor(Math.random() * 4) + 1;
    const author_id = Math.floor(Math.random() * 10) + 1;
    const user_id = Math.floor(Math.random() * 10) + 1;
    const pret_id = Math.floor(Math.random() * 10) + 1; // Assuming there are prets
    const reserve_id = Math.floor(Math.random() * 10) + 1; // Assuming there are reserves

    await db.connection(
      "INSERT INTO ouvrage (title, language, category_id, author_id, user_id, pret_id, reserve_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, language, category_id, author_id, user_id, pret_id, reserve_id]
    );
  }
  console.log(`${num} ouvrages inserted.`);
};

const populateDatabase = async () => {
  try {
    await insertRoles();
    await insertUsers(50);
    await insertAuthors(30);
    await insertFormats();
    await insertCategories();
    await insertPrets(100);
    await insertReserves(100);
    await insertOuvrages(300);
  } catch (err) {
    console.error("Error populating the database:", err);
  } finally {
    db.stop();
  }
};

populateDatabase();
