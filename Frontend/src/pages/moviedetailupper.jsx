import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Iframe from "react-iframe";
import { Tabs, Tab } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import "./moviedetailuper.css";
import AllReview from "../components/AllReview";
import { useDispatch, useSelector } from "react-redux";
import { getMovieDetail } from "../store/actions/movieDetail";
import { Card } from "react-bootstrap";

const MovieDetailUpper = () => {
  const dispatch = useDispatch();
  const { detail, loading } = useSelector(
    (state) => state.reducerMovie.detailMovie
  );
  const { id } = useParams();
  useEffect(() => {
    dispatch(getMovieDetail(id));
  }, [dispatch, id]);

  const token = localStorage.getItem("Token");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {loading ? (
        "loading..."
      ) : detail.data && detail.data ? (
        <div className="detail">
          <div
            className="Fullbgimage"
            style={{
              backgroundImage: `url("${detail.data.banner}")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div className="container">
              <div className="upper">
                <div className="poster">
                  <img
                    className="path"
                    src={detail.data.thumbnail}
                    alt={detail.data.title}
                  />
                </div>
                <div className="detailfilm">
                  <h1 className="header">{detail.data.title}</h1>
                  <StarRatings
                    rating={detail.data.rating}
                    starRatedColor="yellow"
                    numberOfStars={5}
                    starDimension="30px"
                    starSpacing="10px"
                  />
                  <h5>Director : {detail.data.director}</h5>
                  <p>{detail.data.synopsis}</p>
                  <button
                    className="trailer"
                    type="button"
                    onClick={handleShow}
                  >
                    Watch Trailer
                  </button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Body>
                      <Iframe
                        className="content-youtube"
                        width="100%"
                        height="315"
                        url="https://www.youtube.com/embed/-FmWuCgJmxo"
                        // url={`${detail.data.trailer}`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      />
                    </Modal.Body>
                  </Modal>
                  {token ? (
                    <button className="watchlist">Add to Watch List</button>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="eventTabs">
              <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
              >
                <Tab eventKey="Overview" title="Overview">
                  <h2>Synopsis</h2>
                  <div>
                    <p>{detail.data.synopsis}</p>
                  </div>
                  <h2>Movie Info</h2>
                  <div>
                    <p>Release Date : {detail.data.releasedate}</p>
                  </div>
                </Tab>
                <Tab eventKey="Characters" title="Characters">
                  <div>
                    {loading
                      ? "Loading..."
                      : detail.data.actors &&
                        detail.data.actors.map((item, index) => {
                          return (
                            <div key={index}>
                              <Card
                                className="AktorCard"
                                style={{ width: "12rem" }}
                              >
                                <Card.Img
                                  className="Actorimage"
                                  src={`${item.image}`}
                                />
                                <Card.Body>
                                  <Card.Title>{item.name}</Card.Title>
                                </Card.Body>
                              </Card>
                            </div>
                          );
                        })}
                  </div>
                </Tab>
                <Tab eventKey="Review" title="Review">
                  {/* BAGIAN REVIEW */}
                  <AllReview token={token} idMovie={id} />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
export default MovieDetailUpper;
