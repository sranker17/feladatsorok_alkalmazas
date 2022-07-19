import { Accordion, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../state/authSlice";
import {
  selectEditedTaskListAvailability,
  setAvailable,
  setUpdateParams,
} from "../state/editedTaskListSlice";
import { useGetTasksQuery } from "../state/taskApiSlice";
import { useGetTaskListsQuery } from "../state/taskListApiSlice";
import { useNavigate } from "react-router-dom";

export function MyTaskLists() {
  const { data } = useGetTaskListsQuery();
  const user = useSelector(selectCurrentUser);
  const { data: tasks } = useGetTasksQuery();
  const available = useSelector(selectEditedTaskListAvailability);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!data) {
    return;
  }

  const countPoints = (tasks) => {
    let counter = 0;
    tasks.map((task) => (counter += task.points));
    return counter;
  };

  const modifyList = (taskList) => {
    dispatch(setUpdateParams({ taskList }));
    navigate("../szerkesztett_feladatsor", { replace: true });
  };

  const createTaskList = () => {
    dispatch(setAvailable({ available: true }));
    navigate("../szerkesztett_feladatsor", { replace: true });
  };

  return (
    <>
      <h1 className="mb-3">Feladatsoraim</h1>

      <Accordion className="mt-3 mb-3">
        {data.map((taskList) => {
          if (taskList.userId === user.id) {
            return (
              <Accordion.Item eventKey={taskList.id} key={taskList.id}>
                <Accordion.Header>
                  Cím: {taskList.title} | Státusz: {taskList.status} | Leírás:{" "}
                  {taskList.description} | Feladatok száma:{" "}
                  {taskList.tasks.length} | Létrehozás: {taskList.createdAt} |
                  Módosítás: {taskList.updatedAt}
                </Accordion.Header>
                <Accordion.Body>
                  <p>Cím: {taskList.title}</p>
                  <p>Státusz: {taskList.status}</p>
                  <p>Leírás: {taskList.description}</p>
                  <p>Létrehozás: {taskList.createdAt}</p>
                  <p>Módosítás: {taskList.updatedAt}</p>
                  <p>Összpontszám: {countPoints(taskList.tasks)}</p>
                  {taskList.tasks.map((task) => {
                    if (tasks) {
                      return (
                        <div className="w-25 mx-auto" key={task.id}>
                          <ul>
                            <li>{task.title}</li>
                            <li>{task.description}</li>
                            <li>{task.notes}</li>
                            <li>{task.points}</li>
                          </ul>
                        </div>
                      );
                    }
                  })}
                  {!available && (
                    <Button onClick={() => modifyList(taskList)}>
                      Szerkeszt
                    </Button>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            );
          }
        })}
      </Accordion>
      <Button onClick={() => createTaskList()}>Új feladatsor</Button>
    </>
  );
}
