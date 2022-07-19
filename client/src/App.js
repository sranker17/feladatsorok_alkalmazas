import "./App.css";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { Navbar } from "react-bootstrap";
import { Home } from "./pages/Home";
import { TaskBank } from "./pages/TaskBank";
import { Registration } from "./pages/Registration";
import { Login } from "./pages/Login";
import { MyTaskLists } from "./pages/MyTaskLists";
import { EditedTaskList } from "./pages/EditedTaskList";
import { Profile } from "./pages/Profile";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./state/authSlice";
import { selectEditedTaskListAvailability } from "./state/editedTaskListSlice";

function App() {
  const user = useSelector(selectCurrentUser);
  const available = useSelector(selectEditedTaskListAvailability);
  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li>
              <Link className="nav-link" to="/">
                Feladatsor készítő
              </Link>
            </li>
            <li>
              <Link className="nav-link" to="feladatbank">
                Feladatbank
              </Link>
            </li>

            {!user ? (
              <>
                <li>
                  <Link className="nav-link" to="regisztracio">
                    Regisztráció
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="bejelentkezes">
                    Bejelentkezés
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link className="nav-link" to="feladatsoraim">
                    Feladatsoraim
                  </Link>
                </li>

                {available && (
                  <li>
                    <Link className="nav-link" to="szerkesztett_feladatsor">
                      Szerkesztett feladatsor
                    </Link>
                  </li>
                )}
                <li>
                  <Link className="nav-link" to="profil">
                    Profil
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="feladatbank" element={<TaskBank />} />
        <Route path="regisztracio" element={<Registration />} />
        <Route
          path="bejelentkezes"
          element={!user ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="feladatsoraim"
          element={user ? <MyTaskLists /> : <Navigate to="/" />}
        />
        <Route
          path="szerkesztett_feladatsor"
          element={user ? <EditedTaskList /> : <Navigate to="/" />}
        />
        <Route
          path="profil"
          element={user ? <Profile /> : <Navigate to="/" />}
        />
      </Routes>
    </div>
  );
}

export default App;
