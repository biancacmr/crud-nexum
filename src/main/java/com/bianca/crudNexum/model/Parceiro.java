package com.bianca.crudNexum.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.domain.Page;

@Entity
@Table(name="parceiros")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor
public class Parceiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @NotNull
    private String name;
    @NotNull
    @Column(unique=true)
    private String email;
    private String cpf;
    private String cnpj;
    @NotNull
    private String cep;
    @NotNull
    private String numero;
    @NotNull
    private String logradouro;
    @NotNull
    private String cidade;

    @NotNull
    private String bairro;
    @NotNull
    @Enumerated(EnumType.STRING)
    private ParceiroTipo userType;

    public void setType(ParceiroTipo userType) {
        this.userType = userType;
    }
    @NotNull
    @Enumerated(EnumType.STRING)
    private ParceiroUF uf;

    public void setType(ParceiroUF uf) {
        this.uf = uf;
    }

}
