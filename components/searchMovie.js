"use client";

import ButtonForm from "@/components/buttonForm";
import InputForm from "@/components/inputForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SearchMovie = () => {
  const [movieTitle, setMovieTitle] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (movieTitle) {
      router.push(`/search?title=${encodeURIComponent(movieTitle)}`);
    }
    setMovieTitle("");
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex items-center">
        <InputForm
          type="text"
          placeholder="영화 제목"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
        />

        <div className="ml-2">
          <ButtonForm
            onClick={handleSearch}
            disabled={!movieTitle}
            className="py-2 px-6"
          >
            검색
          </ButtonForm>
        </div>
      </div>
    </div>
  );
};

export default SearchMovie;
