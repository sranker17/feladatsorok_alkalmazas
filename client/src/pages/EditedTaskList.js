import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeEdit, selectTaskList } from "../state/editedTaskListSlice";
import { useGetTasksQuery } from "../state/taskApiSlice";
import {
  useCreateTaskListMutation,
  useUpdateTaskListMutation,
} from "../state/taskListApiSlice";

export function EditedTaskList() {
  const { data: allTasks } = useGetTasksQuery();
  const [createFn] = useCreateTaskListMutation();
  const [updateFn] = useUpdateTaskListMutation();
  const taskList = useSelector(selectTaskList);
  const [saved, setSaved] = useState(null);
  const [values, setValues] = useState({
    title: "",
    status: "draft",
    description: "",
    maxPoints: 0,
    tasks: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (taskList) {
      setValues({
        title: taskList.title,
        status: taskList.status,
        description: taskList.description,
        maxPoints: taskList.maxPoints,
        tasks: taskList.tasks,
      });
    }
  }, [taskList]);

  if (!allTasks) {
    return;
  }

  const getTaskData = (findTask) => {
    let foundTask;
    if (allTasks) {
      allTasks.forEach((task) => {
        if (task.id === findTask.id) {
          foundTask = task;
        }
      });
    }
    return foundTask;
  };

  const closeEditedTaskList = () => {
    dispatch(closeEdit());
    navigate("../feladatsoraim", { replace: true });
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleTaskChange = (event) => {
    const newTasks = [];
    const data = event.target.name.split(":");
    tasks.map((task) => {
      if (task.id === parseInt(data[1])) {
        let editedTask = {};
        if (data[0] === "notes") {
          editedTask = { ...task, notes: event.target.value };
        } else {
          editedTask = { ...task, points: parseInt(event.target.value) };
        }
        newTasks.push(editedTask);
      } else {
        newTasks.push(task);
      }
    });
    let newMaxPoints = 0;
    newTasks.map((task) => (newMaxPoints += task.points));
    setValues({ ...values, tasks: newTasks, maxPoints: newMaxPoints });
  };

  const { title, status, description, maxPoints, tasks } = values;

  return (
    <>
      <h1 className="mb-3">Szerkeztett feladatsor</h1>
      <div className="mt-4 w-25 mx-auto">
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Cím</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Cím"
              id="title"
              name="title"
              defaultValue={taskList.id && taskList.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Státusz</Form.Label>
            <Form.Select
              required
              id="status"
              name="status"
              defaultValue={taskList.id && taskList.status}
              onChange={handleChange}
            >
              <option value="draft">draft</option>
              <option value="published">published</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Leírás</Form.Label>
            <Form.Control
              type="text"
              placeholder="Leírás"
              id="description"
              name="description"
              defaultValue={taskList.id && taskList.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Létrehozás dátuma</Form.Label>
            <Form.Label>{taskList.id && taskList.createdAt}</Form.Label>
            <br></br>
            {!taskList.id && <Form.Label>Nincs</Form.Label>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Módosítás dátuma</Form.Label>
            <br></br>
            <Form.Label>{taskList.id && taskList.updatedAt}</Form.Label>
            {!taskList.id && <Form.Label>Nincs</Form.Label>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Összpontszám</Form.Label>
            <br></br>
            <Form.Label>{maxPoints}</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Feladatok</Form.Label>
          </Form.Group>

          {taskList.tasks.map((task) => {
            if (allTasks) {
              const foundTask = getTaskData(task);
              return (
                <Form.Group className="mb-3" key={task.id}>
                  <Form.Label>Feladat cím: {foundTask.title}</Form.Label>
                  <br></br>
                  <Form.Label>
                    Feladat leírás: {foundTask.description}
                  </Form.Label>
                  <br></br>
                  <Form.Label>Megjegyzés</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Megjegyzés"
                    id={`notes:${task.id}`}
                    name={`notes:${task.id}`}
                    defaultValue={task.notes}
                    onChange={handleTaskChange}
                  />
                  <Form.Label>Pontszám</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Pontszám"
                    id={`points:${task.id}`}
                    name={`points:${task.id}`}
                    defaultValue={task.points}
                    onChange={handleTaskChange}
                  />
                </Form.Group>
              );
            }
          })}

          <Button
            variant="primary"
            onClick={async () => {
              if (taskList.id !== null) {
                //update
                if (title && status && title !== "" && status !== "") {
                  setSaved(null);
                  try {
                    const result = await updateFn({
                      id: taskList.id,
                      title,
                      description,
                      status,
                      tasks,
                    });
                    console.log(result);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  setSaved("failed");
                }
              } else {
                //create
                if (title && status && title !== "" && status !== "") {
                  setSaved(null);
                  try {
                    const result = await createFn({
                      title,
                      description,
                      status,
                      tasks,
                    });
                    console.log(result);
                  } catch (error) {
                    console.log(error);
                  }
                } else {
                  setSaved("failed");
                }
              }
            }}
          >
            Mentés
          </Button>
          <Button variant="primary" onClick={() => closeEditedTaskList()}>
            Szerkesztés lezárása
          </Button>
        </Form>
        {saved === "failed" ? (
          <div className="mt-3 alert alert-danger">
            A címet és a státuszt kötelező megadni!
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
