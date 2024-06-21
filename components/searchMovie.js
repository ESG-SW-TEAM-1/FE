"use client";

import { searchMovieList } from "@/api/openApi";
import ButtonForm from "@/components/buttonForm";
import InputForm from "@/components/inputForm";
import React, { useState } from "react";

const SearchMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieList, setMovieList] = useState([]);

  const fetchMovieList = async () => {
    try {
      const data = await searchMovieList(movieTitle);
      setMovieList(data.movieListResult.movieList);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center">
        <InputForm
          type="text"
          placeholder="영화 제목"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />

        <div className="ml-2">
          <ButtonForm
            onClick={fetchMovieList}
            disabled={!movieTitle}
            className="py-2 px-6"
          >
            검색
          </ButtonForm>
        </div>
      </div>

      {movieList.length > 0 && (
        <div className="text-textActive">
          {movieList.length === 0 ? (
            <p>검색 결과가 없습니다.</p>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMovie;
