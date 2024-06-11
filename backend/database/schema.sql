

/* role table */
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(30),
    PRIMARY KEY (id) 
);

/* adherent table */
CREATE TABLE adherent (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100),
    lastname VARCHAR (100),
    role_id INT DEFAULT 3,
    FOREIGN KEY (role_id) REFERENCES role(id)ON DELETE CASCADE,
    PRIMARY KEY (id) 
);

/* user table */
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100),
    password VARCHAR (100),
    adherent_id INT,
    FOREIGN KEY (adherent_id) REFERENCES adherent(id)ON DELETE CASCADE,
    PRIMARY KEY (id) 
);

/* pret table */
CREATE TABLE pret (
    id INT NOT NULL AUTO_INCREMENT,
    output_date DATE,
    input_date DATE,
    is_lended BOOLEAN,
    PRIMARY KEY (id) 
);

/* reserve table*/
CREATE TABLE reserve (
    id INT NOT NULL AUTO_INCREMENT,
    reservation_date DATETIME,
    pick_up_date DATETIME,
    is_reserved BOOLEAN,
    PRIMARY KEY (id) 
);


/* ouvrage format*/
CREATE TABLE format (
    id INT NOT NULL AUTO_INCREMENT,
    format_name VARCHAR(30),
    PRIMARY KEY (id) 
);

/* ouvrage category*/
CREATE TABLE category (
    id INT NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(70),
    level VARCHAR(50),
    discipline VARCHAR(100),
    format_id INT,
    FOREIGN KEY (format_id) REFERENCES format(id)ON DELETE CASCADE,
    PRIMARY KEY (id) 
);

CREATE TABLE author (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100),
    lastname VARCHAR(100),
    PRIMARY KEY(id)
);

/* ouvrage table*/
CREATE TABLE ouvrage (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(100),
    language VARCHAR(100),
    category_id INT,
    author_id INT,
    adherent_id INT,
    pret_id INT,
    reserve_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE CASCADE,
    FOREIGN KEY (author_id) REFERENCES author(id)ON DELETE CASCADE,
    FOREIGN KEY (adherent_id) REFERENCES adherent(id)ON DELETE CASCADE,
    FOREIGN KEY (pret_id) REFERENCES pret(id)ON DELETE CASCADE,
    FOREIGN KEY (reserve_id) REFERENCES reserve(id)ON DELETE CASCADE,
    PRIMARY KEY (id) 
);
