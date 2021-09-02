import React, { Fragment } from "react";
import { Button, Form } from "react-bootstrap";
import "react-responsive-modal/styles.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoProjectTitle from "./assets/LogoProjectTitle";
import axios from "axios";
import { BASE_URL_SIGNIN_GMDB } from "../store/actions/types";

const SignIn = (props) => {
  // eslint-disable-next-line no-unused-vars
  const { onclick, setOpen } = props;
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const refreshPage = () => {
    window.location.reload();
  };

  const login = (e) => {
    e.preventDefault();
    if ((state.email === "") | (state.password === "")) {
      alert("kolom kosong, tolong diisi terlebih dahulu");
      return;
    } else {
      axios.post(BASE_URL_SIGNIN_GMDB, state).then((res) => {
        setOpen(false);
        localStorage.setItem("Token", res.data.token);
        localStorage.setItem("USERID", res.data._id);
        refreshPage();
      });
    }
  };

  return (
    <Fragment className="body ">
      <Form
        onSubmit={login}
        className="modal-from m-1 p-1"
        style={{ width: "20rem" }}
      >
        <div
          className="bd-placeholder-img text-center"
          href="/"
          style={{ margin: "0.5rem" }}
        >
          <LogoProjectTitle />
        </div>
        <Form.Group className="mb-2 mt-4" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setState({ ...state, email: e.target.value })}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setState({ ...state, password: e.target.value })}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ background: "#FE024E", border: "#FE024E" }}
        >
          Login
        </Button>
        <p className="mt-5 text-muted text-center signFoot">
          don't have an account?{" "}
          <Link to="/signup" className="text-danger">
            Sign Up
          </Link>
        </p>
      </Form>
    </Fragment>
  );
};

export default SignIn;
