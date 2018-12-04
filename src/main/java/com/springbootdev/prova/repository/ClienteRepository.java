package com.springbootdev.prova.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootdev.prova.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long>
{

}
