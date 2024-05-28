DROP DATABASE  IF EXISTS bibliotheque ;

CREATE DATABASE bibliotheque ;

USE bibliotheque;

/* role table */
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    role_name VARCHAR(30),
    PRIMARY KEY (id) 
);

/* user table */
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    firstname VARCHAR(100),
    lastname VARCHAR (100),
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
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
    format_id INT,
    FOREIGN KEY (format_id) REFERENCES format(id),
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
    category_id INT,
    author_id INT,
    user_id INT,
    pret_id INT,
    reserve_id INT,
    FOREIGN KEY (category_id) REFERENCES category(id),
    FOREIGN KEY (author_id) REFERENCES author(id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (pret_id) REFERENCES pret(id),
    FOREIGN KEY (reserve_id) REFERENCES reserve(id),
    PRIMARY KEY (id) 
);
