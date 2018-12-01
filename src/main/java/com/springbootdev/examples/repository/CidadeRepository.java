package com.springbootdev.examples.repository;

import com.springbootdev.examples.entity.Cidade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CidadeRepository extends JpaRepository<Cidade, Long>
{

}
