import { useState } from "react";
import { CircleArrowRight, CircleArrowLeft, CircleX } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "~/components/ui/carousel";

interface Image {
    src: string;
    alt?: string;
}

interface CarouselLightboxProps {
    images: Image[];
}

export default function CarouselLightbox({ images }: CarouselLightboxProps) {
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    const handlePrevImage = () => {
        setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNextImage = () => {
        setSelectedImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <div className="w-full">
            <Carousel opts={{ loop: true, slidesToScroll: 1 }}>
                <CarouselContent>
                    {images.map((image, index) => (
                        <CarouselItem key={index} className="max-w-md md:break-inside-avoid w-1/3 px-4">
                            <div className="p-1">
                                <Card>
                                    <CardContent
                                        className="flex items-center justify-center p-6 cursor-pointer"
                                        onClick={() => handleImageClick(index)}
                                    >
                                        <img src={image.src} alt={image.alt || `Image ${index + 1}`} className="max-w-full max-h-full object-contain" />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="bg-inherit" />
                <CarouselNext className="bg-inherit" />
            </Carousel>
            
            {lightboxOpen && (
                <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="relative max-w-4xl max-h-5/6 bg-white rounded-lg shadow-lg p-4 overflow-auto">
                        <button
                            className="absolute top-8 right-4 text-gray-600 text-2xl focus:outline-none"
                            onClick={closeLightbox}
                        >
                            <CircleX className="size-12"/>
                        </button>
                        <button
                            className="absolute left-4 top-1/2 text-gray-600 text-2xl focus:outline-none"
                            onClick={handlePrevImage}
                        >
                            <CircleArrowLeft className="size-12"/>
                        </button>

                        <img
                            src={images[selectedImageIndex].src}
                            alt={images[selectedImageIndex].alt || `Lightbox Image ${selectedImageIndex + 1}`}
                            className="max-w-screen max-h-screen object-contain"
                        />

                        <button
                            className="absolute right-8 top-1/2 text-gray-600 text-2xl focus:outline-none"
                            onClick={handleNextImage}
                        >
                            <CircleArrowRight className="size-12"/>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}