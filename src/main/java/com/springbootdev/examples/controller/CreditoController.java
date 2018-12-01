package com.springbootdev.examples.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CreditoController {

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
