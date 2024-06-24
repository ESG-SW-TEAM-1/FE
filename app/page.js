"use client";

import { useEffect, useState } from "react";
import { getDailyBoxOfficeList } from "../api/kobisApi";
import { useRouter } from "next/navigation";
import { getMovieImg } from "@/api/kakaoApi";

export default function Home() {
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
            const imgData = await getMovieImg(movie.movieNm);
            return {
              movieNm: movie.movieNm,
              imgUrl: imgData.documents[0]?.image_url || null,
            };
          })
        );

        const imgMap = images.reduce((acc, img) => {
          acc[img.movieNm] = img.imgUrl;
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

  return (
    <>
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold mb-8 text-white">
          Today's Top 10 Movies
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {topMovies.map((movie) => (
            <div
              key={movie.rank}
              className="p-4 border rounded-lg shadow-md hover:cursor-pointer"
              onClick={() => router.push(`/movie/${movie.movieCd}`)}
            >
              <h2 className="text-xl font-bold mb-2 text-textActive">
                {movie.movieNm}
              </h2>

              <div className="h-[234px] w-[170px]">
                {movieImages[movie.movieNm] ? (
                  <img
                    src={movieImages[movie.movieNm]}
                    alt={movie.movieNm}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full w-full bg-textActive text-textInactive">
                    Loading
                  </div>
                )}
              </div>

              <p className="text-textInactive">Rank: {movie.rank}</p>
              <p className="text-textInactive">
                Today: {formatCount(movie.audiCnt)} / Total:{" "}
                {formatCount(movie.audiAcc)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
