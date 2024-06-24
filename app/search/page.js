"use client";

import { searchMovieList } from "@/api/kobisApi";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const [movieList, setMovieList] = useState([]);
  const searchParams = useSearchParams();
  const movieTitle = searchParams.get("title");

  useEffect(() => {
    const fetchMovieList = async () => {
      if (movieTitle) {
        try {
          const data = await searchMovieList(movieTitle);
          setMovieList(data.movieListResult.movieList);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMovieList();
  }, [movieTitle]);

  return (
    <div className="my-10">
      {movieList.length > 0 ? (
        <div
          className="grid grid-cols-4 gap-4"
          style={{
            gridTemplateColumns: "repeat(4, 300px)",
            gridTemplateRows: "repeat(4, 400px)",
          }}
        >
          {movieList.map((movie, index) => (
            <div key={index} className="bg-gray-200 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <p>이미지</p>
                </div>
                <div className="col-span-1">
                  <h1 className="font-bold text-1xl">{movie.movieNm}</h1>
                  <p>장르: {movie.genreAlt}</p>
                  <p>개봉일: {movie.openDt}</p>
                  <p>제작 상태: {movie.prdtStatNm}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-textInactive">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchPage;
