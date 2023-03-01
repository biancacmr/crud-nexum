package com.bianca.crudNexum.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import com.bianca.crudNexum.model.Parceiro;
import com.bianca.crudNexum.model.repository.ParceiroRepository;

@Controller
public class ParceiroController {

    @Autowired
    private ParceiroRepository parcRepository;

    // Acessa o formulario de cadastro
    @GetMapping("/cadastro")
    public String parceirosCadastro(Parceiro parceiro) {

        return "cadastro";
    }

    // Adiciona novo parceiro
    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String createParceiro(Parceiro parceiro) {

        try {
            parcRepository.save(parceiro);
        } catch (DataIntegrityViolationException e) {
            return "errorDuplicate";
        }

        return "redirect:/visualizar";

    }

    // Acessa o formulario de edição
    @GetMapping("edit/{id}")
    public String updateForm(Model model, @PathVariable(name = "id") int id) {

        Parceiro parceiro = parcRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));

        model.addAttribute("parceiro", parceiro);
        return "edit";
    }

    // Atualiza parceiro
    @PostMapping("update/{id}")
    public String alterarParceiro(@Valid Parceiro parceiro, BindingResult result, @PathVariable int id) {

        if (result.hasErrors()) {
            return "redirect:/edit";
        }

        parcRepository.save(parceiro);
        return "redirect:/visualizar";
    }

    // Deleta o parceiro
    @GetMapping("delete/{id}")
    @CacheEvict(value = "parceiro", allEntries = true)
    public String delete(@PathVariable(name = "id") int id, Model model) {

        Parceiro parceiro = parcRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));

        parcRepository.delete(parceiro);
        return "redirect:/visualizar";
    }

    // Mostra tela de dados do parceiro
    @GetMapping("dados/{id}")
    public String dadosParceiro(Model model, @PathVariable(name = "id") int id) {

        Parceiro parceiro = parcRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id:" + id));

        model.addAttribute("parceiro", parceiro);
        return "dados";
    }



}