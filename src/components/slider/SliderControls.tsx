import React from "react";
import type { SliderControlsProps } from "./types/slider";

export const SliderControls: React.FC<SliderControlsProps> = ({
    currentSlide,
    totalSlides,
    onPrevious,
    onNext,
    onSlideSelect,
    showArrows = true,
    showDots = true,
}) => {
    return (
        <>
            {/* Navigation Arrows */}
            {showArrows && (
                <div className="slider-arrows">
                    {/* Previous Arrow (Up) */}
                    <button
                        onClick={onPrevious}
                        className="slider-arrow slider-arrow-up absolute left-1/2 top-8 transform -translate-x-1/2 z-20
                                 bg-blanco bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm
                                 w-12 h-12 rounded-full flex items-center justify-center
                                 transition-all duration-300 hover:scale-110
                                 border border-blanco border-opacity-30"
                        aria-label="Slide anterior"
                    >
                        <svg
                            className="w-5 h-5 text-blanco"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 15l7-7 7 7"
                            />
                        </svg>
                    </button>

                    {/* Next Arrow (Down) */}
                    <button
                        onClick={onNext}
                        className="slider-arrow slider-arrow-down absolute left-1/2 bottom-8 transform -translate-x-1/2 z-20
                                 bg-blanco bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm
                                 w-12 h-12 rounded-full flex items-center justify-center
                                 transition-all duration-300 hover:scale-110
                                 border border-blanco border-opacity-30"
                        aria-label="Slide siguiente"
                    >
                        <svg
                            className="w-5 h-5 text-blanco"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                </div>
            )}

            {/* Slide Dots Indicator */}
            {showDots && totalSlides > 1 && (
                <div className="slider-dots absolute right-8 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="flex flex-col space-y-3">
                        {Array.from({ length: totalSlides }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => onSlideSelect(index)}
                                className={`slider-dot w-3 h-3 rounded-[2px] transition-all duration-300 
                                          hover:scale-125 border-2 border-blanco border-opacity-50
                                          ${
                                              index === currentSlide
                                                  ? "bg-primary border-primary scale-125"
                                                  : "bg-blanco bg-opacity-30 hover:bg-opacity-50"
                                          }`}
                                aria-label={`Ir al slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* Mobile Slide Counter */}
            <div className="slider-counter absolute bottom-8 right-8 z-20 lg:hidden">
                <div className="bg-blanco bg-opacity-20 backdrop-blur-sm px-3 py-2 rounded-full">
                    <span className="text-blanco text-sm font-medium">
                        {currentSlide + 1} / {totalSlides}
                    </span>
                </div>
            </div>
        </>
    );
};
