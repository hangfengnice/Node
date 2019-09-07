
-- 学生表 
-- Student
-- 学号
-- 姓名
-- 性别
-- 出生年月日
-- 所在班级
create table student(
  sno varchar(20) primary key,
  sname varchar(20) not null,
  ssex varchar(10) not null,
  sbirthday datetime,
  class varchar(20)
);

-- 教师表
-- Teacher
-- 教师编号
-- 教师名字
-- 教师性别
-- 出生年月日
-- 职称
-- 所在部门
create table teacher(
  tno varchar(20) primary key,
  tname varchar(20) not null,
  tsex VARCHAR(10) not null,
  tbirthday datetime,
  prof varchar(20) not null,
  depart VARCHAR(20) not null 
);

-- 课程表
-- Course
-- 课程号
-- 课程名称
-- 教师编号
create table course(
  cno varchar(20) primary key,
  cname varchar(20) not null,
  tno varchar(20) not null,
  foreign key(tno) references teacher(tno)
);

-- 成绩表
-- Score
-- 学号
-- 课程号
-- 成绩
create table score(
  sno varchar(20) not null,
  cno varchar(20) not null,
  degree decimal,
  foreign key(sno) references student(sno),
  foreign key(cno) references course(cno),
  primary key(sno, cno)
);
-- 往数据表添加数据
insert into student values('101', '曾华', '男', '1977-09-01', '95033');
insert into student values('102', '匡朗', '男', '1975-10-02', '95031');
insert into student values('103', '王丽', '女', '1976-01-23', '95033');
insert into student values('104', '李军', '男', '1976-02-20', '95033');
insert into student values('105', '王芳', '女', '1975-02-10', '95031');
insert into student values('106', '陆君', '男', '1974-06-03', '95031');
insert into student values('107', '王尼玛', '男', '1976-02-20', '95033');
insert into student values('108', '张全蛋', '男', '1975-02-10', '95031');
insert into student values('109', '赵铁柱', '男', '1974-06-03', '95031');
insert into student values('110', '张飞', '男', '1974-06-03', '95038');


-- 添加教师数据
insert into teacher values('804', '李诚', '男', '1958-12-02', '副教授', '计算机系');
insert into teacher values('856', '张旭', '男', '1969-03-12', '讲师', '电子工程系');
insert into teacher values('825', '王萍', '女', '1972-05-05', '助教', '计算机系');
insert into teacher values('831', '刘冰', '女', '1977-08-14', '助教', '电子工程系');

-- 添加课程表
insert into course values('3-105','计算机系', '825');
insert into course values('3-245','操作系统', '804');
insert into course values('6-166','数字电路', '856');
insert into course values('9-888','高等数学', '831');

-- 添加成绩表
insert into score values('101', "3-105", "86");
insert into score values('102', "3-105", "75");
insert into score values('104', "3-105", "68");

insert into score values('103', "3-245", "86");
insert into score values('105', "3-245", "75");
insert into score values('109', "3-245", "68");
insert into score values('103', "3-105", "92");
insert into score values('105', "3-105", "88");
insert into score values('109', "3-105", "76");
-- insert into score values('103', "3-105", "64");
-- insert into score values('105', "3-105", "91");
-- insert into score values('109', "3-105", "78");
insert into score values('103', "6-166", "85");
insert into score values('105', "6-166", "79");
insert into score values('109', "6-166", "81");

-- 查询练习

-- 1. select * from student;
-- 2. select sname,ssex,class from student;

--  select depart from teacher;
-- 排除重复 select distinct depart from teacher;

-- 查询区间 1. select * from score where degree between 60 and 80;  2. select * from score where degree > 60 and degree < 80;

-- 查询或 select * from score where degree in(85, 86, 88);

-- select * from student where class='95031' or ssex='女';

-- select * from student where class='95031' or ssex='女' or sno='101';

-- select * from student order by class desc; 降序 
-- select * from student order by class asc; 升序  默认升序 ascending


-- select * from score order by cno,degree desc; cno 升序 degree 降序

-- select count(sname) from student where class='95031'; count

-- select sno,cno from score where degree=(select max(degree) from score);

-- select sno,cno,degree from score order by degree desc limit 0,1;

--  select cno,avg(degree) from score group by(cno); 分组


create table grade(
  low int(3),
  upp int(3),
  grade char(1)
);
insert into grade values(90, 100, "A");
insert into grade
values(80, 89, "B");
insert into grade
values(70, 79, "C");
insert into grade
values(60, 69, "D");
insert into grade
values(0, 59, "E");

create table person(
  id int,
  name varchar(20),
  cardId int
);
create table card(
  id int,
  name varchar(20)
);

insert into card values(
  1,'饭卡'
);
insert into card
values(
    1, '建行卡'
);
insert into card
values(
    1, '农行卡'
);
insert into card
values(
    1, '工商卡'
);
insert into card
values(
    1, '邮政卡'
);

insert into person values(1, '张三', 1);
insert into person values(2, '李四', 3);
insert into person values(3, '王五', 6);

-- create table user(
--   id int primary key,
--   name varchar(20),
--   money int
-- );
-- insert into user values(1, "a", 1000);

-- update user set money=money-100 where name='a';
-- update user set money=money+100 where name='b';

-- insert into user values(3, '小明', 1000);
-- insert into user values(4, '淘宝店', 1000);
