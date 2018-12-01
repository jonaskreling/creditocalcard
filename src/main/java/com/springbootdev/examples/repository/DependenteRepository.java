package com.springbootdev.examples.repository;

import com.springbootdev.examples.entity.Dependente;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DependenteRepository extends JpaRepository<Dependente, Long>
{

}
