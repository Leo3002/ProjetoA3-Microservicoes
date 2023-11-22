Create database IF NOT EXISTS Lembretes;

use Lembretes;

create table IF NOT EXISTS Lembretes( 
id_Lembretes int primary key not null auto_increment,
Nome_Lembretes Varchar(50),
Data_Lembretes date,
Id_Prioridade int,
Concluido boolean,
CONSTRAINT FK_Prioridade FOREIGN KEY (Id_Prioridade)
    REFERENCES Prioridade(Id_Prioridade)
);

create table IF NOT EXISTS Prioridade(
Id_Prioridade int primary key not null auto_increment,
Prioridade varchar(20)
);

insert into Prioridade(Prioridade) values ("Crucial");
insert into Prioridade(Prioridade) values ("Significativa");
insert into Prioridade(Prioridade) values ("Moderada");
insert into Prioridade(Prioridade) values ("Pouca");
insert into Prioridade(Prioridade) values ("Baixa");