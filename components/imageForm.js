import React from "react";
import Image from "next/image";

const ImageForm = ({ src, alt, width, height }) => {
  return (
    <div>
      <Image src={src} alt={alt} width={width} height={height} />
    </div>
  );
};

export default ImageForm;
