USE dbferia;

INSERT INTO dbferia.feria_category (name,description,created_at) VALUES
	 ('Calzado Femenino','Zapatos, Zapatillas y Sandalias para mujer','2023-05-20 12:00:40.522641'),
	 ('Accesorios','Gorros, Sombreros, corbatas, bufandas, cinturones','2023-05-20 12:01:20.060659'),
	 ('Prendas Femeninas','Camisas, pantalones, abrigos, ropa deportiva, remeras','2023-05-20 12:01:42.287615'),
	 ('Prendas Masculinas','Camisas, pantalones, abrigos, ropa deportiva, remeras','2023-05-20 12:01:53.164069'),
	 ('Calzado Masculino','Botas, Zapatos, Zapatillas para hombres','2023-05-20 12:02:28.167650'),
	 ('Infantil','Prendas para nenas y nenes, de 1 a 12 años','2023-05-20 12:03:08.355896');

INSERT INTO dbferia.feria_article (name,description,price,stock,image,created_at,category_id) VALUES
	 ('Botas Wonders','Botas para mujer Talle 38, en cuero color marron de la marca Wonders con cremallera lateral.',8000,1,'images/botaWonders.jpg','2023-05-20 12:38:29.555965',1),
	 ('Bufanda Roja','Bufanda Unisex, de lana natural tejida a mano color rojo',2000,1,'images/bufandaRoja.jpg','2023-05-20 12:43:59.460966',2),
	 ('Remera amarilla','Remera larga talle L para mujer',2500,1,'images/remeramujer.jpg','2023-05-20 12:44:28.657896',3),
	 ('Pantalon niño azul','Pantalon talle 1 para nene, muy abrigado excelente estado como nuevo',3000,1,'images/pantalonnino.jpg','2023-05-20 12:45:38.839538',6),
	 ('Buzo rosa','Buzo con capucha para nena Talle 12',3500,1,'images/buzorosa.jpg','2023-05-20 12:46:31.519521',6),
	 ('Guantes blanco','Guantes de lana blanco, talle unico muy abrigados',1500,1,'images/guantes.jpg','2023-05-20 12:47:10.298156',2),
	 ('Remera violeta','Remera manga corta marca Fila, Talle L',3200,1,'images/remerafila.jpg','2023-05-20 12:48:49.907555',3),
	 ('Cardigan rosa','Cardigan de lana con rombos color rosa, Talle L',5500,1,'images/camperarosa.jpg','2023-05-20 12:48:49.907555',3),
	 ('Botas media caña','Botas de cuero marron media caña talle 42',7500,1,'images/zapatoshombre.jpg','2023-05-20 12:48:49.907555',5),
	 ('Blusa Jazmin Chebar','Blusa Jazmin Chebar a rallas, Talle 2',6500,1,'images/blusaJaminT2.jpg','2023-05-20 12:48:49.907555',3);
INSERT INTO dbferia.feria_article (name,description,price,stock,image,created_at,category_id) VALUES
	 ('Jean Zara','Jean Zara Azul, Talle 42',8500,1,'images/jeanzaraT34.jpg','2023-05-20 12:48:49.907555',4),
	 ('Camisa Amarilla','Camisa Marca SIMs Talle M',6500,1,'images/camisaTM.jpg','2023-06-22 19:36:06.646578',4);
	 

INSERT INTO dbferia.feria_client (password,last_login,is_superuser,first_name,last_name,is_staff,is_active,date_joined,email,phone,address,avatar) VALUES
	 ('pbkdf2_sha256$600000$XXoY3Du66AjHp4ZOQRPFZ4$zIufNcnF1ddCYu/T9qqyeMv0bLAkUeTTteN4/Oxx2fc=','2023-06-20 17:03:05',0,'Susana','Horia',0,1,'2023-06-20 17:02:59','susanahoria@mail.com',NULL,NULL,'avatars/9B7.jpg'),
	 ('pbkdf2_sha256$600000$vIWDMOUrUzDjcxjw57Vs9k$H0S8V0/5yW+34XZpeMWlKJmq3a8f841MUy5l+q081pM=','2023-06-22 00:56:16',1,'Administrador','Root',1,1,'2023-06-20 22:03:42','admin@mail.com',NULL,NULL,'avatars/F2.jpg'),
	 ('pbkdf2_sha256$600000$mv9E2ojJPU5jzdTfmWp4Y0$FFJ8/SYso2DJ5xN0zAK4T7H0tTcV5/5WTk5Gc8KC130=','2023-06-22 19:55:02.912471',0,'Pedro','Pascal',0,1,'2023-06-22 19:43:42','pedropascal@mail.com',NULL,NULL,'avatars/pedro.jpg'),
	 ('pbkdf2_sha256$600000$LJwRy2DWGIRflLhLY7OHw7$xD+UXMs/8gF34JJFDwwi4JjVX0JKMYMORnhmvkPYt9k=','2023-06-22 19:53:14.816779',0,'Araceli','Gonzalez',0,1,'2023-06-22 19:52:30','aragonzalez@mail.com',NULL,NULL,'avatars/araceli.jpg');

INSERT INTO dbferia.feria_coment (description,classification,created_at,client_id) VALUES
	 ('Excelente la pagina',5,'2023-06-22 23:26:12.930527',1),
	 ('Me gusta mucho la pagina',5,'2023-06-22 23:32:51.559448',3),
	 ('Faltan mas productos chicos, pero es linda la pagina',3,'2023-06-22 23:34:09.890537',4);

INSERT INTO dbferia.feria_review (description,classification,created_at,client_id) VALUES
	 ('Hermosa la Bufanda la tengo en verde es re abrigada!!',5,'2023-06-22 20:00:46.328072',4),
	 ('Me encantan estas botas, las quiero ya!!!',4,'2023-06-22 20:01:27.663628',4),
	 ('Excelente calidad los Jean Zara, el calze es comodo',5,'2023-06-22 20:33:55.896185',3),
	 ('Muy lindo el talle y el color, no me gusta mucho el tipo de tela',3,'2023-06-22 20:34:36.657813',3),
	 ('Tengo unas iguales, las uso todo el dia!!',5,'2023-06-22 20:35:04.521504',3);


