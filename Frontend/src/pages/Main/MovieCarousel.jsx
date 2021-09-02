import React, { useEffect } from "react";
import { Carousel, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMovieBanner } from "../../store/actions/movie";

const MovieCarousel = () => {
  const dispatch = useDispatch();
  const { playing, loading } = useSelector((state) => state.reducerMovieBanner);
  useEffect(() => {
    dispatch(getMovieBanner());
  }, [dispatch]);
  return (
    <div className="container-fluid" style={{ maxWidth: "75rem" }}>
      <Carousel fade className="justify-content-md-center">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          playing.data &&
          playing.data.map((item, index) => {
            return (
              <Carousel.Item key={index}>
                <a href={`/moviedetail/${item.id}`}>
                  <img
                    className="d-block w-100"
                    src={
                      item.banner ? (
                        `${item.banner}`
                      ) : (
                        <Spinner animation="grow" variant="danger" />
                      )
                    }
                    alt="First slide"
                  />
                </a>
                <Carousel.Caption>
                  <h3>{item.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
            );
          })
        )}
      </Carousel>
    </div>
  );
};

export default MovieCarousel;
