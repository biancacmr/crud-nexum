package com.bianca.crudNexum.model.repository;

import java.util.List;
import java.util.stream.Collectors;

import com.bianca.crudNexum.model.Parceiro;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParceiroRepository extends JpaRepository<Parceiro, Integer> {

}
