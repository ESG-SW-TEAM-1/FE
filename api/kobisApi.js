const kobisApiKey = process.env.NEXT_PUBLIC_KOBIS_KEY; // 영화진흥위원회 api

const getCurrentDate = () => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const year = yesterday.getFullYear();
  let month = yesterday.getMonth() + 1;
  let day = yesterday.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }

  return `${year}${month}${day}`;
};

export const getDailyBoxOfficeList = async () => {
  const targetDt = getCurrentDate();
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=${kobisApiKey}&targetDt=${targetDt}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const searchMovieList = async (movieTitle) => {
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieList.json?key=${kobisApiKey}&movieNm=${movieTitle}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getMovieDetailsByCode = async (movieCd) => {
  const url = `https://kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=${kobisApiKey}&movieCd=${movieCd}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`${response.status}`);
    }
    const data = await response.json();
    return data.movieInfoResult.movieInfo;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
