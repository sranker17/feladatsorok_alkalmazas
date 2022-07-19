import { useState } from "react";
import { Accordion, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { selectCurrentUser } from "../state/authSlice";
import {
  addTask,
  selectTaskList,
  setAvailable,
} from "../state/editedTaskListSlice";
import { useGetTasksInRangeQuery } from "../state/taskApiSlice";

export function TaskBank() {
  const limit = 10;
  const [page, setPage] = useState(0);
  const { data } = useGetTasksInRangeQuery({
    skip: page,
    limit,
  });
  const taskList = useSelector(selectTaskList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectCurrentUser);

  if (!data) {
    return;
  }

  const isTaskInUse = (findTask) => {
    let found = false;
    if (user && taskList.available) {
      taskList.tasks.forEach((task) => {
        if (task.id === findTask.id) {
          found = true;
        }
      });
    }
    return found;
  };

  const addTaskToList = (task) => {
    if (taskList.available) {
      dispatch(addTask({ task }));
    } else {
      dispatch(setAvailable({ available: true }));
      dispatch(addTask({ task }));
      navigate("../szerkesztett_feladatsor", { replace: true });
    }
  };

  const changePage = (num) => {
    setPage(page + num);
  };

  return (
    <>
      <h1 className="mt-2 mb-3">Feladatbank</h1>

      <Accordion className="mt-3 mb-3">
        {data.map((task) => {
          return (
            <Accordion.Item eventKey={task.id} key={task.id}>
              <Accordion.Header>
                Cím: {task.title} | Rövid leírás:{" "}
                {task.description.substr(0, 10)}
              </Accordion.Header>
              <Accordion.Body>
                <p>Leírás: {task.description}</p>
                {user && !isTaskInUse(task) && (
                  <Button onClick={() => addTaskToList(task)}>Kiválaszt</Button>
                )}
                {isTaskInUse(task) && <p>Kiválasztva</p>}
              </Accordion.Body>
            </Accordion.Item>
          );
        })}
      </Accordion>

      <Button onClick={() => changePage(-limit)} disabled={page < limit - 1}>
        Előző
      </Button>
      <Button onClick={() => changePage(limit)} disabled={data.length < limit}>
        Következő
      </Button>
    </>
  );
}
