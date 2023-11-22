Create database IF NOT EXISTS Observacoes;

use Observacoes;

create table IF NOT EXISTS Observacoes(
Id_Observacoes int primary key not null auto_increment,
id_Lembretes int not null,
texto varchar(20)
);