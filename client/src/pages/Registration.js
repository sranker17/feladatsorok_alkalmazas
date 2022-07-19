import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useRegisterMutation } from "../state/authApiSlice";

export function Registration() {
  const [registerFn] = useRegisterMutation();

  const emailRef = useRef();
  const passwordRef = useRef();
  const fullnameRef = useRef();

  const [registered, setRegistered] = useState(null);

  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const handleChange = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  const { fullname, email, password } = values;

  return (
    <div className="mt-4 w-25 mx-auto">
      <h1 className="mb-3">Regisztráció</h1>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Teljes név</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Név"
            id="fullname"
            name="fullname"
            ref={fullnameRef}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email cím</Form.Label>
          <Form.Control
            required
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            ref={emailRef}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Jelszó</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="Jelszó"
            id="password"
            name="password"
            ref={passwordRef}
            onChange={handleChange}
          />
        </Form.Group>

        <Button
          variant="primary"
          // onClick={() => registerFn({ email, password, fullname })}

          onClick={async () => {
            if (email && password && fullname && email.includes("@")) {
              try {
                const result = await registerFn({
                  email,
                  password,
                  fullname,
                });
                if (result.data) {
                  console.log(result.data);
                  setRegistered("success");
                }
              } catch (err) {
                console.log(err);
                setRegistered("failed");
              }
            }
          }}
        >
          Regisztráció
        </Button>
      </Form>
      {registered === "success" ? (
        <div className="mt-3 alert alert-success">Sikerült a regisztráció!</div>
      ) : (
        ""
      )}

      {registered === "failed" ? (
        <div className="mt-3 alert alert-danger">
          Nem sikerült a regisztráció!
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
