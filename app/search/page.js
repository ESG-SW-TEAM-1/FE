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
    <div>
      {movieList.length > 0 ? (
        <div className="text-textActive">
          <table>
            <thead>
              <tr>
                <th>영화 제목</th>
                <th>장르</th>
                <th>개봉일</th>
                <th>제작 상태</th>
              </tr>
            </thead>
            <tbody>
              {movieList.map((movie, index) => (
                <tr key={index}>
                  <td>{movie.movieNm}</td>
                  <td>{movie.genreAlt}</td>
                  <td>{movie.openDt}</td>
                  <td>{movie.prdtStatNm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-textInactive">검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default SearchPage;
