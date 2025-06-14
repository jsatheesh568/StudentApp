package com.sbreact.StudentApp.service;

import com.sbreact.StudentApp.model.Student;
import com.sbreact.StudentApp.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Get all students
    public List < Student > getAllStudents ( ) {
        return studentRepository.findAll ( );
    }

    // Get student by ID
    public Optional < Student > getStudentById ( Long id ) {
        return studentRepository.findById ( id );
    }

    // Create new student
    public Student createStudent ( Student student ) {
        // Check if email already exists
        if (studentRepository.existsByEmail ( student.getEmail ( ) )) {
            throw new RuntimeException ( "Student with email " + student.getEmail ( ) + " already exists" );
        }
        return studentRepository.save ( student );
    }

    // Update existing student
    public Student updateStudent ( Long id , Student studentDetails ) {
        Student student = studentRepository.findById ( id )
                .orElseThrow ( ( ) -> new RuntimeException ( "Student not found with id: " + id ) );

        // Check if email is being changed and if new email already exists
        if (!student.getEmail ( ).equals ( studentDetails.getEmail ( ) ) &&
                studentRepository.existsByEmail ( studentDetails.getEmail ( ) )) {
            throw new RuntimeException ( "Student with email " + studentDetails.getEmail ( ) + " already exists" );
        }

        student.setFirstName ( studentDetails.getFirstName ( ) );
        student.setLastName ( studentDetails.getLastName ( ) );
        student.setEmail ( studentDetails.getEmail ( ) );
        student.setPhone ( studentDetails.getPhone ( ) );
        student.setCourse ( studentDetails.getCourse ( ) );
        student.setYear ( studentDetails.getYear ( ) );

        return studentRepository.save ( student );
    }

    // Delete student
    public void deleteStudent ( Long id ) {
        Student student = studentRepository.findById ( id )
                .orElseThrow ( ( ) -> new RuntimeException ( "Student not found with id: " + id ) );
        studentRepository.delete ( student );
    }

    // Search students by name
    public List < Student > searchStudentsByName ( String name ) {
        return studentRepository.findByNameContaining ( name );
    }

    // Get students by course
    public List < Student > getStudentsByCourse ( String course ) {
        return studentRepository.findByCourse ( course );
    }

    // Get students by year
    public List < Student > getStudentsByYear ( Integer year ) {
        return studentRepository.findByYear ( year );
    }

    // Get student by email
    public Optional < Student > getStudentByEmail ( String email ) {
        return studentRepository.findByEmail ( email );
    }
}
