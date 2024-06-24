"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMovieImg } from "@/api/kakaoApi";
import { getDailyBoxOfficeList } from "@/api/kobisApi";
import YouTubeEmbed from "@/components/youtube";

const MovieDetail = () => {
  const router = useRouter();
  const { movieCd } = router.query || {};

  const [movieNm, setMovieNm] = useState("");
  const [movieImage, setMovieImage] = useState(null);
  const [clickedButton, setClickedButton] = useState(null); // 클릭된 버튼 상태 추가

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

  // 버튼 클릭 이벤트 핸들러 수정
  const handleClick = (buttonType) => {
    if (clickedButton === buttonType) {
      setClickedButton(null); // 이미 클릭된 버튼을 다시 클릭하면 상태 초기화
    } else {
      setClickedButton(buttonType); // 클릭된 버튼 상태 설정
    }
  };

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
                onClick={() => handleClick('like')} // 수정
                className={`flex justify-center items-center gap-2 ${
                  clickedButton === 'like' ? 'bg-[#4263EA] text-white' : 'bg-[#25304A] text-[#98A4B7]'
                } font-bold py-3 px-20 rounded mr-2 transition duration-300 ease-in-out`}
              >
                <img src="/smile.svg" alt="Smile Icon" height={30} width={30} />
                <p>좋아요</p>
              </button>
              <button
                onClick={() => handleClick('dislike')} // 수정
                className={`flex justify-center items-center gap-2 ${
                  clickedButton === 'dislike' ? 'bg-[#4263EA] text-white' : 'bg-[#25304A] text-[#98A4B7]'
                } font-bold py-3 px-20 rounded mr-2 transition duration-300 ease-in-out`}
              >
                <img src="/sad.svg" alt="Sad Icon" height={30} width={30} />
                <p>별로에요</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="youtube-container flex justify-center mb-24">
        <YouTubeEmbed videoId="EiCmnIaj4u8" width={800} height={450} />
      </div>
    </main>
  );
};

export default MovieDetail;