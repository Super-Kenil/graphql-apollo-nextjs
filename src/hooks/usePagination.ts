"use client";
import { useCallback, useState } from "react";

import type { Dispatch, SetStateAction } from "react";

type UsePageActions = {
  goToNextPage: () => void;
  goToPrevPage: () => void;
  reset: () => void;
  canGoToNextPage: boolean;
  canGoToPrevPage: boolean;
  setPage: Dispatch<SetStateAction<number>>;
};

type SetPageCallbackType = (page: number | ((page: number) => number)) => void;

export function usePagination(maxPages: number): [number, UsePageActions] {
  const [currentPage, setCurrentPage] = useState(1);

  const canGoToNextPage = currentPage + 1 <= maxPages;
  const canGoToPrevPage = currentPage - 1 > 0;

  const setPage = useCallback<SetPageCallbackType>(
    (page) => {
      const newPage = page instanceof Function ? page(currentPage) : page;

      if (newPage >= 1 && newPage <= maxPages) {
        setCurrentPage(newPage);
        return;
      }

      throw new Error("Page not valid");
    },
    [maxPages, currentPage]
  );

  const goToNextPage = useCallback(() => {
    if (canGoToNextPage) {
      setCurrentPage((page) => page + 1);
    }
  }, [canGoToNextPage]);

  const goToPrevPage = useCallback(() => {
    if (canGoToPrevPage) {
      setCurrentPage((page) => page - 1);
    }
  }, [canGoToPrevPage]);

  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  return [
    currentPage,
    {
      goToNextPage,
      goToPrevPage,
      canGoToNextPage,
      canGoToPrevPage,
      setPage,
      reset,
    },
  ];
}
