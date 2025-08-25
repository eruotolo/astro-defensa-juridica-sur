export interface SlideData {
    id: number;
    title: string;
    description: string;
    image: string | ImageMetadata;
    cta: {
        text: string;
        href: string;
    };
}

// Type for Astro ImageMetadata
interface ImageMetadata {
    src: string;
    width: number;
    height: number;
    format: string;
}

export interface SliderConfig {
    autoplay: boolean;
    autoplayInterval: number;
    infinite: boolean;
    transitionDuration: number;
    pauseOnHover: boolean;
    enableKeyboard: boolean;
    enableTouch: boolean;
}

export interface SliderState {
    currentSlide: number;
    isAutoPlaying: boolean;
    isTransitioning: boolean;
    direction: "up" | "down";
}

export interface TouchState {
    startY: number;
    currentY: number;
    isDragging: boolean;
    threshold: number;
}

export interface SliderProps {
    slides?: SlideData[];
    config?: Partial<SliderConfig>;
    className?: string;
}

export interface SliderControlsProps {
    currentSlide: number;
    totalSlides: number;
    onPrevious: () => void;
    onNext: () => void;
    onSlideSelect: (index: number) => void;
    showArrows?: boolean;
    showDots?: boolean;
}

export interface SliderSlideProps {
    slide: SlideData;
    isActive: boolean;
}