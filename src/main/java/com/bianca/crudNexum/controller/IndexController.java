package com.bianca.crudNexum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.bianca.crudNexum.model.repository.ParceiroRepository;

import javax.validation.Valid;

@Controller
public class IndexController {

    @Autowired
    private ParceiroRepository parcRepository;

    @GetMapping({"/visualizar", "/"})
    public ModelAndView getAllParceiros() {
        ModelAndView mav = new ModelAndView("index");
        mav.addObject("parceiro", parcRepository.findAll());
        return mav;
    }

}