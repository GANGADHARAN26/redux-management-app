import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import MyVerticallyCenteredModal from "./UpdateTask";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskToServer,
  getTasksFromServer,
  removeTaskFromList,
  setSelectedTasks,
} from "../slices/taskSlice";
const TaskList = () => {
  const { tasksList } = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  const updateTask = (task) => {
    console.log("updateTask");
    setModelShow(true);

    dispatch(setSelectedTasks(task));
  };
  useEffect(() => {
    dispatch(getTasksFromServer());
  }, [dispatch]);
  const deleteTask = (task) => {
    dispatch(deleteTaskToServer(task))
    .then(()=>{
      dispatch(removeTaskFromList(task));
    })
    
  };
  const [modelShow, setModelShow] = useState(false);
  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr className="text-center">
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasksList &&
            tasksList.map((task, index) => {
              return (
                <tr className="text-center" key={task.id}>
                  <td>{index + 1}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-3"
                      onClick={() => updateTask(task)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </Button>
                    <Button variant="primary" onClick={() => deleteTask(task)}>
                      <i className="bi bi-trash3"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <MyVerticallyCenteredModal
        show={modelShow}
        onHide={() => setModelShow(false)}
      />
    </>
  );
};

export default TaskList;
