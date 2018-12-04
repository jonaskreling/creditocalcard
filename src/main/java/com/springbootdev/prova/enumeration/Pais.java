package com.springbootdev.prova.enumeration;

import java.util.Arrays;
import java.util.List;

public enum Pais {
	
	BR("Brasil");
	
	private final String descricao;
	
	Pais(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return this.descricao;
	}
	
	public static List<Pais> getList() {
		return Arrays.asList(Pais.values());
	}

}
