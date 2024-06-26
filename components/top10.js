"use client";

import { useEffect, useState } from "react";
import { getDailyBoxOfficeList, getMovieDetailsByCode } from "../api/kobisApi";
import { useRouter } from "next/navigation";
import { getMovieDetailsFromTMDb } from "@/api/tmdbApi";

export default function Top10Movies() {
  const router = useRouter();
  const [topMovies, setTopMovies] = useState([]);
  const [movieImages, setMovieImages] = useState({});

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const data = await getDailyBoxOfficeList();
        const top10Movies = data.boxOfficeResult.dailyBoxOfficeList.slice(
          0,
          10
        );
        setTopMovies(top10Movies);

        const images = await Promise.all(
          top10Movies.map(async (movie) => {
            const kobisMovieDetails = await getMovieDetailsByCode(
              movie.movieCd
            );
            const tmdbData = await getMovieDetailsFromTMDb(
              kobisMovieDetails.movieNm,
              kobisMovieDetails.movieNmEn
            );

            return {
              movieCd: movie.movieCd,
              movieNm: kobisMovieDetails.movieNm,
              movieNmEn: kobisMovieDetails.movieNmEn,
              posterPath: tmdbData?.posterPath,
            };
          })
        );

        const imgMap = images.reduce((acc, img) => {
          acc[img.movieNm] = img.posterPath;
          return acc;
        }, {});

        setMovieImages(imgMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopMovies();
  }, []);

  const formatCount = (count) => {
    return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleMovieClick = (movieCd) => {
    router.push(`/movie/${movieCd}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-nanum-extra-bold mb-8 text-white">
        Top 10 Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {topMovies.map((movie) => (
          <div
            key={movie.rank}
            className="p-4 mb-4 hover:cursor-pointer"
            onClick={() => handleMovieClick(movie.movieCd)}
          >
            <div className="h-[234px] w-[170px] my-4">
              {movieImages[movie.movieNm] ? (
                <img
                  src={movieImages[movie.movieNm]}
                  alt={movie.movieNm}
                  className="h-full w-full object-cover rounded-xl hover:opacity-70"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-textActive text-textInactive">
                  Loading
                </div>
              )}

              <div>
                <p className="flex justify-evenly items-center my-2">
                  <span className="text-white text-4xl font-nanum-heavy italic mr-3">
                    {movie.rank}
                  </span>
                  <span className="text-white text-md font-nanum-bold">
                    {movie.movieNm}
                  </span>
                </p>

                <p className="flex justify-center items-end">
                  <span className="text-textInactive text-xs mr-2">Total </span>
                  <span className="text-textActive text-sm">
                    {formatCount(movie.audiAcc)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
