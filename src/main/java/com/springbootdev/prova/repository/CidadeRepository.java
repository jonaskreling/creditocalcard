package com.springbootdev.prova.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootdev.prova.entity.Cidade;

public interface CidadeRepository extends JpaRepository<Cidade, Long>
{

}
