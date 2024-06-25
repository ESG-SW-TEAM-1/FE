const apiKey2 = process.env.NEXT_PUBLIC_TMDB_KEY; // TMDB api

export const getMovieDetailsFromTMDb = async (movieTitle) => {
  try {
    const searchResponse = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey2}&query=${encodeURIComponent(
        movieTitle
      )}&language=ko-KR`
    );
    const searchData = await searchResponse.json();

    let movie = searchData.results.find(
      (result) =>
        result.title === movieTitle && result.original_title === movieTitle
    );

    if (!movie && searchData.results.length > 0) {
      movie = searchData.results[0];
    }

    if (!movie) {
      return null;
    }

    const movieId = movie.id;
    const detailsResponse = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey2}&language=ko-KR`
    );
    const detailsData = await detailsResponse.json();

    return {
      title: detailsData.title,
      original_title: detailsData.original_title,
      overview: detailsData.overview,
      posterPath: detailsData.poster_path
        ? `https://image.tmdb.org/t/p/w500${detailsData.poster_path}`
        : null,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
