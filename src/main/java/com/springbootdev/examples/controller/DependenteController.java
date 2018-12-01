package com.springbootdev.examples.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springbootdev.examples.entity.Dependente;
import com.springbootdev.examples.repository.DependenteRepository;

@RestController
@RequestMapping("/api")
public class DependenteController {

    @Autowired
    private DependenteRepository dependenteRepository;

    @PostMapping("/dependentes")
    public Dependente create(@RequestBody Dependente dependente){
        return dependenteRepository.save(dependente);
    }

    @GetMapping("/dependentes")
    public List<Dependente> findAll(){
        return dependenteRepository.findAll();
    }

    @PutMapping("/dependentes/{dependente_id}")
    public Dependente update(@PathVariable("dependente_id") Long dependenteId, @RequestBody Dependente dependenteObject){
    	Dependente dependente = dependenteRepository.findOne(dependenteId);
    	dependente.setCliente(dependenteObject.getCliente());
    	dependente.setCpf(dependenteObject.getCpf());
    	dependente.setEstadoCivil(dependenteObject.getEstadoCivil());
    	dependente.setIdade(dependenteObject.getIdade());
    	dependente.setNome(dependenteObject.getNome());
    	dependente.setSexo(dependenteObject.getSexo());
    	dependente.setStatus(dependenteObject.getStatus());
    	return dependenteRepository.save(dependente);
    }

    @DeleteMapping("/dependentes/{dependente_id}")
    public List<Dependente> delete(@PathVariable("dependente_id") Long dependenteId){
    	dependenteRepository.delete(dependenteId);
        return dependenteRepository.findAll();
    }

    @GetMapping("/dependentes/{dependente_id}")
    @ResponseBody
    public Dependente findByDependenteId(@PathVariable("dependente_id") Long dependenteId){
        return dependenteRepository.findOne(dependenteId);
    }
}
