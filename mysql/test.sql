select version();

-- mysql> select version();
-- +------------+
-- | version()  |
-- +------------+
-- | 5.7.27-log |
-- +------------+
-- 1 row in set (0.00 sec)

-- select user();
-- mysql> select user();
-- +----------------+
-- | user()         |
-- +----------------+
-- | root@localhost |
-- +----------------+
-- 1 row in set (0.00 sec)

select now();
-- mysql> select now();
-- +---------------------+
-- | now()               |
-- +---------------------+
-- | 2019-09-05 18:10:52 |
-- +---------------------+
-- 1 row in set (0.00 sec)

create database db_name;

-- show create database hf;
-- +----------+-------------------------------------------------------------+
-- | Database | Create Database                                             |
-- +----------+-------------------------------------------------------------+
-- | hf       | CREATE DATABASE `hf` /*!40100 DEFAULT CHARACTER SET utf8 */ |
-- +----------+-------------------------------------------------------------+
-- 1 row in set (0.00 sec)

-- 创建数据库
create database db_name;
-- 修改数据库
-- alter database db_name;
-- 删除数据库
drop database db_name;

-- 数据类型

-- 查看数据表解构
-- show columns from tbl_name;

-- 插入
-- 记录查找
select * from tbl_name;
