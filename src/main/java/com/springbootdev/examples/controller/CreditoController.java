package com.springbootdev.examples.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class CreditoController {

	@RequestMapping("/")
	public String home() {
		return "index";
	}
	
	@RequestMapping("/credito")
	public String credito() {
		return "credito";
	}
	
	@RequestMapping("/cliente")
	public String cliente() {
		return "cliente";
	}
	
}
