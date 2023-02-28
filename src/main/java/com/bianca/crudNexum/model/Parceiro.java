package com.bianca.crudNexum.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="crud_parceiros")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Parceiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    private String name;
    @NotNull
    private String email;

    private enum userType{pessoa_fisica, pessoa_juridica};

    private String cpf;
    private String cnpj;
    @NotNull
    private String cep;
    @NotNull
    private String houseNumber;
    @NotNull
    private String logradouro;
    @NotNull
    private String city;
    private String UF;
    @NotNull
    private String bairro;

}
