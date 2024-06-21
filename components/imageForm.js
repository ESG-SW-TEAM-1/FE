import React from "react";
import Image from "next/image";

const ImageForm = ({ src, alt, width, height }) => {
  return (
    <div className="flex justify-center mb-4">
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default ImageForm;
