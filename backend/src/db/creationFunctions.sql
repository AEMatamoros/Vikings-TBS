create database vikings;

CREATE TABLE players (
	id int AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre varchar(10) NOT NULL,
    descripcion varchar(50) NOT NULL,
    ataque int NOT NULL,
    defensa int NOT NULL,
    estrellas int NOT NULL,
    imagen varchar(100) NOT NULL,
);

CREATE TABLE log (
	log_id int NOT NULL AUTO_INCREMENT,
    ganador int,
    perdedor int,
    CONSTRAINT PRIMARY KEY (log_id),
    FOREIGN KEY (ganador) REFERENCES players(id),
    FOREIGN KEY (perdedor) REFERENCES players(id)
);