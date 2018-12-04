package com.springbootdev.prova.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootdev.prova.entity.Endereco;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>
{

}
