import axios from "axios";
import { useState } from "react";
import { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BASE_URL_SIGNUP_GMDB } from "../store/actions/types";
import LogoProjectTitle from "./assets/LogoProjectTitle";

export const SignUp = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { onClick, setOpen } = props;
  const [state, setState] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });

  const add = (e) => {
    e.preventDefault();
    if (
      state.fullname === "" ||
      state.username === "" ||
      state.email === "" ||
      state.password === ""
    ) {
      alert("please fill all form");
    } else {
      axios.post(BASE_URL_SIGNUP_GMDB, state).then((res) => {
        setOpen(false);
        alert("register successfully");
      });
    }
  };
  return (
    <Fragment className="body ">
      <Form
        onSubmit={add}
        className="modal-from m-1 p-1"
        style={{ width: "20rem" }}
      >
        <div
          className="bd-placeholder-img text-center "
          href="/"
          style={{ margin: "0.5rem" }}
        >
          <LogoProjectTitle />
        </div>
        <Form.Group className="mb-2 mt-4">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={state.fullname}
            onChange={(e) => setState({ ...state, fullname: e.target.value })}
            type="Full Name"
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-2 mt-4">
          <Form.Label>Username</Form.Label>
          <Form.Control
            value={state.username}
            onChange={(e) => setState({ ...state, username: e.target.value })}
            type="Username"
            placeholder=""
          />
        </Form.Group>
        <Form.Group className="mb-2 mt-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            value={state.email}
            onChange={(e) => setState({ ...state, email: e.target.value })}
            type="email"
            placeholder=""
          />
        </Form.Group>

        <Form.Group className="mb-2" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={state.password}
            onChange={(e) => setState({ ...state, password: e.target.value })}
            type="password"
            placeholder=""
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ background: "#FE024E", border: "#FE024E" }}
        >
          Sign Up
        </Button>
        <p className="mt-5 text-muted text-center signFoot">
          have an account?{" "}
          <Link to="/" className="text-danger">
            Sign In
          </Link>
        </p>
      </Form>
    </Fragment>
  );
};
