'use client'
import Image from 'next/image'
import React from 'react'

const ImageCarrousel = (allImages: any) => {
  const [currentImage, setCurrentImage] = React.useState(0); 

  // Handler to move to the next image
  const handleNextImage = () => {
    setCurrentImage(currentImage + 1);
    if(currentImage >= allImages.allImages.length - 1)
        setCurrentImage(0);
  };

  // Handler to move to the previous image
  const handlePrevImage = () => {
    setCurrentImage(currentImage - 1);
    if(currentImage <= 0)
        setCurrentImage(allImages.allImages.length - 1)
  };

  return (
    <div className="relative">
        <Image
            src={allImages.allImages[currentImage]}
            alt="Product"
            className="w-full h-auto object-cover rounded-lg"
            width={550}
            height={550}
        />
        {/* Arrows */}
        <button
            onClick={handlePrevImage}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
        >
        ←
        </button>
        <button
            onClick={handleNextImage}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-900"
        >
            →
        </button>
    </div>
  )
}

export default ImageCarrousel