# mysql

show databases;

use test;

show tables;

describe pet;
desc

select * from pet;

添加 表结构
alter table user4 add primary key(id)

alter table user4 drop primary key;

alter table user4 modify id int primary key;

外键
foreign key(tno) references teacher(tno)
