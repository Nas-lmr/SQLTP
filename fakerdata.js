const faker = require('@faker-js/faker');
const dbpool = require('./database/client');

const insertRoles = async () => {
    const roles = ['Admin', 'User', 'Guest'];
    for (const role of roles) {
        await dbpool.query('INSERT INTO role (role_name) VALUES (?)', [role]);
    }
    console.log('Roles inserted.');
};

const insertUsers = async (num) => {
    for (let i = 0; i < num; i++) {
        const firstname = faker.faker.name.firstName();
        const lastname = faker.faker.name.lastName();
        const role_id = Math.floor(Math.random() * 3) + 1;
        await dbpool.query(
            'INSERT INTO user (firstname, lastname, role_id) VALUES (?, ?, ?)',
            [firstname, lastname, role_id]
        );
    }
    console.log(`${num} users inserted.`);
};

const insertAuthors = async (num) => {
    for (let i = 0; i < num; i++) {
        const firstname = faker.faker.name.firstName();
        const lastname = faker.faker.name.lastName();
        await dbpool.query(
            'INSERT INTO author (firstname, lastname) VALUES (?, ?)',
            [firstname, lastname]
        );
    }
    console.log(`${num} authors inserted.`);
};

const insertFormats = async () => {
    const formats = ['Hardcover', 'Paperback', 'E-book'];
    for (const format of formats) {
        await dbpool.query('INSERT INTO format (format_name) VALUES (?)', [format]);
    }
    console.log('Formats inserted.');
};

const insertCategories = async () => {
    const categories = ['Fiction', 'Non-Fiction', 'Science', 'Biography'];
    for (const category of categories) {
        const format_id = Math.floor(Math.random() * 3) + 1;
        await dbpool.query('INSERT INTO category (category_name, format_id) VALUES (?, ?)', [category, format_id]);
    }
    console.log('Categories inserted.');
};

const insertOuvrages = async (num) => {
    for (let i = 0; i < num; i++) {
        const title = faker.faker.lorem.words();
        const category_id = Math.floor(Math.random() * 4) + 1;
        const author_id = Math.floor(Math.random() * 10) + 1;
        const user_id = Math.floor(Math.random() * 10) + 1;
        const pret_id = null; // or Math.floor(Math.random() * 10) + 1 for linked data
        const reserve_id = null; // or Math.floor(Math.random() * 10) + 1 for linked data
        await dbpool.query(
            'INSERT INTO ouvrage (title, category_id, author_id, user_id, pret_id, reserve_id) VALUES (?, ?, ?, ?, ?, ?)',
            [title, category_id, author_id, user_id, pret_id, reserve_id]
        );
    }
    console.log(`${num} ouvrages inserted.`);
};

const populateDatabase = async () => {
    try {
        await insertRoles();
        await insertUsers(10);
        await insertAuthors(10);
        await insertFormats();
        await insertCategories();
        await insertOuvrages(20);
    } catch (err) {
        console.error('Error populating the database:', err);
    } finally {
        dbpool.end();
    }
};

populateDatabase();
