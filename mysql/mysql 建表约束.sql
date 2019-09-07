-- zhujian
-- create table user(
--   id int primary key,
--   name varchar(20)
-- );

-- insert into user values(1, "张三");
-- insert into user values(2, "张三");

create table user2(
  id int,
  name varchar(20),
  password varchar(20),
  primary key(id, name)
);
-- 联合主键 加起来不重复就可以
insert into user2 values(1, '张三', '123');
insert into user2 values(1, '张三', '123');

-- 自增约束

-- create table user3(
--   id int primary key auto_increment,
--   name varchar(20)
-- );

insert into user3 (name) values('zhangsan');

create table user4(
  id int,
  name varchar(20)
);
alter table user4 add primary key(id);
-- alter table user4 drop primary key;

-- alter table user4 modify id int primary key;

create table user5(
  id int,
  name varchar(20)
)

alter table user5 add unique(name);
insert into user5 values (1, 'zhangsan');

create table user6
(
  id int,
  name varchar(20),
  unique(name)
);

create table user7
(
  id int,
  name varchar(20) unique
);
create table user8
(
  id int,
  name varchar(20),
  unique(id, name)
);

create table user9(
  id int,
  name varchar(20) not null
);
INSERT into user9 values(1, 'zhangsan');

--  默认约束

create table user10(
  id int,
  name varchar(20),
  age int default 10
)

-- - 外建约束

create table classes(
  id int primary key,
  name varchar(20)
);

create table students(
  id int primary key,
  name varchar(20),
  class_id int,
  foreign key(class_id) references classes(id)
);

insert into classes values(1, '一班');
insert into classes values(2, '二班');
insert into classes values(3, '三班');
insert into classes values(4, '四班');

insert into students values(1, 'hf', 1);
insert into students values(2, 'hf', 2);
insert into students values(3, 'hf', 3);
insert into students values(4, 'hf', 4);
insert into students values(1005, 'hf', 5);


-- fanshi 

create table student2(
  id int primary key,
  name varchar(20),
  address varchar(30)
);

insert into student2 values(1, '张三', '中国浙江金华');
insert into student2 values(2, '李四', '中国浙江杭州');
insert into student2 values(3, '王五', '中国浙江宁波');

CREATE table student3(
  id int primary key,
  name varchar(20),
  country varchar(20),
  privence varchar(20),
  city varchar(20),
  details varchar(20)
);
insert into student3 values(1, '张三', '中国', '浙江', '金华', '磐安');
insert into student3 values(2, '李四', '中国', '浙江', '杭州', '西湖');
insert into student3 values(3, '王五', '中国', '浙江', '宁波', '镇海');


create table myborder(
  product_id int,
  customer_id int,
  product_name varchar(20),
  customer_name varchar(20),
  primary key(product_id, customer_id)
)










