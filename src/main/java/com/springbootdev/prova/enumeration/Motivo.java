package com.springbootdev.prova.enumeration;

import java.util.Arrays;
import java.util.List;

public enum Motivo {
	
	APROVADO("Foi aprovado"),
	RENDABAIXA("Renda muito baixa"),
	POLITICACREDITO("Política de crédito");
	
	private final String descricao;
	
	Motivo(String descricao){
		this.descricao = descricao;
	}
	
	public String getDescricao(){
		return this.descricao;
	}
	
	public static List<Motivo> getList() {
		return Arrays.asList(Motivo.values());
	}

}
