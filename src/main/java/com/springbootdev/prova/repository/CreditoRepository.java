package com.springbootdev.prova.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.springbootdev.prova.entity.Credito;

public interface CreditoRepository extends JpaRepository<Credito, Long>
{

}
