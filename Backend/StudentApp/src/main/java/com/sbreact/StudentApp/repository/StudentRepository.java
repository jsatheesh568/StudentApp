package com.sbreact.StudentApp.repository;

import com.sbreact.StudentApp.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository < Student, Long > {

    // Find student by email
    Optional < Student > findByEmail ( String email );

    // Find students by course
    List < Student > findByCourse ( String course );

    // Find students by year
    List < Student > findByYear ( Integer year );

    // Find students by first name or last name (case insensitive)
    @Query ( "SELECT s FROM Student s WHERE LOWER(s.firstName) LIKE LOWER(CONCAT('%', :name, '%')) OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :name, '%'))" )
    List < Student > findByNameContaining ( @Param ( "name" ) String name );

    // Check if email already exists (for validation)
    boolean existsByEmail ( String email );

    // Find students by course and year
    List < Student > findByCourseAndYear ( String course , Integer year );
}
