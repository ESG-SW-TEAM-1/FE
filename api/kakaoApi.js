const apiKey2 = process.env.NEXT_PUBLIC_API_KEY_2; // 카카오 이미지 api

export const getMovieImg = async (query) => {
  const url = `https://dapi.kakao.com/v2/search/image?query=${encodeURIComponent(
    query
  )}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `KakaoAK ${apiKey2}`,
      },
    });
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
