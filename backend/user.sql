use bibliotheque


/* user table */
CREATE TABLE user (
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(100),
    password VARCHAR (100),
    adherent_id INT,
    FOREIGN KEY (adherent_id) REFERENCES adherent(id),
    PRIMARY KEY (id) 
);