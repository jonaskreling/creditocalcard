package com.springbootdev.examples.repository;

import com.springbootdev.examples.entity.Endereco;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EnderecoRepository extends JpaRepository<Endereco, Long>
{

}
