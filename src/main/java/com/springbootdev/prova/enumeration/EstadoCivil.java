package com.springbootdev.prova.enumeration;

import java.util.Arrays;
import java.util.List;

public enum EstadoCivil {
	
	CASADO("Casado(a)"), 
	SOLTEIRO("Solteiro(a)"),
	DIVORCIADO("Divorciado(a)"),
	VIUVO("Viúvo(a)");
	
	private final String descricao;
	
	EstadoCivil(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return this.descricao;
	}
	
	public static List<EstadoCivil> getList() {
		return Arrays.asList(EstadoCivil.values());
	}

}
