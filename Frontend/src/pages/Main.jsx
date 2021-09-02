import React, { useEffect, useState } from "react";
import ButtonCategory from "./Main/ButtonCategory";
import MovieCarousel from "./Main/MovieCarousel";
import { useDispatch, useSelector } from "react-redux";
import { getMovie } from "../store/actions/movie";
import { Container, Pagination } from "react-bootstrap";
import MovieCard from "./Main/MovieCard";

const Main = () => {
  const dispatch = useDispatch();
  const { movie, loading } = useSelector(
    (state) => state.reducerMovie.listMovie
  );

  const { result, loading: loadingSearch } = useSelector(
    (state) => state.reducerMovie.searchResult
  );
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    dispatch(getMovie(offset));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offset]);

  const page1 = () => setOffset(0);
  const page2 = () => setOffset(10);
  const page3 = () => setOffset(20);
  const page4 = () => setOffset(30);
  const page5 = () => setOffset(40);
  const prev = () => setOffset(offset - 10);
  const next = () => setOffset(offset + 10);

  return (
    <>
      <MovieCarousel />
      <ButtonCategory />
      <Container className=" d-flex flex-wrap justify-content-evenly">
        {loading ? (
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            {loadingSearch ? (
              <div className="d-flex justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : result.data && result.data.length ? (
              result?.data?.map((item, index) => {
                return (
                  <div key={index}>
                    <MovieCard data={item} index={index} />
                  </div>
                );
              })
            ) : (
              movie?.data?.map((item, index) => {
                return (
                  <div key={index}>
                    <MovieCard data={item} index={index} />
                  </div>
                );
              })
            )}
            <Container fluid className="py-5">
              <Container className="position-relative">
                <Pagination className="position-absolute top start-50 translate-middle">
                  <Pagination.Prev
                    onClick={prev}
                    disabled={offset === 0 ? true : false}
                  />
                  <Pagination.Item onClick={page1}>{1}</Pagination.Item>
                  <Pagination.Item onClick={page2}>{2}</Pagination.Item>
                  <Pagination.Item onClick={page3}>{3}</Pagination.Item>
                  <Pagination.Item onClick={page4}>{4}</Pagination.Item>
                  <Pagination.Item onClick={page5}>{5}</Pagination.Item>
                  <Pagination.Next
                    onClick={next}
                    disabled={offset === 40 ? true : false}
                  />
                </Pagination>
              </Container>
            </Container>
          </>
        )}
      </Container>
    </>
  );
};

export default Main;
