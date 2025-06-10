import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
];

const CategoryCarousel = () => {
    const navigate = useNavigate();

    const handleCategoryClick = (cat) => {
        // Navigate to course search with category as query parameter
        navigate(`/course/search?query=${encodeURIComponent(cat)}`);
    };

    return (
        <div>
            <Carousel className=" w-full max-w-xl mx-auto my-10">
                <CarouselContent>
                    {category.map((cat, index) => (
                        <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/3">
                            <Button
                                onClick={() => handleCategoryClick(cat)}
                                variant="outline"
                                className="rounded-full"
                            >
                                {cat}
                            </Button>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
};

export default CategoryCarousel;
