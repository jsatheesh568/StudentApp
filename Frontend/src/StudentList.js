import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Form, InputGroup, Alert, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import studentService from './services/StudentService';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    loadStudents();
  }, []);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredStudents(students);
    } else {
      const filtered = students.filter(student =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.course.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredStudents(filtered);
    }
  }, [students, searchTerm]);

  const loadStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getAllStudents();
      setStudents(response.data || []);
      setError('');
    } catch (error) {
      setError('Error loading students. Please try again.');
      setStudents([]);
      console.error('Error loading students:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteStudent = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        setSuccessMessage('Student deleted successfully!');
        loadStudents();
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (error) {
        setError('Error deleting student. Please try again.');
        console.error('Error deleting student:', error);
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading students...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Management</h2>
        <Link to="/add" className="btn btn-primary">
          Add New Student
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}

      <div className="search-container">
        <InputGroup className="mb-3">
          <Form.Control
            type="text"
            placeholder="Search students by name, email, or course..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </InputGroup>
      </div>

      {filteredStudents.length === 0 ? (
        <Alert variant="info" className="text-center">
          {searchTerm ? 'No students found matching your search.' : 'No students available. Add some students to get started!'}
        </Alert>
      ) : (
        <Row>
          {filteredStudents.map((student) => (
            <Col md={6} lg={4} key={student.id}>
              <Card className="student-card h-100">
                <Card.Body>
                  <Card.Title>{student.firstName} {student.lastName}</Card.Title>
                  <Card.Text>
                    <strong>Email:</strong> {student.email}<br />
                    <strong>Phone:</strong> {student.phone}<br />
                    <strong>Course:</strong> {student.course}<br />
                    <strong>Year:</strong> {student.year}
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between">
                  <Link to={`/view/${student.id}`} className="btn btn-info btn-sm btn-action">
                    View
                  </Link>
                  <Link to={`/edit/${student.id}`} className="btn btn-warning btn-sm btn-action">
                    Edit
                  </Link>
                  <Button
                    variant="danger"
                    size="sm"
                    className="btn-action"
                    onClick={() => deleteStudent(student.id)}
                  >
                    Delete
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default StudentList;

