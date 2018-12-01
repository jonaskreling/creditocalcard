package com.springbootdev.examples.enumeration;

import java.util.Arrays;
import java.util.List;

public enum Status {
	
	ATIVO,
	INATIVO;
	
	public static List<Status> getList() {
		return Arrays.asList(Status.values());
	}

}
