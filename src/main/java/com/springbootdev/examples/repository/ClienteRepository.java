package com.springbootdev.examples.repository;

import com.springbootdev.examples.entity.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClienteRepository extends JpaRepository<Cliente, Long>
{

}
