"use client";

import { useEffect, useState } from "react";
import { getDailyBoxOfficeList } from "../api/openApi";
import { useRouter } from "next/navigation";
import SearchMovie from "@/components/searchMovie";

export default function Home() {
  const router = useRouter();
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const data = await getDailyBoxOfficeList();
        const top10Movies = data.boxOfficeResult.dailyBoxOfficeList.slice(
          0,
          10
        );
        setTopMovies(top10Movies);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTopMovies();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <SearchMovie />

      <h1 className="text-3xl font-bold mb-8 text-white">
        Today's Top 10 Movies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topMovies.map((movie) => (
          <div
            key={movie.rank}
            className="p-4 border rounded-lg shadow-md hover:cursor-pointer"
            onClick={() => {
              router.push(`/movie`);
            }}
          >
            <h2 className="text-xl font-bold mb-2 text-textActive">
              {movie.movieNm}
            </h2>
            <p className="text-textInactive">Rank: {movie.rank}</p>
            <p className="text-textInactive">Audience: {movie.audiAcc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
