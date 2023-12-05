Create database IF NOT EXISTS Lembretes;
drop database Lembretes;
use Lembretes;

create table IF NOT EXISTS Lembretes( 
id_Lembretes int primary key not null auto_increment,
Nome_Lembretes Varchar(50),
Data_Lembretes date,
Prioridade varchar(13),
Concluido boolean
);
select * from lembretes;
select * from Prioridade;