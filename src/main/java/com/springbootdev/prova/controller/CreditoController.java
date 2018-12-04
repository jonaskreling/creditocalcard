package com.springbootdev.prova.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbootdev.prova.repository.ClienteRepository;

@RestController
@RequestMapping("/api")
public class CreditoController {
	
	@Autowired
    private ClienteRepository clienteRepository;

	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/")
	public String home() {
		return "index";
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/credito")
	public String credito() {
		return "credito";
	}
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/cliente")
	public String cliente() {
		return "cliente";
	}
	
}
