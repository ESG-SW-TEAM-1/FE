"use client";

import { useEffect, useState } from "react";
import { getUpcomingMovies } from "@/api/tmdbApi";

export default function UpcomingMovies() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [movieImages, setMovieImages] = useState({});

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const data = await getUpcomingMovies();
        const upcomingMovies = data.results.slice(0, 10);
        setUpcomingMovies(upcomingMovies);
        console.log(upcomingMovies);

        const images = await Promise.all(
          upcomingMovies.map(async (movie) => {
            return {
              id: movie.id,
              title: movie.title,
              posterPath: movie ? movie.poster_path : null,
            };
          })
        );

        const imgMap = images.reduce((acc, img) => {
          acc[img.id] = img.posterPath;
          return acc;
        }, {});

        setMovieImages(imgMap);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const calculateDday = (releaseDate) => {
    const release = new Date(releaseDate);
    const today = new Date();
    const timeDiff = release.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff === 0) {
      return "D-day";
    } else if (daysDiff > 0) {
      return `D-${daysDiff}`;
    } else {
      return `D+${-daysDiff}`;
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-nanum-extra-bold mb-8 text-white">
        Upcoming movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {upcomingMovies.map((movie) => (
          <div key={movie.id} className="p-4 mb-4">
            <div className="h-[234px] w-[170px] my-4">
              {movieImages[movie.id] ? (
                <img
                  src={`https://image.tmdb.org/t/p/w500${
                    movieImages[movie.id]
                  }`}
                  alt={movie.title}
                  className="h-full w-full object-cover rounded-xl"
                />
              ) : (
                <div className="flex items-center justify-center h-full w-full bg-textActive text-textInactive">
                  Loading
                </div>
              )}

              <div>
                <p className="flex justify-evenly items-center my-2">
                  <span className="text-white text-lg font-nanum-heavy italic mr-3">
                    {calculateDday(movie.release_date)}
                  </span>
                  <span className="text-white text-md font-nanum-bold">
                    {movie.title}
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
