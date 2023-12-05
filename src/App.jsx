import { Col, Container, Row } from 'react-bootstrap'
import './App.css'
import AddTask from './components/AddTask'
import Navbar from './components/Navbar'
import TaskList from './components/TaskList'

function App() {

  return (
    <Container>
     <Navbar/>
     <Row className='justify-content-md-center'> 
         <Col lg='6'>
         <AddTask/>
         <TaskList/>
         </Col>
     </Row>
    </Container>
  )
}

export default App
