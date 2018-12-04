package com.springbootdev.prova.enumeration;

import java.util.Arrays;
import java.util.List;

public enum Aprovado {
	
	APROVADO,
	DESAPROVADO;
	
	public static List<Aprovado> getList() {
		return Arrays.asList(Aprovado.values());
	}

}
