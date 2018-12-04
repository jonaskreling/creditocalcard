package com.springbootdev.prova.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomeController {
	
	@CrossOrigin(origins = "http://localhost:4200")
	@RequestMapping("/")
	public String home() {
		return "index";
	}
	
}
