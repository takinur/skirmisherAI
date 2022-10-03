import React from "react";

export const index = (props) => {
  const { page, setPage, hasNextPage } = props;
  const totalPages = props.response.totalPages - 1;

  const data = props.response.data;

  const pages = [];
  for (let i = 0; i < totalPages; i++) {
    pages.push(i);
  }

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={currentPage === page ? "active" : null}
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  // Page ellipsis
  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = <li onClick={handleNextClick}>&hellip;</li>;
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = <li onClick={handlePrevClick}>&hellip;</li>;
  }

  return <div>index</div>;
};
