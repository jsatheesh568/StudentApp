package com.sbreact.StudentApp.controller;

import com.sbreact.StudentApp.model.Student;
import com.sbreact.StudentApp.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ( "/api/students" )
@CrossOrigin ( origins = "http://localhost:3000" )
public class StudentController {

    @Autowired
    private StudentService studentService;

    // Get all students
    @GetMapping
    public ResponseEntity < List < Student > > getAllStudents ( ) {
        try {
            List < Student > students = studentService.getAllStudents ( );
            return new ResponseEntity <> ( students , HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Get student by ID
    @GetMapping ( "/{id}" )
    public ResponseEntity < Student > getStudentById ( @PathVariable Long id ) {
        try {
            Optional < Student > student = studentService.getStudentById ( id );
            if (student.isPresent ( )) {
                return new ResponseEntity <> ( student.get ( ) , HttpStatus.OK );
            } else {
                return new ResponseEntity <> ( HttpStatus.NOT_FOUND );
            }
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Create new student
    @PostMapping
    public ResponseEntity < Student > createStudent ( @Valid @RequestBody Student student ) {
        try {
            Student savedStudent = studentService.createStudent ( student );
            return new ResponseEntity <> ( savedStudent , HttpStatus.CREATED );
        } catch (RuntimeException e) {
            return new ResponseEntity <> ( HttpStatus.BAD_REQUEST );
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Update existing student
    @PutMapping ( "/{id}" )
    public ResponseEntity < Student > updateStudent ( @PathVariable Long id , @Valid @RequestBody Student studentDetails ) {
        try {
            Student updatedStudent = studentService.updateStudent ( id , studentDetails );
            return new ResponseEntity <> ( updatedStudent , HttpStatus.OK );
        } catch (RuntimeException e) {
            return new ResponseEntity <> ( HttpStatus.NOT_FOUND );
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Delete student
    @DeleteMapping ( "/{id}" )
    public ResponseEntity < Void > deleteStudent ( @PathVariable Long id ) {
        try {
            studentService.deleteStudent ( id );
            return new ResponseEntity <> ( HttpStatus.NO_CONTENT );
        } catch (RuntimeException e) {
            return new ResponseEntity <> ( HttpStatus.NOT_FOUND );
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Search students by name
    @GetMapping ( "/search" )
    public ResponseEntity < List < Student > > searchStudentsByName ( @RequestParam String name ) {
        try {
            List < Student > students = studentService.searchStudentsByName ( name );
            return new ResponseEntity <> ( students , HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Get students by course
    @GetMapping ( "/course/{course}" )
    public ResponseEntity < List < Student > > getStudentsByCourse ( @PathVariable String course ) {
        try {
            List < Student > students = studentService.getStudentsByCourse ( course );
            return new ResponseEntity <> ( students , HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Get students by year
    @GetMapping ( "/year/{year}" )
    public ResponseEntity < List < Student > > getStudentsByYear ( @PathVariable Integer year ) {
        try {
            List < Student > students = studentService.getStudentsByYear ( year );
            return new ResponseEntity <> ( students , HttpStatus.OK );
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }

    // Get student by email
    @GetMapping ( "/email/{email}" )
    public ResponseEntity < Student > getStudentByEmail ( @PathVariable String email ) {
        try {
            Optional < Student > student = studentService.getStudentByEmail ( email );
            if (student.isPresent ( )) {
                return new ResponseEntity <> ( student.get ( ) , HttpStatus.OK );
            } else {
                return new ResponseEntity <> ( HttpStatus.NOT_FOUND );
            }
        } catch (Exception e) {
            return new ResponseEntity <> ( HttpStatus.INTERNAL_SERVER_ERROR );
        }
    }
}