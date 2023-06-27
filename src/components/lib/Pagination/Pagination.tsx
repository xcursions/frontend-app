/* eslint-disable simple-import-sort/imports */
import match from "@/utils/match";
import { DOTS, usePagination } from "@/hooks/usePagination";

import styles from "./Pagination.module.scss";

type Props = {
  onPageChange: (v: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageLimit: number;
  className: string;
};

export const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageLimit,
  className,
}: Props) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageLimit,
  });

  const lastPage = paginationRange[paginationRange.length - 1];
  const leftDisableCheck = currentPage === 1;
  const rightDisableCheck = currentPage === lastPage;

  const isLeftBtnDisabled = match(leftDisableCheck ? "disabled" : "", {
    disabled: ` ${styles.disabled}`,
    default: "",
  });

  const isRightBtnDisabled = match(rightDisableCheck ? "disabled" : "", {
    disabled: ` ${styles.disabled}`,
    default: "",
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <ul
      className={`${styles.paginationContainer}${
        className ? ` ${className}` : ""
      }`}
    >
      {/* Left navigation arrow */}
      <li
        className={`${styles.paginationItem}${isLeftBtnDisabled}`}
        onClick={onPrevious}
      >
        <button className={`${styles.arrow} ${styles.left}`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="LeftCaret1810"
            role="img"
            viewBox="0 0 14 8"
            color="currentColor"
            fill="currentColor"
          >
            <title id="LeftCaret1810">LeftCaret</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.285 7.701a1.027 1.027 0 001.459-.01l5.937-5.919A1.02 1.02 0 0014 1.034 1.028 1.028 0 0012.257.3l-.003-.004-5.226 5.19L1.764.301 1.76.305A1.028 1.028 0 000 1.027c0 .298.13.561.333.748l5.95 5.93.002-.004z"
            ></path>
          </svg>
          Back
        </button>
      </li>
      {paginationRange.map((pageNumber, idx) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li className={`${styles.paginationItem}${styles.dots}`} key={idx}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            className={`${styles.paginationItem}${
              pageNumber === currentPage ? ` ${styles.selected}` : ""
            }`}
            onClick={() => onPageChange(pageNumber)}
            key={idx}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={`${styles.paginationItem}${isRightBtnDisabled}`}
        onClick={onNext}
      >
        <button className={`${styles.arrow} ${styles.right}`}>
          Next
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-labelledby="RightCaret1810"
            role="img"
            viewBox="0 0 14 8"
            color="currentColor"
            fill="currentColor"
          >
            <title id="RightCaret1810">RightCaret</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.285 7.701a1.027 1.027 0 001.459-.01l5.937-5.919A1.02 1.02 0 0014 1.034 1.028 1.028 0 0012.257.3l-.003-.004-5.226 5.19L1.764.301 1.76.305A1.028 1.028 0 000 1.027c0 .298.13.561.333.748l5.95 5.93.002-.004z"
            ></path>
          </svg>
        </button>
      </li>
    </ul>
  );
};
