import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser, setCredentials } from "../state/authSlice";
import { useGetTaskListsQuery } from "../state/taskListApiSlice";

export function Profile() {
  const dispatch = useDispatch();
  const { data } = useGetTaskListsQuery();
  const user = useSelector(selectCurrentUser);

  if (!data) {
    return;
  }

  return (
    <>
      <h1 className="mt-4 mb-4">Felhasználó adatai</h1>
      {user ? (
        <>
          <p className="text-center">Teljes név: {user.fullname}</p>
          <p className="text-center">Email: {user.email}</p>
          <p className="text-center">
            {data.filter((taskList) => taskList.userId === user.id).length}{" "}
            feladatsor
          </p>
          <Button
            className="mt-1"
            onClick={() => {
              dispatch(setCredentials({ user: null, accessToken: null }));
            }}
          >
            Kijelentkezés
          </Button>
        </>
      ) : (
        ""
      )}
    </>
  );
}
