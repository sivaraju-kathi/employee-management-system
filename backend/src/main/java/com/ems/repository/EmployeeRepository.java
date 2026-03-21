package com.ems.repository;

import com.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Check if email already exists
    boolean existsByEmail(String email);

    // Check email belongs to a different employee (used in update)
    boolean existsByEmailAndIdNot(String email, Long id);

    // Find employee by email
    Optional<Employee> findByEmail(String email);
}
