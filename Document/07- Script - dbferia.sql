CREATE DATABASE dbferia
USE dbferia


CREATE TABLE feria_client (
  id bigint NOT NULL AUTO_INCREMENT,
  password varchar(128) NOT NULL,
  last_login datetime(6) DEFAULT NULL,
  is_superuser tinyint(1) NOT NULL,
  first_name varchar(150) NOT NULL,
  last_name varchar(150) NOT NULL,
  is_staff tinyint(1) NOT NULL,
  is_active tinyint(1) NOT NULL,
  date_joined datetime(6) NOT NULL,
  email varchar(254) NOT NULL,
  phone varchar(15) DEFAULT NULL,
  address varchar(100) DEFAULT NULL,
  avatar varchar(100) DEFAULT NULL,
  PRIMARY KEY (id),
  UNIQUE KEY email (email)
);


CREATE TABLE feria_cart (
  id bigint NOT NULL AUTO_INCREMENT,
  confirm tinyint(1) NOT NULL,
  created_at datetime(6) NOT NULL,
  client_id bigint DEFAULT NULL,
  amount decimal(10,2) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (client_id) REFERENCES feria_client (id)
) ;



CREATE TABLE feria_review (
  id bigint NOT NULL AUTO_INCREMENT,
  description varchar(140) NOT NULL,
  classification int NOT NULL,
  created_at datetime(6) NOT NULL,
  client_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (`client_id`) REFERENCES feria_client (id)
) ;



CREATE TABLE feria_coment (
  id bigint NOT NULL AUTO_INCREMENT,
  description varchar(140) NOT NULL,
  classification int NOT NULL,
  created_at datetime(6) NOT NULL,
  client_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (client_id) REFERENCES feria_client (id)
) ;


CREATE TABLE `django_rest_passwordreset_resetpasswordtoken` (
  `created_at` datetime(6) NOT NULL,
  `key` varchar(64) NOT NULL,
  `ip_address` char(39) DEFAULT NULL,
  `user_agent` varchar(256) NOT NULL,
  `user_id` bigint NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_rest_passwordreset_resetpasswordtoken_key_f1b65873_uniq` (`key`),
  KEY `django_rest_password_user_id_e8015b11_fk_feria_cli` (`user_id`),
  CONSTRAINT `django_rest_password_user_id_e8015b11_fk_feria_cli` FOREIGN KEY (`user_id`) REFERENCES `feria_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- dbferia.authtoken_token definition

CREATE TABLE `authtoken_token` (
  `key` varchar(40) NOT NULL,
  `created` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`key`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `authtoken_token_user_id_35299eff_fk_feria_client_id` FOREIGN KEY (`user_id`) REFERENCES `feria_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


	

CREATE TABLE `account_emailaddress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `primary` tinyint(1) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `account_emailaddress_user_id_2c513194_fk_feria_client_id` (`user_id`),
  CONSTRAINT `account_emailaddress_user_id_2c513194_fk_feria_client_id` FOREIGN KEY (`user_id`) REFERENCES `feria_client` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




CREATE TABLE `account_emailconfirmation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `created` datetime(6) NOT NULL,
  `sent` datetime(6) DEFAULT NULL,
  `key` varchar(64) NOT NULL,
  `email_address_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `key` (`key`),
  KEY `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` (`email_address_id`),
  CONSTRAINT `account_emailconfirm_email_address_id_5b7f8c58_fk_account_e` FOREIGN KEY (`email_address_id`) REFERENCES `account_emailaddress` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


CREATE TABLE django_site (
  id int NOT NULL AUTO_INCREMENT,
  domain varchar(100) NOT NULL,
  name varchar(50) NOT NULL,
  PRIMARY KEY (id)
  ) ;
  

 CREATE TABLE socialaccount_socialaccount (
  id int NOT NULL AUTO_INCREMENT,
  provider varchar(30) NOT NULL,
  uid varchar(191) NOT NULL,
  last_login datetime(6) NOT NULL,
  date_joined datetime(6) NOT NULL,
  extra_data longtext NOT NULL,
  user_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES feria_client (id)
) ;
 


CREATE TABLE `socialaccount_socialapp` (
  `id` int NOT NULL AUTO_INCREMENT,
  `provider` varchar(30) NOT NULL,
  `name` varchar(40) NOT NULL,
  `client_id` varchar(191) NOT NULL,
  `secret` varchar(191) NOT NULL,
  `key` varchar(191) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE feria_category (
  id bigint NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  description varchar(100) NOT NULL,
  created_at datetime(6) NOT NULL,
  PRIMARY KEY (id)
) ;



CREATE TABLE feria_article (
  id bigint NOT NULL AUTO_INCREMENT,
  name varchar(50) NOT NULL,
  description varchar(100) NOT NULL,
  price decimal(10,0) NOT NULL,
  stock int unsigned NOT NULL,
  image varchar(100) DEFAULT NULL,
  created_at datetime(6) NOT NULL,
  category_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (category_id) REFERENCES feria_category (id)
  ) ;
  
 
 CREATE TABLE feria_cartdetail (
  id bigint NOT NULL AUTO_INCREMENT,
  quantity int unsigned NOT NULL,
  cart_id bigint NOT NULL,
  item_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (cart_id) REFERENCES feria_cart (id),
  FOREIGN KEY (item_id) REFERENCES feria_article (id)
  );
 
 
 
 
 
CREATE TABLE feria_article_review (
  id bigint NOT NULL AUTO_INCREMENT,
  article_id bigint NOT NULL,
  review_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (article_id) REFERENCES feria_article (id),
  FOREIGN KEY (review_id) REFERENCES feria_review (id)
) ;



 
 CREATE TABLE django_content_type (
  id int NOT NULL AUTO_INCREMENT,
  app_label varchar(100) NOT NULL,
  model varchar(100) NOT NULL,
  PRIMARY KEY (id)
  );
  
 
CREATE TABLE django_admin_log (
  id int NOT NULL AUTO_INCREMENT,
  action_time datetime(6) NOT NULL,
  object_id longtext,
  object_repr varchar(200) NOT NULL,
  action_flag smallint unsigned NOT NULL,
  change_message longtext NOT NULL,
  content_type_id int DEFAULT NULL,
  user_id bigint NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (content_type_id) REFERENCES django_content_type (id),
  FOREIGN KEY (user_id) REFERENCES feria_client (id)
);

 


CREATE TABLE auth_group (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(150) NOT NULL,
  PRIMARY KEY (id)
  ) ;
 
 
 CREATE TABLE auth_permission (
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  content_type_id int NOT NULL,
  codename varchar(100) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (content_type_id) REFERENCES django_content_type (id)
) ;
 
 
CREATE TABLE feria_client_user_permissions (
  id bigint NOT NULL AUTO_INCREMENT,
  client_id bigint NOT NULL,
  permission_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (client_id) REFERENCES feria_client (id),
  FOREIGN KEY (permission_id) REFERENCES auth_permission (id)
) ;



CREATE TABLE feria_client_groups (
  id bigint NOT NULL AUTO_INCREMENT,
  client_id bigint NOT NULL,
  group_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (client_id) REFERENCES feria_client (id),
  FOREIGN KEY (`group_id`) REFERENCES auth_group (id)
) ;



CREATE TABLE auth_group_permissions (
  id bigint NOT NULL AUTO_INCREMENT,
  group_id int NOT NULL,
  permission_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (permission_id) REFERENCES auth_permission (id),
  FOREIGN KEY (group_id) REFERENCES auth_group (id)
) ;


CREATE TABLE socialaccount_socialtoken (
  id int NOT NULL AUTO_INCREMENT,
  token longtext NOT NULL,
  token_secret longtext NOT NULL,
  expires_at datetime(6) DEFAULT NULL,
  account_id int NOT NULL,
  app_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (account_id) REFERENCES socialaccount_socialaccount (id),
  FOREIGN KEY (app_id) REFERENCES socialaccount_socialapp (id)
) ;



CREATE TABLE socialaccount_socialapp_sites (
  id bigint NOT NULL AUTO_INCREMENT,
  socialapp_id int NOT NULL,
  site_id int NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (socialapp_id) REFERENCES socialaccount_socialapp (id),
  FOREIGN KEY (site_id) REFERENCES django_site (id)
) ;


CREATE TABLE feria_newsletters(
  id int NOT NULL AUTO_INCREMENT,
  email varchar(254) NOT NULL,
  created_at datetime(6) NOT NULL,
  PRIMARY KEY (id)
) ;

