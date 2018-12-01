package com.springbootdev.examples.controller;

import com.springbootdev.examples.entity.Cliente;
import com.springbootdev.examples.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/clientes")
    public Cliente create(@RequestBody Cliente cliente){
        return clienteRepository.save(cliente);
    }

    @GetMapping("/clientes")
    public List<Cliente> findAll(){
        return clienteRepository.findAll();
    }

    @PutMapping("/clientes/{cliente_id}")
    public Cliente update(@PathVariable("cliente_id") Long clienteId, @RequestBody Cliente clienteObject){
    	Cliente cliente = clienteRepository.findOne(clienteId);
    	cliente.setNome(clienteObject.getNome());
    	cliente.setCpf(clienteObject.getCpf());
    	cliente.setEndereco(clienteObject.getEndereco());
    	cliente.setSexo(clienteObject.getSexo());
    	cliente.setEstadoCivil(clienteObject.getEstadoCivil());
    	cliente.setRenda(clienteObject.getRenda());
    	cliente.setIdade(clienteObject.getIdade());
    	cliente.setDependentes(clienteObject.getDependentes());
    	cliente.setStatus(clienteObject.getStatus());
        return clienteRepository.save(cliente);
    }

    @DeleteMapping("/clientes/{cliente_id}")
    public List<Cliente> delete(@PathVariable("cliente_id") Long clienteId){
    	clienteRepository.delete(clienteId);
        return clienteRepository.findAll();
    }

    @GetMapping("/clientes/{cliente_id}")
    @ResponseBody
    public Cliente findByClienteId(@PathVariable("cliente_id") Long clienteId){
        return clienteRepository.findOne(clienteId);
    }
}
