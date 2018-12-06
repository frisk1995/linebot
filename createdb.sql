create database macircle;
use macircle;

create table part(
partId int(5) auto_increment primary key,
part varchar(255) not null
);

desc part;

create table music(
titleId int(5) auto_increment primary key,
title varchar(255) not null
);

desc music;

create table main(
id int(5) auto_increment primary key,
date datetime,
titleId int(5) not null,
name varchar(255) not null,
partId int(5) not null,
foreign key(titleId) references music(titleId),
foreign key(partId) references music(partId)
);

desc main;

show tables;
