create database macircle;
use macircle;

create table part(
partId int(5) auto_increment primary key,
part varchar(255) not null
);

desc part;

create table music(
titleId int(5) auto_increment primary key,
title varchar(255) not null,
artist varchar(255) not null
);

desc music;

create table event(
eventId int(5) auto_increment primary key,
eventdate varchar(255) not null,
place varchar(255) not null
);

create table attend(
id int(5) auto_increment primary key,
eventid varchar(255) not null,
titleId int(5) not null,
name varchar(255) not null,
partId int(5) not null,
foreign key(eventId) references event(eventId),
foreign key(titleId) references music(titleId),
foreign key(partId) references part(partId)
);

desc attend;



insert into part(part) values('ボーカル'),('ギター'),('ベース'),('ドラム'),('キーボード');

insert into music(title,artist) values('チェリー','スピッツ'),('リライト','アジカン'),('風吹けば恋','チャットモンチー'),('シルエット','KANA-BOON'),('アボカド','yonige'),('ファンファーレ','sumika'),('真赤','My hair is bad');

insert into event(eventdate, place) values('2018年12月22日','スタジオノア-秋葉原店');

insert into attend(eventId,titleId,name,partId) values('1',4,'まさる',1);
insert into attend(eventId,titleId,name,partId) values('1',7,'とっしー',2);

select id,date,music.title,name from attend join music on attend.titleId = music.titleId;
