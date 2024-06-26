"use client";

import { searchMovieList } from "@/api/kobisApi";
import { getMovieDetailsFromTMDb } from "@/api/tmdbApi";
import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SearchPageContent = () => {
  const router = useRouter();
  const [movieList, setMovieList] = useState([]);
  const searchParams = useSearchParams();
  const movieTitle = searchParams.get("title");

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}.`;
  };

  useEffect(() => {
    const fetchMovieList = async () => {
      if (movieTitle) {
        try {
          const data = await searchMovieList(movieTitle);
          const movies = data.movieListResult.movieList;
          const moviesWithImages = await Promise.all(
            movies.map(async (movie) => {
              const tmdbData = await getMovieDetailsFromTMDb(movie.movieNm);
              return {
                ...movie,
                posterPath: tmdbData?.posterPath,
              };
            })
          );
          setMovieList(moviesWithImages);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchMovieList();
  }, [movieTitle]);

  return (
    <div className="my-10 mx-auto text-textActive">
      {movieList.length > 0 ? (
        <div
          className="grid grid-cols-4 gap-4 "
          style={{
            gridTemplateColumns: "repeat(4, 300px)",
            gridTemplateRows: "repeat(4, 400px)",
          }}
        >
          {movieList.map((movie, index) => (
            <div
              key={index}
              className="relative p-4 group hover:cursor-pointer"
              onClick={() => router.push(`/movie/${movie.movieCd}`)}
            >
              <div className="relative h-full w-full">
                {movie.posterPath ? (
                  <img
                    src={movie.posterPath}
                    alt={movie.movieNm}
                    className="h-full w-full object-cover group-hover:opacity-30 transition-opacity duration-300 ease-in-out"
                  />
                ) : (
                  <p className="text-textInactive">No Image</p>
                )}
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out text-white text-center">
                  <h1 className="font-bold text-xl mb-4">{movie.movieNm}</h1>
                  <p className="mb-2">
                    {movie.genreAlt} ・ {movie.prdtStatNm}
                  </p>
                  {movie.openDt && <p>개봉일 {formatDate(movie.openDt)}</p>}
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

const SearchPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
