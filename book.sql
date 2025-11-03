CREATE TABLE book (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  author VARCHAR(255),
  isbn VARCHAR(255)
);

insert into book (name, author, isbn) VALUES('Everything You Ever Wanted to Know','Upton','082305649x');
insert into book (name, author, isbn) VALUES('Photography','Vilppu','205711499');
insert into book (name, author, isbn) VALUES('Drawing Manual Vilppu','Zelanshi','1892053039');
insert into book (name, author, isbn) VALUES('TBA','Zelanshi','0534613932');
insert into book (name, author, isbn) VALUES('Shaping Space','Speight','0534613934');