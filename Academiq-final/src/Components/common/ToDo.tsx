import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Badge, Button, Form, Modal, Card, ButtonGroup, Stack } from 'react-bootstrap';
import { AiOutlineEdit, AiOutlineDelete, AiOutlinePlus, AiOutlineCalendar, AiOutlineCheck } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../Redux/store/store'; // Adjust the import path as needed
import { Box, Typography } from '@mui/material';
import { addTaskAsync, deleteTaskAsync, getTasksAsync, Task, updateTaskAsync } from '../../../Redux/slices/taskSlice';
import dayjs from 'dayjs';



// const function TaskCard({ task }: { task: Task }) {
//   return (
//     <Card>
//       <Card.Body>
//         <Card.Title>{task.Title}</Card.Title>
//         <Card.Text>{task.Description}</Card.Text>
//         <Card.Text>{task.DueDate}</Card.Text>
//       </Card.Body>
//     </Card>
//   );
// }


// The To-Do List component
const ToDoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useSelector((state: RootState) => state.courses);
  const {user } = useSelector((state:RootState) => state.auth);
  const { tasks, status, error } = useSelector((state: RootState) => state.tasks);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState<Partial<Task>>({});
  
  if(!user) {
    return <div>Loading...</div>
  }

  useEffect(() => {
    dispatch(getTasksAsync({ userId: user.Id }));
  }, [dispatch]);
  
  // Add a new task
  const handleSaveTask = () => {
    if (isEditing) {
      if (currentTask.TaskId) {
        dispatch(updateTaskAsync(currentTask as Task)).then(() => {
          dispatch(getTasksAsync({ userId: user.Id }));
        });
      }
    } else {
      if (currentTask.Title && currentTask.CourseId) {
        const taskToAdd: Task = {
          Title: currentTask.Title,
          Description: currentTask.Description,
          DueDate: currentTask.DueDate ? new Date(currentTask.DueDate) : undefined,
          CreatedBy: user.Id,
          CourseId: currentTask.CourseId,
          IsCompleted: false,
        };
        dispatch(addTaskAsync(taskToAdd)).then(() => {
          dispatch(getTasksAsync({ userId: user.Id }));
        });
      }
    }
    // Reset state after saving
    setCurrentTask({});
    setIsEditing(false);
    setShowModal(false);
  };


 
   // Handle initializing the modal with existing task data for editing
   const handleEditTask = (task: Task) => {
    setIsEditing(true);
    setCurrentTask({ ...task });
    setShowModal(true);
  };

  // Handle saving an updated task
  const handleSaveUpdatedTask = () => {
    if (currentTask.TaskId) {
      dispatch(updateTaskAsync(currentTask as Task)).then(() => {
        if (user?.Id) {
          dispatch(getTasksAsync({ userId: user.Id }));
        }
      });
      setCurrentTask({
        Title: "",
        Description: "",
        DueDate: undefined,
        CourseId: undefined,
      });
      setIsEditing(false);
      setShowModal(false);
    }
  };


  // Delete a task
  const handleDeleteTask = (id: number) => {
    dispatch(deleteTaskAsync(id));
  };

  // Get the color for due date
  const getDueDateColor = (dueDate?: string) => {
    if (!dueDate) return 'secondary';
    const daysLeft = Math.ceil((new Date(dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    if (daysLeft < 3) return 'danger';
    if (daysLeft < 7) return 'warning';
    return 'success';
  };

  const date = dayjs(currentTask.DueDate).format('D-MM-YY');


  return (
    <>
      <Container fluid className="mt-4">
        <Row className="mb-3">
          <Col>
          <h3>To-Do List</h3>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <Button variant="primary" onClick={() => {
              setIsEditing(false);
              setShowModal(true);
              setCurrentTask({});
            }}>
              <AiOutlinePlus /> Create Task
            </Button>
          </Col>
        </Row>
        
        {tasks.map((task) => (
  <Card key={task.TaskId} className="mb-1 shadow-sm">
    <Card.Body className="p-2">

    <Card.Title className="mb-0">
         <Typography variant="h6">
           {task.Title.toUpperCase()}
           </Typography>
          
          </Card.Title>

      <Container fluid className="d-flex justify-content-between p-0">
          <Box>
            <Typography variant='body1'>{task.Description}</Typography>
          <Badge bg="info" >
          {task.CourseName?.toUpperCase() || 'GENERAL'}
        </Badge>
          </Box>
      <ButtonGroup  className='mt-2 h-100' size='sm' >
        <Button
          variant="success"
          onClick={() => handleDeleteTask(task.TaskId!)}
        >
          <AiOutlineCheck />
        </Button>
        <Button
          variant="outline-warning"
          onClick={() => handleEditTask(task)}
        >
          <AiOutlineEdit />
        </Button>
      </ButtonGroup>

          </Container>
          <Card.Footer className="text-muted p-1 mt-2 d-flex justify-content-between">
            <Typography variant="body2">
              You have {task.DueDate ? Math.ceil((new Date(task.DueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)) : 'No'} days left
            </Typography>
            {task.DueDate && (
        <Badge bg={getDueDateColor(task.DueDate.toString())} >
          <AiOutlineCalendar /> {date}
        </Badge>
      )}
          </Card.Footer>
    </Card.Body>

  </Card>
))}

      </Container>

  {/* Add/Edit Task Modal */}
  <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? 'Edit Task' : 'Create a Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskTitle" className="mb-3">
              <Form.Label>What do you need to do?</Form.Label>
              <Form.Control
                type="text"
                value={currentTask.Title || ''}
                onChange={(e) => setCurrentTask({ ...currentTask, Title: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="taskDescription" className="mb-3">
              <Form.Label>anything else you want to add?</Form.Label>
              <Form.Control
                type="text"
                value={currentTask.Description || ''}
                onChange={(e) => setCurrentTask({ ...currentTask, Description: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="taskCourse" className="mb-3">
              <Form.Label>Is this a course task?</Form.Label>
              <Form.Select
                value={currentTask.CourseId || ''}
                onChange={(e) => setCurrentTask({ ...currentTask, CourseId: parseInt(e.target.value) })}
              >
                <option value="">Select a Course...</option>
                {courses.map((course) => (
                  <option key={course.CourseId} value={course.CourseId}>
                    {course.CourseName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="dueDate" className="mb-3">
              <Form.Label>Due Date</Form.Label>
              <Form.Control
                type="date"
                value={currentTask.DueDate ? new Date(currentTask.DueDate).toISOString().split('T')[0] : ''}
                onChange={(e) => setCurrentTask({ ...currentTask, DueDate: new Date(e.target.value) })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={isEditing ? handleSaveUpdatedTask : handleSaveTask}>
            {isEditing ? 'Save Changes' : 'Save Task'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ToDoList;
