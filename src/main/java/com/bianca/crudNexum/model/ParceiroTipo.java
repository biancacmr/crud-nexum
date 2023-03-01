package com.bianca.crudNexum.model;

public enum ParceiroTipo {
    PESSOAFISICA("Pessoa Física"), PESSOAJURIDICA("Pessoa Jurídica");

    private String value;

    private ParceiroTipo(String value) {
        this.value = value;
    }

    public String getType() {
        return value;
    }


}
