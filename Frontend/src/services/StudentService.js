import axios from 'axios';

const API_URL = 'http://localhost:8081/api/students';

class StudentService {
  // Get all students
  getAllStudents() {
    return axios.get(API_URL);
  }

  // Get student by ID
  getStudentById(id) {
    return axios.get(`${API_URL}/${id}`);
  }

  // Create new student
  createStudent(student) {
    return axios.post(API_URL, student);
  }

  // Update existing student
  updateStudent(id, student) {
    return axios.put(`${API_URL}/${id}`, student);
  }

  // Delete student
  deleteStudent(id) {
    return axios.delete(`${API_URL}/${id}`);
  }

  // Search students by name
  searchStudentsByName(name) {
    return axios.get(`${API_URL}/search?name=${name}`);
  }

  // Get students by course
  getStudentsByCourse(course) {
    return axios.get(`${API_URL}/course/${course}`);
  }

  // Get students by year
  getStudentsByYear(year) {
    return axios.get(`${API_URL}/year/${year}`);
  }

  // Get student by email
  getStudentByEmail(email) {
    return axios.get(`${API_URL}/email/${email}`);
  }
}

const studentService = new StudentService();
export default studentService;

