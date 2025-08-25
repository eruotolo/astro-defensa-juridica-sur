import React from "react";
import { SliderSlide } from "./SliderSlide";
import { SliderControls } from "./SliderControls";
import { useVerticalSlider } from "./hooks/useVerticalSlider";
import { useTouch } from "./hooks/useTouch";
import type { SliderProps, SlideData } from "./types/slider";

import slider01 from "../../assets/slider-01.jpg";
import slider02 from "../../assets/slider-02.jpg";

// Default slides data for demonstration
const defaultSlides: SlideData[] = [
    {
        id: 1,
        title: "Defensa Legal Experta",
        description:
            "Más de 20 años de experiencia brindando soluciones jurídicas integrales para proteger tus derechos y intereses.",
        image: slider01,
        cta: {
            text: "Consulta Gratuita",
            href: "#contacto",
        },
    },
    {
        id: 2,
        title: "Derecho Corporativo",
        description:
            "Asesoramiento legal completo para empresas, contratos comerciales y cumplimiento normativo.",
        image: slider02,
        cta: {
            text: "Ver Servicios",
            href: "#practice",
        },
    },
];

export const SliderHome: React.FC<SliderProps> = ({
    slides = defaultSlides,
    config,
    className = "",
}) => {
    const {
        currentSlide,
        isAutoPlaying,
        nextSlide,
        previousSlide,
        goToSlide,
        pauseAutoplay,
        resumeAutoplay,
        totalSlides,
    } = useVerticalSlider(slides, config);

    const { containerRef, isDragging } = useTouch({
        onSwipeUp: nextSlide,
        onSwipeDown: previousSlide,
        enabled: config?.enableTouch !== false,
    });

    const handleMouseEnter = () => {
        if (config?.pauseOnHover !== false) {
            pauseAutoplay();
        }
    };

    const handleMouseLeave = () => {
        if (config?.pauseOnHover !== false) {
            resumeAutoplay();
        }
    };

    const containerClasses = `
        slider-home relative w-full h-screen overflow-hidden
        ${isDragging ? "cursor-grabbing" : "cursor-grab"}
        ${className}
    `.trim();

    return (
        <div
            ref={containerRef}
            className={containerClasses}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            role="region"
            aria-label="Slider principal"
            aria-live={isAutoPlaying ? "off" : "polite"}
        >
            {/* Slides Container */}
            <div className="slider-container relative w-full h-full">
                {slides.map((slide, index) => {
                    const isActive = index === currentSlide;

                    return (
                        <SliderSlide
                            key={slide.id}
                            slide={slide}
                            isActive={isActive}
                        />
                    );
                })}
            </div>

            {/* Controls */}
            <SliderControls
                currentSlide={currentSlide}
                totalSlides={totalSlides}
                onPrevious={previousSlide}
                onNext={nextSlide}
                onSlideSelect={goToSlide}
                showArrows={false}
                showDots={true}
            />

            {/* Accessibility Announcements */}
            <div className="sr-only" aria-live="polite" aria-atomic="true">
                Slide {currentSlide + 1} de {totalSlides}: {slides[currentSlide]?.title}
            </div>
        </div>
    );
};
