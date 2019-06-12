## Only test queries

create database geonhee;

use geonhee;

create table user (
	id varchar(50) NOT NULL,
	password varchar(100) NOT NULL,
	name varchar(30) NOT NULL,
	rank varchar(50) NOT NULL,
	PRIMARY KEY(id)
);

insert into user values('tester1', HEX(AES_ENCRYPT('test', MD5('test'))), 'Lee Geonhee', 'employee');
insert into user values('tester2', HEX(AES_ENCRYPT('testdd', MD5('test'))), 'Lee Genhee', 'employee');

update user 
set password=HEX(AES_ENCRYPT('testdd', MD5('test'))), name = 'Lee GH', rank='employee'
where id='tester1';

delete from user where id='tester1';

select * from user;


create table todo (
	no int AUTO_INCREMENT,
	name varchar(30) NOT NULL,
	title varchar(200) NOT NULL,
	date_y int NOT NULL,
	date_m int NOT NULL,
	date_d int NOT NULL,
	body text,
	level int NOT NULL,
	FOREIGN KEY(name) REFERENCES user (name),
	PRIMARY KEY(no)
);

insert into todo values(null, 'Lee Geonhee', 'practice flask', 2019, 6, 11, 'Hello flask', 1);

update todo
set title='PPAP', date_y=2019, date_m=6, date_d=12, body='pen&apple', level=2
where no=1;

delete from todo where no=2;

select id from user where id="beta1360";