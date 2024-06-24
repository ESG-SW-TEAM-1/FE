"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieImg } from "@/api/kakaoApi";
import { getDailyBoxOfficeList } from "@/api/kobisApi";

const MovieDetail = () => {
  const router = useRouter();
  const { movieCd } = router.query | {};

  const [movieNm, setMovieNm] = useState("");
  const [movieImage, setMovieImage] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieNameData = await getDailyBoxOfficeList(movieCd);
        console.log(movieNameData);
        const fetchedMovieNm = movieNameData?.movieNm || "";

        setMovieNm(fetchedMovieNm);

        const imgData = await getMovieImg(fetchedMovieNm);
        setMovieImage(imgData.documents[0]?.image_url || null);
      } catch (error) {
        console.error(error);
      }
    };

    if (movieCd) {
      fetchMovieDetails();
    }
  }, [movieCd]);

  return (
    <div className="container mx-auto my-8">
      <h1 className="text-3xl font-bold mb-8 text-textActive">{movieNm}</h1>
      <div className="h-[400px] w-[300px]">
        {movieImage ? (
          <img
            src={movieImage}
            alt={movieNm}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full bg-textActive text-textInactive">
            Loading
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
