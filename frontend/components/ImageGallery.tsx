// React
import { useState } from "react";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";

const ImageGallery = ({ imagesSrc }: { imagesSrc: string[] }) => {
  const [selectedImage, setSelectedImage] = useState("");

  const handleImageClick = (imageSrc: string) => {
    setSelectedImage(imageSrc);
  };

  const handleClosePopup = () => {
    setSelectedImage("");
  };

  return (
    <div className="w-full overflow-y-auto flex justify-center items-center">
      <div className="flex flex-nowrap">
        <ScrollArea className="w-full whitespace-nowrap rounded-xl border">
          <div className="flex  space-x-4 p-4">
            {imagesSrc.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Image ${index + 1}`}
                className=" h-40 m-1 cursor-pointer object-cover rounded-xl"
                onClick={() => handleImageClick(image)}
              />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50 ">
          <div className="relative bg-white pt-12 rounded-xl shadow-lg m-4">
            <button
              className="absolute top-2 right-4 text-2xl text-gray-500 hover:text-gray-700"
              onClick={handleClosePopup}
            >
              &times;
            </button>
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-auto max-w-md max-h-[80vh] object-contain rounded-b-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
