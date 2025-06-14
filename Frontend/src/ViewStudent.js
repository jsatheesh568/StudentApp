import React, { useState, useEffect } from 'react';
import { Card, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useParams, Link } from 'react-router-dom';
import studentService from './services/StudentService';


const ViewStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = async () => {
    try {
      setLoading(true);
      const response = await studentService.getStudentById(id);
      setStudent(response.data);
      setError('');
    } catch (error) {
      setError('Error loading student details. Please try again.');
      console.error('Error loading student:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await studentService.deleteStudent(id);
        navigate('/', { state: { message: 'Student deleted successfully!' } });
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
        <p>Loading student details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="text-center">
        {error}
        <br />
        <Button variant="outline-primary" onClick={() => navigate('/')} className="mt-2">
          Back to Student List
        </Button>
      </Alert>
    );
  }

  if (!student) {
    return (
      <Alert variant="warning" className="text-center">
        Student not found.
        <br />
        <Button variant="outline-primary" onClick={() => navigate('/')} className="mt-2">
          Back to Student List
        </Button>
      </Alert>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Student Details</h2>
        <div>
          <Button variant="outline-secondary" onClick={() => navigate('/')} className="me-2">
            Back to List
          </Button>
          <Link to={`/edit/${student.id}`} className="btn btn-warning me-2">
            Edit Student
          </Link>
          <Button variant="danger" onClick={handleDelete}>
            Delete Student
          </Button>
        </div>
      </div>

      <div className="student-details">
        <Row>
          <Col md={6}>
            <Card className="h-100">
              <Card.Header>
                <h5>Personal Information</h5>
              </Card.Header>
              <Card.Body>
                <div className="detail-row">
                  <Row>
                    <Col sm={4} className="detail-label">ID:</Col>
                    <Col sm={8} className="detail-value">{student.id}</Col>
                  </Row>
                </div>
                <div className="detail-row">
                  <Row>
                    <Col sm={4} className="detail-label">First Name:</Col>
                    <Col sm={8} className="detail-value">{student.firstName}</Col>
                  </Row>
                </div>
                <div className="detail-row">
                  <Row>
                    <Col sm={4} className="detail-label">Last Name:</Col>
                    <Col sm={8} className="detail-value">{student.lastName}</Col>
                  </Row>
                </div>
                <div className="detail-row">
                  <Row>
                    <Col sm={4} className="detail-label">Full Name:</Col>
                    <Col sm={8} className="detail-value">
                      <strong>{student.firstName} {student.lastName}</strong>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card className="h-100">
              <Card.Header>
                <h5>Contact Information</h5>
              </Card.Header>
              <Card.Body>
                <div className="detail-row">
                  <Row>
                    <Col sm={4} className="detail-label">Email:</Col>
                    <Col sm={8} className="detail-value">
                      <a href={`mailto:${student.email}`} className="text-decoration-none">
                        {student.email}
                      </a>
                    </Col>
                  </Row>
                </div>
                <div className="detail-row">
                  <Row>
                    <Col sm={4} className="detail-label">Phone:</Col>
                    <Col sm={8} className="detail-value">
                      <a href={`tel:${student.phone}`} className="text-decoration-none">
                        {student.phone}
                      </a>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col md={12}>
            <Card>
              <Card.Header>
                <h5>Academic Information</h5>
              </Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <div className="detail-row">
                      <Row>
                        <Col sm={4} className="detail-label">Course:</Col>
                        <Col sm={8} className="detail-value">
                          <span className="badge bg-primary fs-6">{student.course}</span>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="detail-row">
                      <Row>
                        <Col sm={4} className="detail-label">Year:</Col>
                        <Col sm={8} className="detail-value">
                          <span className="badge bg-success fs-6">
                            {student.year}{student.year === 1 ? 'st' : student.year === 2 ? 'nd' : student.year === 3 ? 'rd' : 'th'} Year
                          </span>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewStudent;

