"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieDetailsByCode } from "@/api/kobisApi";
import YouTubeEmbed from "@/components/youtube";
import { getMovieDetailsFromTMDb } from "@/api/tmdbApi";

const MovieDetail = () => {
  const router = useRouter();
  const { movieCd } = useParams();

  const [movieDetails, setMovieDetails] = useState(null);
  const [tmdbDetails, setTmdbDetails] = useState(null);
  const [clickedButton, setClickedButton] = useState(null); // 클릭된 버튼 상태 추가

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    return `${year}.${month}.${day}.`;
  };

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        if (movieCd) {
          const movieCode = await getMovieDetailsByCode(movieCd);
          console.log(movieCode);

          const {
            movieNm,
            movieNmEn,
            prdtYear,
            showTm,
            openDt,
            nations,
            genres,
            audits,
          } = movieCode || {};
          const filteredMovieInfo = {
            movieNm,
            movieNmEn,
            prdtYear,
            showTm,
            openDt: formatDate(openDt),
            nationNm: nations?.[0]?.nationNm || "",
            genres: genres?.map((genre) => genre.genreNm).join(", ") || "",
            watchGradeNm: audits[0]?.watchGradeNm,
          };

          setMovieDetails(filteredMovieInfo);

          if (movieNm) {
            const tmdbData = await getMovieDetailsFromTMDb(movieNm);
            setTmdbDetails(tmdbData);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetails();
  }, [movieCd]);

  // 버튼 클릭 이벤트 핸들러 수정
  const handleClick = (buttonType) => {
    if (clickedButton === buttonType) {
      setClickedButton(null); // 이미 클릭된 버튼을 다시 클릭하면 상태 초기화
    } else {
      setClickedButton(buttonType); // 클릭된 버튼 상태 설정
    }
  };

  return (
    <main className="main-content px-52 my-10 md:px-64">
      <div className="container1 flex flex-col justify-between items-center mb-20">
        <div className="container2 flex md:flex-row w-full justify-between items-start mb-4">
          <div className="container3 md:mr-10">
            <div className="h-[468px] w-[340px]">
              {tmdbDetails?.posterPath ? (
                <img
                  src={tmdbDetails.posterPath}
                  alt={movieDetails?.movieNm}
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
            <div className="container4 flex flex-col items-start mb-20">
              <div className="my-4">
                <h1 className="text-3xl font-bold text-white mb-2">
                  <span>{movieDetails?.movieNm}</span>
                </h1>
                <h1>
                  <span className="text-lg text-textInactive">
                    {movieDetails?.movieNmEn},{" "}
                  </span>
                  <span className="text-lg text-textInactive">
                    {movieDetails?.prdtYear}
                  </span>
                </h1>
              </div>

              <p className="my-2 text-white">
                <span className="text-textInactive font-bold">개요</span>{" "}
                <span className="ml-3">
                  {movieDetails?.genres} ・ {movieDetails?.nationNm} ・{" "}
                  {movieDetails?.showTm}분 ・ {movieDetails?.watchGradeNm}
                </span>
              </p>

              <p className="my-2 text-white">
                {" "}
                <span className="text-textInactive font-bold">개봉</span>{" "}
                <span className="ml-3">{movieDetails?.openDt}</span>
              </p>
              {tmdbDetails?.overview && (
                <p className="my-2 text-white">
                  <span className="">{tmdbDetails.overview}</span>
                </p>
              )}
            </div>

            <div className="container5 flex justify-center">
              <button
                onClick={() => handleClick("like")} // 수정
                className={`flex justify-center items-center gap-2 ${
                  clickedButton === "like"
                    ? "bg-[#4263EA] text-white"
                    : "bg-[#25304A] text-[#98A4B7]"
                } font-bold py-3 px-20 rounded mr-2 transition duration-300 ease-in-out`}
              >
                <img src="/smile.svg" alt="Smile Icon" height={30} width={30} />
                <p>좋아요</p>
              </button>
              <button
                onClick={() => handleClick("dislike")} // 수정
                className={`flex justify-center items-center gap-2 ${
                  clickedButton === "dislike"
                    ? "bg-[#4263EA] text-white"
                    : "bg-[#25304A] text-[#98A4B7]"
                } font-bold py-3 px-20 rounded mr-2 transition duration-300 ease-in-out`}
              >
                <img src="/sad.svg" alt="Sad Icon" height={30} width={30} />
                <p>별로에요</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-b border-textInactive w-full my-6"></div>

      <div className="youtube-container flex justify-center my-24">
        <YouTubeEmbed videoId="EiCmnIaj4u8" width={800} height={450} />
      </div>
    </main>
  );
};

export default MovieDetail;
