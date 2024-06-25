"use client";

import ButtonForm from "@/components/buttonForm";
import InputForm from "@/components/inputForm";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import ImageForm from "./imageForm";

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

        <ButtonForm
          onClick={handleSearch}
          disabled={!movieTitle}
          className="ml-1"
        >
          <ImageForm
            src={movieTitle ? "/search_w.svg" : "/search_b.svg"}
            alt="Search"
            width={30}
            height={30}
          />
        </ButtonForm>
      </div>
    </div>
  );
};

export default SearchMovie;
