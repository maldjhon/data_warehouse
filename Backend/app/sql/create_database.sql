/****************************************
Descripción: Crea la tabla base de datos
*****************************************/
CREATE DATABASE sql10424653;
/****************************************
Descripción: Usa la base de datos 
sql10424653
*****************************************/
USE sql10424653;
/******************************************
Descripción: Crea la tabla usuarios
para la base de datos
*******************************************/
CREATE TABLE users (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
name varchar(250) NOT NULL,
email varchar(250) NOT NULL UNIQUE,
password varchar(250) NOT NULL
);
/******************************************
Descripción: Crea la tabla para roles
para la base de datos
*******************************************/
CREATE TABLE postn (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
name varchar(100) NOT NULL,
description varchar(250) NULL);
/******************************************
Descripción: Crea la tabla para regiones
para la base de datos
*******************************************/
CREATE TABLE regions (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
name varchar(100) NOT NULL);
/******************************************
Descripción: Crea la tabla para paises
para la base de datos
*******************************************/
CREATE TABLE countries (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
name varchar(100) NOT NULL);
/******************************************
Descripción: Crea la tabla para ciudades
para la base de datos
*******************************************/
CREATE TABLE cities (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
name varchar(100) NOT NULL);
/******************************************
Descripción: Crea la tabla para compañías
para la base de datos
*******************************************/
CREATE TABLE companies (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
name varchar(100) NOT NULL,
address varchar(100) NOT NULL,
email varchar(250) NOT NULL,
phone int NOT NULL);
/******************************************
Descripción: Crea la tabla para contactos
para la base de datos
*******************************************/
CREATE TABLE contacts (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
fstName varchar(100) NOT NULL,
lstName varchar(100) NOT NULL,
ocupation varchar(100) NOT NULL,
address varchar(100) NULL,
email varchar(250) NOT NULL,
interest int NULL);
/******************************************
Descripción: Crea la tabla para canales
para la base de datos
*******************************************/
CREATE TABLE channels (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL,
name varchar(100) NOT NULL,
accountUser varchar(100) NOT NULL,
preference varchar(100) NOT NULL);
/******************************************
Descripción: Crea la tabla para canales y contactos
para la base de datos
*******************************************/
CREATE TABLE contactsTochannels (id int PRIMARY KEY NOT NULL AUTO_INCREMENT UNIQUE,
createdAt datetime NOT NULL,
updatedAt datetime NOT NULL);
/**************************************************************************
Descripción: Crea la columna postnId la llave foranea de la tabla postn 
en la tabla users para la base de datos
**************************************************************************/
ALTER TABLE users
    ADD COLUMN postnId INT NULL default 2,
    ADD CONSTRAINT `fk_postnuser` FOREIGN KEY (postnId)
        REFERENCES postn (id);
/**************************************************************************
Descripción: Crea la columna regionId la llave foranea de la tabla regions 
en la tabla countries para la base de datos
**************************************************************************/
ALTER TABLE countries
    ADD COLUMN regionId INT NULL,
    ADD CONSTRAINT `fk_regioncountry` FOREIGN KEY (regionId)
        REFERENCES regions (id);
/**************************************************************************
Descripción: Crea la columna regionId la llave foranea de la tabla regions 
en la tabla countries para la base de datos
**************************************************************************/
ALTER TABLE cities
    ADD COLUMN countryId INT NULL,
    ADD CONSTRAINT `fk_countrycity` FOREIGN KEY (countryId)
        REFERENCES countries (id);
/**************************************************************************
Descripción: Crea la columna regionId la llave foranea de la tabla regions 
en la tabla companies para la base de datos
**************************************************************************/
ALTER TABLE companies
    ADD COLUMN regionId INT NULL,
    ADD CONSTRAINT `fk_companyregion` FOREIGN KEY (regionId)
        REFERENCES regions (id);
/**************************************************************************
Descripción: Crea la columna countryId la llave foranea de la tabla contries 
en la tabla companies para la base de datos
**************************************************************************/
ALTER TABLE companies
    ADD COLUMN countryId INT NULL,
    ADD CONSTRAINT `fk_companycountry` FOREIGN KEY (countryId)
        REFERENCES countries (id);
/**************************************************************************
Descripción: Crea la columna cityId la llave foranea de la tabla cities
en la tabla companies para la base de datos
**************************************************************************/
ALTER TABLE companies
    ADD COLUMN cityId INT NULL,
    ADD CONSTRAINT `fk_companycity` FOREIGN KEY (cityId)
        REFERENCES cities (id);
/**************************************************************************
Descripción: Crea la columna regionId la llave foranea de la tabla regions 
en la tabla contacts para la base de datos
**************************************************************************/
ALTER TABLE contacts
    ADD COLUMN regionId INT NULL,
    ADD CONSTRAINT `fk_contactregion` FOREIGN KEY (regionId)
        REFERENCES regions (id);
/**************************************************************************
Descripción: Crea la columna countryId la llave foranea de la tabla contries 
en la tabla contacts para la base de datos
**************************************************************************/
ALTER TABLE contacts
    ADD COLUMN countryId INT NULL,
    ADD CONSTRAINT `fk_contactcountry` FOREIGN KEY (countryId)
        REFERENCES countries (id);
/**************************************************************************
Descripción: Crea la columna cityId la llave foranea de la tabla cities
en la tabla contacts para la base de datos
**************************************************************************/
ALTER TABLE contacts
    ADD COLUMN cityId INT NULL,
    ADD CONSTRAINT `fk_contactcity` FOREIGN KEY (cityId)
        REFERENCES cities (id);
/**************************************************************************
Descripción: Crea la columna companyId la llave foranea de la tabla companies
en la tabla contacts para la base de datos
**************************************************************************/
ALTER TABLE contacts
    ADD COLUMN companyId INT NULL,
    ADD CONSTRAINT `fk_contactcompany` FOREIGN KEY (companyId)
        REFERENCES companies (id);
/*************************************************************************
Descripción: Crea la columna orderId la llave foranea de la tabla orders
en la tabla contactsTochannels para la base de datos delilah
**************************************************************************/
ALTER TABLE contactsTochannels
    ADD COLUMN contactId INT NULL,
    ADD CONSTRAINT `fk_contactchannels` FOREIGN KEY (contactId)
        REFERENCES contacts (id);
/*************************************************************************
Descripción: Crea la columna orderId la llave foranea de la tabla orders
en la tabla contactsTochannels para la base de datos delilah
**************************************************************************/
ALTER TABLE contactsTochannels
    ADD COLUMN channelId INT NULL,
    ADD CONSTRAINT `fk_channelcontacts` FOREIGN KEY (channelId)
        REFERENCES channels (id);
/******************************************
Descripción: Inserta dos roles en la tabla 
para roles para la base de datos
*******************************************/
INSERT INTO postn (id, createdAt, updatedAt,name,description) VALUES(1,sysdate(),sysdate(),'Admin','Puede realizar acciones CRUD');
INSERT INTO postn (id, createdAt, updatedAt,name,description) VALUES(2,sysdate(),sysdate(),'Basico','No puede realizar acciones CRUD');
/******************************************
Descripción: Inserta un usuario administrador en la tabla 
para usuarios para la base de datos
*******************************************/
INSERT INTO users (id, createdAt, updatedAt,name,email,password,postnId) VALUES(1,sysdate(),sysdate(),'Administrador','admin@prueba.com',SHA1('admin123'),1);