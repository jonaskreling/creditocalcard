package com.springbootdev.examples.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.springbootdev.examples.entity.Cidade;
import com.springbootdev.examples.repository.CidadeRepository;

@RestController
@RequestMapping("/api")
public class CidadeController {

    @Autowired
    private CidadeRepository cidadeRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/cidades")
    public Cidade create(@RequestBody Cidade cidade){
        return cidadeRepository.save(cidade);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/cidades")
    public List<Cidade> findAll(){
        return cidadeRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/cidades/{cidade_id}")
    public Cidade update(@PathVariable("cidade_id") Long cidadeId, @RequestBody Cidade cidadeObject){
    	Cidade cidade = cidadeRepository.findOne(cidadeId);
    	cidade.setNome(cidadeObject.getNome());
    	return cidadeRepository.save(cidade);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/cidades/{cidade_id}")
    public List<Cidade> delete(@PathVariable("cidade_id") Long cidadeId){
    	cidadeRepository.delete(cidadeId);
        return cidadeRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/cidades/{cidade_id}")
    @ResponseBody
    public Cidade findByCidadeId(@PathVariable("cidade_id") Long cidadeId){
        return cidadeRepository.findOne(cidadeId);
    }
}
