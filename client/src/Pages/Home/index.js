import React, { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useSelector, useDispatch } from "react-redux";
import { fetchHeroes, setCurrentPage } from "../../redux/slices/heroSlice";

import Hero from "../../components/Hero";

const Home = () => {
  const ITEMS_PER_PAGE = 5;
  const dispatch = useDispatch();

  const heroes = useSelector((state) => state.hero.items);
  const currentPage = useSelector((state) => state.hero.currentPage);
  const heroAmount = useSelector((state) => state.hero.totalAmount);

  useEffect(() => {
    dispatch(fetchHeroes(currentPage));
  }, [currentPage, dispatch]);

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
      {heroAmount && (
        <ReactPaginate
          initialPage={currentPage - 1}
          className="pagination"
          onPageChange={(event) => {
            dispatch(setCurrentPage(event.selected + 1));
          }}
          pageRangeDisplayed={ITEMS_PER_PAGE}
          pageCount={Math.ceil(heroAmount / ITEMS_PER_PAGE)}
        />
      )}
    </div>
  );
};

export default Home;
