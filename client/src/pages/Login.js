import { useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../state/authApiSlice";
import { setCredentials } from "../state/authSlice";

export function Login() {
  const dispatch = useDispatch();

  const [loginFn] = useLoginMutation();

  const emailRef = useRef();
  const passwordRef = useRef();

  const [values, setValues] = useState({ email: "", password: "" });
  const handleChange = (event) =>
    setValues({ ...values, [event.target.name]: event.target.value });

  const { email, password } = values;

  return (
    <div className="mt-4 w-25 mx-auto">
      <h1 className="mb-3">Bejelentkezés</h1>
      <Form>
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
          onClick={async (event) => {
            try {
              const result = await loginFn({
                strategy: "local",
                email,
                password,
              });
              if (result.data) {
                dispatch(setCredentials(result.data));
                // console.log(result.data);
              }
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Bejelentkezés
        </Button>
      </Form>
    </div>
  );
}
