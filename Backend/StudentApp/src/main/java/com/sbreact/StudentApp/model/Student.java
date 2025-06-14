package com.sbreact.StudentApp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table ( name = "students" )
public class Student {

    @Id
    @GeneratedValue ( strategy = GenerationType.IDENTITY )
    private Long id;

    @NotBlank ( message = "First name is required" )
    @Size ( min = 2, max = 50, message = "First name must be between 2 and 50 characters" )
    @Column ( name = "first_name", nullable = false )
    private String firstName;

    @NotBlank ( message = "Last name is required" )
    @Size ( min = 2, max = 50, message = "Last name must be between 2 and 50 characters" )
    @Column ( name = "last_name", nullable = false )
    private String lastName;

    @NotBlank ( message = "Email is required" )
    @Email ( message = "Email should be valid" )
    @Column ( name = "email", nullable = false, unique = true )
    private String email;

    @NotBlank ( message = "Phone number is required" )
    @Pattern ( regexp = "^[+]?[0-9]{10,15}$", message = "Phone number should be valid" )
    @Column ( name = "phone" )
    private String phone;

    @NotBlank ( message = "Course is required" )
    @Size ( min = 2, max = 100, message = "Course must be between 2 and 100 characters" )
    @Column ( name = "course", nullable = false )
    private String course;

    @Min ( value = 1, message = "Year must be at least 1" )
    @Max ( value = 6, message = "Year cannot exceed 6" )
    @Column ( name = "year" )
    private Integer year;

    // Default constructor
    public Student ( ) {
    }

    // Constructor with parameters
    public Student ( String firstName , String lastName , String email , String phone , String course , Integer year ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.course = course;
        this.year = year;
    }

    // Getters and Setters
    public Long getId ( ) {
        return id;
    }

    public void setId ( Long id ) {
        this.id = id;
    }

    public String getFirstName ( ) {
        return firstName;
    }

    public void setFirstName ( String firstName ) {
        this.firstName = firstName;
    }

    public String getLastName ( ) {
        return lastName;
    }

    public void setLastName ( String lastName ) {
        this.lastName = lastName;
    }

    public String getEmail ( ) {
        return email;
    }

    public void setEmail ( String email ) {
        this.email = email;
    }

    public String getPhone ( ) {
        return phone;
    }

    public void setPhone ( String phone ) {
        this.phone = phone;
    }

    public String getCourse ( ) {
        return course;
    }

    public void setCourse ( String course ) {
        this.course = course;
    }

    public Integer getYear ( ) {
        return year;
    }

    public void setYear ( Integer year ) {
        this.year = year;
    }

    @Override
    public String toString ( ) {
        return "Student{" +
                "id=" + id +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", course='" + course + '\'' +
                ", year=" + year +
                '}';
    }
}

