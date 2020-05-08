create table `user`(
  `id` int auto_increment not null,
  `gender` tinyint not null default 0 comment '0:未知，1:男，2:女',
  `name` varchar(32) not null,
  `email` varchar(32) not null,
  `password` varchar(64) not null,
  `integral_count` int not null default 0 comment '积分',
  `address` varchar(255),
  `tel` varchar(16),
  `role_id` int not null,
  `user_status` tinyint not null default 0,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`),
  unique key(`email`)
);

create table `record`(
  `id` int auto_increment not null,
  `record_num` varchar(64) not null,
  `estate` varchar(255) not null comment '小区',
  `dustbin_id` int not null comment '垃圾箱id',
  `room_num` varchar(32) not null comment '房号',
  `category_id` int not null comment '垃圾分类',
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`),
  unique key(`record_num`)
);

create table `integral`(
  `id` int auto_increment not null,
  `category_id` int not null,
  `category_color` varchar(32) not null,
  `integral_base` int not null,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`),
  unique key(`category_id`)
);

create table `category`(
  `id` int auto_increment not null,
  `category_name` varchar(32) not null,
  `category_type` int not null,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`),
  unique key (`category_type`)
);

create table `garbage`(
  `id` int auto_increment not null,
  `category_id` int not null,
  `garbage_info` text not null,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`)
);

create table `dustbin`(
  `id` int auto_increment not null,
  `estate` int not null,
  `device_code` varchar(64) not null,
  `address` varchar(255) not null,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`),
  unique key(`device_code`)
);

create table `hot_article`(
  `id` int auto_increment not null,
  `description` varchar(255) not null,
  `content` text not null,
  `origin` varchar(64) not null comment '来源',
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`)
);

create table `knowledge`(
  `id` int auto_increment not null,
  `category_id` int not null,
  `content` text not null,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`)
);

create table `question`(
  `id` int auto_increment not null,
  `content` varchar(255) not null,
  `answers` varchar(255) not null,
  `correct` varchar(4) not null,
  `add_count` int not null,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`)
);

create table `admin`(
  `id` int auto_increment not null,
  `username` varchar(32) not null,
  `password` varchar(64) not null,
  `admin_status` tinyint not null,
  `createdAt` timestamp not null default current_timestamp comment '创建时间',
  `updatedAt` timestamp not null default current_timestamp on update current_timestamp comment '修改时间',
  primary key(`id`),
  unique key(`username`)
);