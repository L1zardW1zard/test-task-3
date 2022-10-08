import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeroes } from "../../redux/slices/heroSlice";

import Hero from "../../components/Hero";

const Home = ({ heroAmount }) => {
  const ITEMS_PER_PAGE = 5;
  const dispatch = useDispatch();

  const heroes = useSelector((state) => state.hero.items);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    try {
      dispatch(fetchHeroes(currentPage));
    } catch (error) {
      console.log(error);
    }
  }, [currentPage]);

  return (
    <div className="container">
      {heroes.length !== 0 ? (
        <div className="hero-container">
          {heroes.map((hero, i) => {
            return <Hero hero={hero} key={"hero" + i} />;
          })}
        </div>
      ) : (
        <div className="center">Can't find any superheroes</div>
      )}
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
