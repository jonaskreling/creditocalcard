package com.springbootdev.examples.enumeration;

import java.util.Arrays;
import java.util.List;

public enum Sexo {
	
	MASCULINO, 
	FEMININO;
	
	public static List<Sexo> getList() {
		return Arrays.asList(Sexo.values());
	}

}
