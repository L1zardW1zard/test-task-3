import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { setItems } from "../redux/slices/heroSlice";

import Hero from "../components/Hero";

const Home = ({ heroAmount }) => {
  const ITEMS_PER_PAGE = 5;
  const dispatch = useDispatch();

  const heroes = useSelector((state) => state.hero.items);

  //const [heroes, setHeroes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch(`/api/superheroes/?page=${currentPage}`)
      .then((res) => res.json())
      .then((data) => {
        dispatch(setItems(data));
      });
  }, [currentPage]);

  return (
    <div className="container">
      <div className="hero-container">
        {heroes ? (
          heroes.map((hero, i) => {
            return <Hero hero={hero} key={"hero" + i} />;
          })
        ) : (
          <div>Can't find any superheroes</div>
        )}
      </div>
      {!!heroAmount && (
        <ReactPaginate
          className="pagination"
          breakLabel="..."
          nextLabel=">"
          onPageChange={(event) => {
            setCurrentPage(event.selected + 1);
          }}
          pageRangeDisplayed={ITEMS_PER_PAGE}
          pageCount={Math.ceil(heroAmount / ITEMS_PER_PAGE)}
          previousLabel="<"
          renderOnZeroPageCount={null}
        />
      )}
    </div>
  );
};

export default Home;
