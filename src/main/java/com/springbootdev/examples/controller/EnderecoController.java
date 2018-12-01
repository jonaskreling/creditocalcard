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

import com.springbootdev.examples.entity.Endereco;
import com.springbootdev.examples.repository.EnderecoRepository;

@RestController
@RequestMapping("/api")
public class EnderecoController {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/enderecos")
    public Endereco create(@RequestBody Endereco endereco){
        return enderecoRepository.save(endereco);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/enderecos")
    public List<Endereco> findAll(){
        return enderecoRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/enderecos/{endereco_id}")
    public Endereco update(@PathVariable("endereco_id") Long enderecoId, @RequestBody Endereco enderecoObject){
    	Endereco endereco = enderecoRepository.findOne(enderecoId);
    	endereco.setCep(enderecoObject.getCep());
    	endereco.setBairro(enderecoObject.getBairro());
    	endereco.setCidade(enderecoObject.getCidade());
    	endereco.setEstado(enderecoObject.getEstado());
    	endereco.setNumero(enderecoObject.getNumero());
    	endereco.setPais(enderecoObject.getPais());
    	endereco.setRua(enderecoObject.getRua());
    	endereco.setCliente(enderecoObject.getCliente());
    	return enderecoRepository.save(endereco);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/enderecos/{endereco_id}")
    public List<Endereco> delete(@PathVariable("endereco_id") Long enderecoId){
    	enderecoRepository.delete(enderecoId);
        return enderecoRepository.findAll();
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/enderecos/{endereco_id}")
    @ResponseBody
    public Endereco findByEnderecoId(@PathVariable("endereco_id") Long enderecoId){
        return enderecoRepository.findOne(enderecoId);
    }
}
