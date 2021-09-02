import { Switch, Route } from "react-router-dom";
import Main from "../pages/Main";
import Header from "../components/Header";
import Footer from "../components/Footer";
import MovieDetailUpper from "../pages/moviedetailupper";
import NotFound from "../components/assets/404.png";
import { Fragment } from "react";
import UserProfile from "../pages/UserProfile";

const Routers = () => {
  const token = localStorage.getItem("Token");
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route exact path="/signup">
          <Main />
        </Route>
        <Route exact path="/moviedetail/:id">
          <MovieDetailUpper token={token} />
        </Route>
        <Route exact path="/profile">
          <UserProfile />
        </Route>
        <Route path="*">
          <Fragment className="container-fluid">
            <img
              className="container-fluid"
              src={NotFound}
              alt="404 page not found"
            />
          </Fragment>
        </Route>
      </Switch>
      <Footer />
    </>
  );
};

export default Routers;
