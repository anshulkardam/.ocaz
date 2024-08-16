import { useState } from "react";

export const Slider = ({ items }) => {
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (index) => {
        setSelectedImage(index);
    };

    const closeFullscreen = () => {
        setSelectedImage(null);
    };

    return (
        <div>
            {/* Fullscreen Image */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50 cursor-pointer"
                    onClick={closeFullscreen}
                >
                    <div className="relative w-[90%] max-w-3xl mx-auto p-4">
                        <img
                            src={items[selectedImage]}
                            className="w-full h-auto object-cover rounded-lg"
                            onClick={closeFullscreen}
                        />
                    </div>
                </div>
            )}

            {/* Slider section */}
            <div className="flex pt-4 w-full h-full">
                <div className="w-[400px] h-[300px] object-cover cursor-pointer">
                    <img
                        src={items[0]}
                        className="w-full h-full object-cover rounded-lg"
                        onClick={() => handleImageClick(0)}
                    />
                </div>
                <div className="flex flex-col justify-center ml-5 space-y-1.5">
                    {items.slice(1).map((item, index) => (
                        <img
                            key={index}
                            src={item}
                            className="w-40 h-24 object-cover rounded-md cursor-pointer"
                            onClick={() => handleImageClick(index + 1)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};
