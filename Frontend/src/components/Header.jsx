import React, { Fragment, useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import LogoProjectTitle from "./assets/LogoProjectTitle";
import SignIn from "./SignIn";
import { Route, Switch } from "react-router-dom";
import { SignUp } from "./SignUp";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../store/actions/user";
import { clearItem, searchItem } from "../store/actions/movie";
import "../styles/Navbar.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const token = localStorage.getItem("Token");

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser(token));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // eslint-disable-next-line no-unused-vars
  const { user, loading } = useSelector((state) => state.reducerUser);

  const searchMovie = (e) => {
    if (e.target.value) {
      dispatch(searchItem(e.target.value));
    } else {
      dispatch(clearItem());
    }
  };

  const debounce = (func, timeout = 500) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, timeout);
    };
  };
  const debounceSearch = debounce((e) => searchMovie(e));

  const logout = () => {
    localStorage.clear();
    window.location.replace("/");
  };

  return (
    <Fragment>
      <Navbar
        collapseOnSelect
        expand="md"
        bg="light"
        variant="light"
        className="px-5 d-flex justify-content-around"
      >
        <Navbar.Brand href="/">
          <LogoProjectTitle />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <form className=" d-flex search-bar">
              {window.location.pathname === "/" ||
              window.location.pathname === "/signup" ? (
                <input
                  style={{ Width: "300px" }}
                  className="form-control me-2"
                  type="search"
                  placeholder="Search Movie"
                  aria-label="Search"
                  onChange={(e) => debounceSearch(e)}
                />
              ) : null}
            </form>
          </Nav>
          {token ? (
            <Nav>
              <div className="text-center">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.data?.fullname}&background=random&length=1&rounded=true&size=35`}
                  className="rounded"
                  alt="..."
                />
              </div>
              <NavDropdown
                title={`Hi, ${user?.data?.fullname}`}
                id="collasible-nav-dropdown"
              >
                <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} href="/">
                  Sign Out
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          ) : (
            <Nav>
              <Switch>
                <Route exact path="/signup">
                  <Nav.Link style={{ fontWeight: "700" }} onClick={onOpenModal}>
                    Sign Up
                  </Nav.Link>
                </Route>
                <Route exact path="/">
                  <Nav.Link style={{ fontWeight: "700" }} onClick={onOpenModal}>
                    Log In
                  </Nav.Link>
                </Route>
              </Switch>
              <Modal open={open} onClose={onCloseModal} center>
                <Switch>
                  <Route exact path="/">
                    <SignIn setOpen={setOpen} />
                  </Route>

                  <Route exact path="/login">
                    <SignIn setOpen={setOpen} />
                  </Route>
                  <Route path="/signup">
                    <SignUp setOpen={setOpen} />
                  </Route>
                </Switch>
              </Modal>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </Fragment>
  );
};

export default Header;
