import React, { useEffect, useState } from "react";
import type { SliderSlideProps } from "./types/slider";

export const SliderSlide: React.FC<SliderSlideProps> = ({ slide, isActive }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Reiniciar animaciones cuando cambia el slide
    useEffect(() => {
        if (isActive) {
            setIsVisible(false); // Resetear para iniciar animación
            const timer = setTimeout(() => {
                setIsVisible(true); // Activar animación después de 200ms
            }, 200);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false); // Ocultar al cambiar de slide
        }
    }, [isActive]);

    const getSlideClasses = () => {
        const baseClasses =
            "absolute inset-0 w-full h-full transition-opacity duration-[600ms] ease-in-out";
        return isActive ? `${baseClasses} opacity-100 z-20` : `${baseClasses} opacity-0 z-10`;
    };

    return (
        <div className={getSlideClasses()}>
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url(${typeof slide.image === "string" ? slide.image : slide.image.src})`,
                }}
            ></div>

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-8 lg:px-16">
                <div className="max-w-4xl mx-auto">
                    {/* Title */}
                    <h1
                        className={`text-blanco font-family-sans xl:text-[55px] font-light mb-[15px] xl:leading-[55px] transition-opacity duration-500 ${
                            isVisible ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        {slide.title}
                    </h1>

                    {/* Description */}
                    {slide.description && (
                        <p
                            className={`text-blanco font-family-sans font-light text-[1rem] mb-[35px]  leading-[1.5rem] transition-opacity duration-500 delay-600 ${
                                isVisible ? "opacity-95" : "opacity-0"
                            }`}
                        >
                            {slide.description}
                        </p>
                    )}

                    {/* CTA Button */}
                    {slide.cta && (
                        <a
                            href={slide.cta.href}
                            className={`inline-block bg-marron px-[20px] py-[14px] rounded-[3px] font-family-sans text-blanco uppercase font-normal text-[16px] leading-[21px] tracking-[1px] transition-all transition-opacity duration-500 delay-1000 hover:bg-[#353535] ${
                                isVisible ? "opacity-100" : "opacity-0"
                            }`}
                        >
                            {slide.cta.text}
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
