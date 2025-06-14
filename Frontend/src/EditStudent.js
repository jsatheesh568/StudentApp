import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import studentService from './services/StudentService';


const EditStudent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    course: '',
    year: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [error, setError] = useState('');

  const loadStudent = React.useCallback(async () => {
    try {
      setPageLoading(true);
      const response = await studentService.getStudentById(id);
      setStudent(response.data);
      setError('');
    } catch (error) {
      setError('Error loading student. Please try again.');
      console.error('Error loading student:', error);
    } finally {
      setPageLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadStudent();
  }, [loadStudent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!student.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (student.firstName.trim().length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!student.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (student.lastName.trim().length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!student.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(student.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation
    const phoneRegex = /^[+]?[0-9]{10,15}$/;
    if (!student.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(student.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number (10-15 digits)';
    }

    // Course validation
    if (!student.course.trim()) {
      newErrors.course = 'Course is required';
    } else if (student.course.trim().length < 2) {
      newErrors.course = 'Course must be at least 2 characters';
    }

    // Year validation
    const year = parseInt(student.year);
    if (!student.year) {
      newErrors.year = 'Year is required';
    } else if (isNaN(year) || year < 1 || year > 6) {
      newErrors.year = 'Year must be between 1 and 6';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const studentData = {
        ...student,
        year: parseInt(student.year)
      };
      await studentService.updateStudent(id, studentData);
      navigate('/', { state: { message: 'Student updated successfully!' } });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('A student with this email already exists.');
      } else if (error.response && error.response.status === 404) {
        setError('Student not found.');
      } else {
        setError('Error updating student. Please try again.');
      }
      console.error('Error updating student:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (pageLoading) {
    return (
      <div className="loading-spinner">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading student details...</p>
      </div>
    );
  }

  return (
    <div className="form-container">
      <Card>
        <Card.Header>
          <h3>Edit Student</h3>
        </Card.Header>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name *</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={student.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                placeholder="Enter first name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.firstName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name *</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={student.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                placeholder="Enter last name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.lastName}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email *</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={student.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
                placeholder="Enter email address"
              />
              <Form.Control.Feedback type="invalid">
                {errors.email}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={student.phone}
                onChange={handleChange}
                isInvalid={!!errors.phone}
                placeholder="Enter phone number"
              />
              <Form.Control.Feedback type="invalid">
                {errors.phone}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Course *</Form.Label>
              <Form.Control
                type="text"
                name="course"
                value={student.course}
                onChange={handleChange}
                isInvalid={!!errors.course}
                placeholder="Enter course name"
              />
              <Form.Control.Feedback type="invalid">
                {errors.course}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year *</Form.Label>
              <Form.Select
                name="year"
                value={student.year}
                onChange={handleChange}
                isInvalid={!!errors.year}
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
                <option value="5">5th Year</option>
                <option value="6">6th Year</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.year}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Button 
                variant="secondary" 
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Update Student'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EditStudent;

