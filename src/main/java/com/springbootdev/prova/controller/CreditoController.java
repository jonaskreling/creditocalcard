package com.springbootdev.prova.controller;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.springbootdev.prova.entity.Credito;
import com.springbootdev.prova.enumeration.Aprovado;
import com.springbootdev.prova.enumeration.Estado;
import com.springbootdev.prova.enumeration.EstadoCivil;
import com.springbootdev.prova.enumeration.Motivo;
import com.springbootdev.prova.repository.ClienteRepository;
import com.springbootdev.prova.repository.CreditoRepository;

@RestController
@RequestMapping("/api")
public class CreditoController {
	
	private static final Logger LOGGER = Logger.getLogger(CreditoController.class);
	
	@Autowired
    private CreditoRepository creditoRepository;
	
	@Autowired
    private ClienteRepository clienteRepository;

	@CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/creditos")
    public Credito create(@RequestBody Credito credito){
		credito.setCliente(clienteRepository.findOne(credito.getCliente().getId()));
		avaliarCredito(credito);
        return creditoRepository.save(credito);
    }
	
	@CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/creditos")
    public List<Credito> findAll(){
        return creditoRepository.findAll().stream()
        		.sorted((c1, c2) -> c2.getDateCreate().compareTo(c1.getDateCreate()))
        		.collect(Collectors.toList());
    }

    private void avaliarCredito(Credito credito) {
    	BigDecimal score = BigDecimal.ZERO; //Pontuacao para avaliar o cadastro
    	BigDecimal limiteMinAprovado = BigDecimal.valueOf(0.8D); // Limite minimo para aprovar o cadastro
    	
    	BigDecimal salarioMinimo = BigDecimal.valueOf(950.0D); // Salario minimo atual
    	
    	BigDecimal pesoIdade         = BigDecimal.valueOf(0.2D); // Relevancia da Idade 
    	BigDecimal pesoSexo          = BigDecimal.valueOf(0.0D); // Relevancia do Sexo
    	BigDecimal pesoEstadoCivil   = BigDecimal.valueOf(0.3D); // Relevancia do Estado Civil
    	BigDecimal pesoEstado        = BigDecimal.valueOf(0.1D); // Relevancia do Estado
    	BigDecimal pesoRendaPercapta = BigDecimal.valueOf(0.4D); // Relevancia da Renda Percapta (Renda / (Dependentes + Cliente)) > Salario Mínimo
    	
    	BigDecimal scoreIdade = regrasIdade(credito).multiply(pesoIdade);
    	BigDecimal scoreSexo = pesoSexo;
    	BigDecimal scoreEstadoCivil = regrasEstadoCivil(credito).multiply(pesoEstadoCivil);
    	BigDecimal scoreEstado = regrasEstado(credito).multiply(pesoEstado);
    	BigDecimal scoreRendaPercapta = regrasRendaPercapta(credito, salarioMinimo).multiply(pesoRendaPercapta);
    	
    	score = score.add(scoreIdade)
	    		.add(scoreSexo)
	    		.add(scoreEstadoCivil)
	    		.add(scoreEstado)
	    		.add(scoreRendaPercapta);
    	
    	LOGGER.info(score);
    	
    	credito.setAprovado(score.compareTo(limiteMinAprovado) > 0 ? Aprovado.APROVADO : Aprovado.DESAPROVADO);
    	if(credito.getAprovado().equals(Aprovado.DESAPROVADO)){
    		boolean renda = scoreRendaPercapta.compareTo(scoreEstadoCivil) < 0;
    		credito.setMotivo(renda ? Motivo.RENDABAIXA : Motivo.POLITICACREDITO);
    		credito.setLimite(BigDecimal.ZERO);
    	}else{
    		credito.setMotivo(Motivo.APROVADO);
    		BigDecimal renda = rendaPercapta(credito).multiply(BigDecimal.valueOf(0.3D));
    		if(renda.compareTo(BigDecimal.valueOf(500D)) < 0){
    			credito.setLimite(BigDecimal.valueOf(500D));
    		}else if(renda.compareTo(BigDecimal.valueOf(1000D)) < 0){
    			credito.setLimite(BigDecimal.valueOf(1000D));
    		}else{
    			credito.setLimite(BigDecimal.valueOf(2000D));
    		}
    	}
    	
	}
    
    private BigDecimal regrasIdade(Credito credito){
    	Long idade = credito.getCliente().getIdade();
    	if(idade > 16 && idade < 70){
    		return BigDecimal.ONE;
    	}else if(idade < 16){
    		return BigDecimal.ONE.subtract(BigDecimal.valueOf((16 - idade)/10));
    	}
    	return BigDecimal.ONE.subtract(BigDecimal.valueOf((idade - 70)/10));
    }
    
    private BigDecimal regrasEstadoCivil(Credito credito){
    	EstadoCivil estadoCivil = credito.getCliente().getEstadoCivil();
    	if(estadoCivil.equals(EstadoCivil.CASADO) || estadoCivil.equals(EstadoCivil.SOLTEIRO)){
    		return BigDecimal.ONE;
    	}
    	return BigDecimal.valueOf(0.7D);
    }
    
    private BigDecimal regrasEstado(Credito credito){
    	if(Objects.isNull(credito.getCliente().getEndereco()) || credito.getCliente().getEndereco().isEmpty()){
    		return BigDecimal.valueOf(-100D);
    	}
    	Estado estado = credito.getCliente().getEndereco().get(0).getEstado();
    	if(estado.equals(Estado.CE) || estado.equals(Estado.PB) || estado.equals(Estado.DF) || estado.equals(Estado.RR)){
    		return BigDecimal.valueOf(0.9);
    	}
    	return BigDecimal.ONE;
    }
    
    private BigDecimal regrasRendaPercapta(Credito credito, BigDecimal salarioMinimo){
    	if(rendaPercapta(credito).compareTo(salarioMinimo) > 0){
    		return BigDecimal.ONE;
    	}
    	return BigDecimal.ZERO;
    }
    
    private BigDecimal rendaPercapta(Credito credito){
    	BigDecimal renda = credito.getCliente().getRenda();
    	boolean dependentesVazio = Objects.isNull(credito.getCliente().getDependentes()) || credito.getCliente().getDependentes().isEmpty(); 
    	BigDecimal qtdDependentes = dependentesVazio ? BigDecimal.ONE:BigDecimal.valueOf(credito.getCliente().getDependentes().size());
    	return renda.divide(qtdDependentes);
    }
	
}
