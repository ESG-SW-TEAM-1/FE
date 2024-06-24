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
    <main className="main-content px-52 md:px-64">
      <div className="container1 flex flex-col justify-between items-center mb-44">
        <div className="container2 flex md:flex-row w-full justify-between items-start mb-4">
          <div className="container3 md:mr-8">
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

          <div className="flex flex-col">
            <div className="container4 flex flex-col items-start">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-white">
                  영화 제목 불러오기
                </h1>
                <p className="mt-2 text-white">
                  여기에는 영화에 대한 간단한 설명이 들어갑니다.
                </p>
              </div>
            </div>

            <div className="container5 flex justify-center mt-4">
              <button
                className="flex justify-center items-center gap-2 bg-[#25304A] hover:bg-[#4263EA] hover:text-white text-[#98A4B7] 
              font-bold py-3 px-20 rounded mr-2 transition duration-300 ease-in-out"
              >
                <img src="/smile.svg" alt="Smile Icon" height={30} width={30} />
                <p>좋아요</p>
              </button>
              <button
                className="flex justify-center items-center gap-2 bg-[#25304A] hover:bg-[#4263EA] hover:text-white text-[#98A4B7] 
              font-bold py-3 px-20 rounded mr-2 transition duration-300 ease-in-out"
              >
                <img src="/sad.svg" alt="Sad Icon" height={30} width={30} />
                <p>좋아요</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    // <div className="container mx-auto my-8">
    //   <h1 className="text-3xl font-bold mb-8 text-textActive">{movieNm}</h1>
    //   <div className="h-[400px] w-[300px]">
    //     {movieImage ? (
    //       <img
    //         src={movieImage}
    //         alt={movieNm}
    //         className="h-full w-full object-cover"
    //       />
    //     ) : (
    //       <div className="flex items-center justify-center h-full w-full bg-textActive text-textInactive">
    //         Loading
    //       </div>
    //     )}
    //   </div>
    // </div>
  );
};

export default MovieDetail;
