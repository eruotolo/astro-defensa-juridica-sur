import { useState, useEffect, useCallback, useRef } from "react";
import type { SlideData, SliderConfig, SliderState } from "../types/slider";

const defaultConfig: SliderConfig = {
    autoplay: true,
    autoplayInterval: 10000,
    infinite: true,
    transitionDuration: 600,
    pauseOnHover: true,
    enableKeyboard: true,
    enableTouch: true,
};

export const useVerticalSlider = (slides: SlideData[], config: Partial<SliderConfig> = {}) => {
    const fullConfig = { ...defaultConfig, ...config };
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    
    const [state, setState] = useState<SliderState>({
        currentSlide: 0,
        isAutoPlaying: fullConfig.autoplay,
        isTransitioning: false,
        direction: "down",
    });

    const totalSlides = slides.length;

    const goToSlide = useCallback((slideIndex: number, direction: "up" | "down" = "down") => {
        if (state.isTransitioning || slideIndex === state.currentSlide) return;

        setState(prev => ({
            ...prev,
            isTransitioning: true,
            direction,
        }));

        setTimeout(() => {
            setState(prev => ({
                ...prev,
                currentSlide: slideIndex,
                isTransitioning: false,
            }));
        }, fullConfig.transitionDuration);
    }, [state.isTransitioning, state.currentSlide, fullConfig.transitionDuration]);

    const nextSlide = useCallback(() => {
        if (totalSlides <= 1) return;
        
        const nextIndex = fullConfig.infinite 
            ? (state.currentSlide + 1) % totalSlides
            : Math.min(state.currentSlide + 1, totalSlides - 1);
        
        goToSlide(nextIndex, "down");
    }, [state.currentSlide, totalSlides, fullConfig.infinite, goToSlide]);

    const previousSlide = useCallback(() => {
        if (totalSlides <= 1) return;
        
        const prevIndex = fullConfig.infinite
            ? state.currentSlide === 0 ? totalSlides - 1 : state.currentSlide - 1
            : Math.max(state.currentSlide - 1, 0);
        
        goToSlide(prevIndex, "up");
    }, [state.currentSlide, totalSlides, fullConfig.infinite, goToSlide]);

    const pauseAutoplay = useCallback(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
        setState(prev => ({ ...prev, isAutoPlaying: false }));
    }, []);

    const resumeAutoplay = useCallback(() => {
        if (!fullConfig.autoplay) return;
        setState(prev => ({ ...prev, isAutoPlaying: true }));
    }, [fullConfig.autoplay]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!fullConfig.enableKeyboard) return;

        switch (event.key) {
            case "ArrowUp":
                event.preventDefault();
                previousSlide();
                break;
            case "ArrowDown":
                event.preventDefault();
                nextSlide();
                break;
            case " ": // Spacebar
                event.preventDefault();
                if (state.isAutoPlaying) {
                    pauseAutoplay();
                } else {
                    resumeAutoplay();
                }
                break;
        }
    }, [fullConfig.enableKeyboard, previousSlide, nextSlide, state.isAutoPlaying, pauseAutoplay, resumeAutoplay]);

    // Autoplay logic
    useEffect(() => {
        if (state.isAutoPlaying && fullConfig.autoplay && totalSlides > 1) {
            intervalRef.current = setInterval(nextSlide, fullConfig.autoplayInterval);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [state.isAutoPlaying, fullConfig.autoplay, fullConfig.autoplayInterval, nextSlide, totalSlides]);

    // Keyboard event listener
    useEffect(() => {
        if (fullConfig.enableKeyboard) {
            document.addEventListener("keydown", handleKeyDown);
            return () => document.removeEventListener("keydown", handleKeyDown);
        }
    }, [fullConfig.enableKeyboard, handleKeyDown]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, []);

    return {
        currentSlide: state.currentSlide,
        isAutoPlaying: state.isAutoPlaying,
        isTransitioning: state.isTransitioning,
        direction: state.direction,
        totalSlides,
        nextSlide,
        previousSlide,
        goToSlide,
        pauseAutoplay,
        resumeAutoplay,
        config: fullConfig,
    };
};