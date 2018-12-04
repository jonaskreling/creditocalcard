package com.springbootdev.prova.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootdev.prova.entity.Dependente;

public interface DependenteRepository extends JpaRepository<Dependente, Long>
{

}
