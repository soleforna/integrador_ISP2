-- Base de datos FeriaOnline.
-- Script de creación de la base de datos.

-- CREACIÓN DE LA BASE DE DATOS
CREATE DATABASE dbferia; 

--SELECCION DE BASE DE DATOS
USE dbferia; 

-- SE CREA LA TABLA DE Clientes 
CREATE TABLE IF NOT EXISTS feria_client(
id BIGINT AUTO_INCREMENT PRIMARY KEY, 
name VARCHAR(50) NOT NULL,
lastname VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL,
phone VARCHAR(50) NOT NULL,
address VARCHAR(50) NOT NULL,
created_ad datetime(6) NOT NULL
);   



-- SE CREA LA TABLA DE Categorias
CREATE TABLE IF NOT EXISTS feria_category(
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(100) NOT NULL,
created_ad datetime(6)
); 


-- SE CREA LA TABLA Articulo
CREATE TABLE IF NOT EXISTS feria_article(
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description VARCHAR(100) NOT NULL,
price INT NOT NULL, 
stock INT NOT NULL, 
image VARCHAR(100),
created_ad datetime(6) NOT NULL, 
category_id BIGINT, 
FOREIGN KEY (category_id) REFERENCES feria_category(id)
);  



-- SE CREA LA TABLA Feria Review
CREATE TABLE IF NOT EXISTS feria_review(
id BIGINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
description VARCHAR(100) NOT NULL,
created_ad DATETIME(6),
article_id BIGINT NOT NULL, 
client_id BIGINT NOT NULL,
FOREIGN KEY (article_id) REFERENCES feria_article(id),
FOREIGN KEY (client_id) REFERENCES feria_client(id)
); 

-- SE CREA TABLA Usuario
CREATE TABLE IF NOT EXISTS auth_user(
id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
password VARCHAR(128) NOT NULL,
last_login DATETIME(6),
is_superuser TINYINT(1) NOT NULL,
username VARCHAR(150) NOT NULL UNIQUE,
first_name VARCHAR(150) NOT NULL,
last_name VARCHAR(150) NOT NULL, 
email VARCHAR(254) NOT NULL, 
is_staff tinyint(1) NOT NULL,
is_active tinyint(1) NOT NULL,
date_joined datetime(6) NOT NULL
);  


CREATE TABLE IF NOT EXISTS auth_group (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(150) UNIQUE NOT NULL 
); 


CREATE TABLE IF NOT EXISTS auth_user_groups (
id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id int NOT NULL,
group_id int NOT NULL,
FOREIGN KEY (group_id) REFERENCES auth_group (id),
FOREIGN KEY (user_id) REFERENCES auth_user (id)
);  



CREATE TABLE IF NOT EXISTS django_content_type (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
app_label varchar(100) NOT NULL,
model varchar(100) NOT NULL,
UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
);  




-- SE CREA LA TABLA Admin Log.
CREATE TABLE IF NOT EXISTS django_admin_log (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
action_time datetime(6) NOT NULL,
object_id longtext,
object_repr varchar(200) NOT NULL,
action_flag smallint unsigned NOT NULL,
change_message longtext NOT NULL,
content_type_id int DEFAULT NULL,
user_id int NOT NULL,
FOREIGN KEY (content_type_id) REFERENCES django_content_type (id),  
FOREIGN KEY (user_id) REFERENCES auth_user (id)
); 




-- SE CREA TABLA Auth_ permission
CREATE TABLE IF NOT EXISTS auth_permission (
id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
name varchar(255) NOT NULL,
content_type_id int NOT NULL,
codename varchar(100) NOT NULL,
FOREIGN KEY (content_type_id) REFERENCES django_content_type (id)
); 




-- SE CREA TABLA auth_group_permissions
CREATE TABLE IF NOT EXISTS auth_group_permissions (
id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
group_id int NOT NULL,
permission_id int NOT NULL,
FOREIGN KEY (permission_id) REFERENCES auth_permission (id),
FOREIGN KEY (group_id) REFERENCES auth_group (id)
); 




CREATE TABLE  IF NOT EXISTS auth_user_user_permissions (
id bigint NOT NULL AUTO_INCREMENT PRIMARY KEY,
user_id int NOT NULL,
permission_id int NOT NULL,
FOREIGN KEY (permission_id) REFERENCES auth_permission (id),
FOREIGN KEY (user_id) REFERENCES auth_user (id)
); 




CREATE TABLE IF NOT EXISTS django_session (
session_key varchar(40) NOT NULL PRIMARY KEY,
session_data longtext NOT NULL,
expire_date datetime(6) NOT NULL
) ; 




CREATE TABLE  IF NOT EXISTS django_migrations (
id bigint NOT NULL AUTO_INCREMENT  PRIMARY KEY,
app varchar(255) NOT NULL,
name varchar(255) NOT NULL,
applied datetime(6) NOT NULL
); 
 