import { useState, useCallback, useRef, useEffect } from "react";
import type { TouchState } from "../types/slider";

interface UseTouchOptions {
    onSwipeUp: () => void;
    onSwipeDown: () => void;
    threshold?: number;
    enabled?: boolean;
}

export const useTouch = ({ 
    onSwipeUp, 
    onSwipeDown, 
    threshold = 50, 
    enabled = true 
}: UseTouchOptions) => {
    const [touchState, setTouchState] = useState<TouchState>({
        startY: 0,
        currentY: 0,
        isDragging: false,
        threshold,
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const handleTouchStart = useCallback((event: TouchEvent) => {
        if (!enabled) return;
        
        const touch = event.touches[0];
        setTouchState(prev => ({
            ...prev,
            startY: touch.clientY,
            currentY: touch.clientY,
            isDragging: true,
        }));
    }, [enabled]);

    const handleTouchMove = useCallback((event: TouchEvent) => {
        if (!enabled || !touchState.isDragging) return;
        
        const touch = event.touches[0];
        setTouchState(prev => ({
            ...prev,
            currentY: touch.clientY,
        }));

        // Prevent default scrolling while dragging
        event.preventDefault();
    }, [enabled, touchState.isDragging]);

    const handleTouchEnd = useCallback(() => {
        if (!enabled || !touchState.isDragging) return;

        const deltaY = touchState.startY - touchState.currentY;
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaY >= threshold) {
            if (deltaY > 0) {
                // Swiped up - show next slide
                onSwipeUp();
            } else {
                // Swiped down - show previous slide
                onSwipeDown();
            }
        }

        setTouchState(prev => ({
            ...prev,
            isDragging: false,
            startY: 0,
            currentY: 0,
        }));
    }, [enabled, touchState.isDragging, touchState.startY, touchState.currentY, threshold, onSwipeUp, onSwipeDown]);

    const handleMouseDown = useCallback((event: MouseEvent) => {
        if (!enabled) return;
        
        setTouchState(prev => ({
            ...prev,
            startY: event.clientY,
            currentY: event.clientY,
            isDragging: true,
        }));
    }, [enabled]);

    const handleMouseMove = useCallback((event: MouseEvent) => {
        if (!enabled || !touchState.isDragging) return;
        
        setTouchState(prev => ({
            ...prev,
            currentY: event.clientY,
        }));

        event.preventDefault();
    }, [enabled, touchState.isDragging]);

    const handleMouseUp = useCallback(() => {
        if (!enabled || !touchState.isDragging) return;

        const deltaY = touchState.startY - touchState.currentY;
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaY >= threshold) {
            if (deltaY > 0) {
                onSwipeUp();
            } else {
                onSwipeDown();
            }
        }

        setTouchState(prev => ({
            ...prev,
            isDragging: false,
            startY: 0,
            currentY: 0,
        }));
    }, [enabled, touchState.isDragging, touchState.startY, touchState.currentY, threshold, onSwipeUp, onSwipeDown]);

    // Add event listeners
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !enabled) return;

        // Touch events
        container.addEventListener("touchstart", handleTouchStart, { passive: false });
        container.addEventListener("touchmove", handleTouchMove, { passive: false });
        container.addEventListener("touchend", handleTouchEnd);

        // Mouse events (for desktop testing)
        container.addEventListener("mousedown", handleMouseDown);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);

        return () => {
            container.removeEventListener("touchstart", handleTouchStart);
            container.removeEventListener("touchmove", handleTouchMove);
            container.removeEventListener("touchend", handleTouchEnd);
            container.removeEventListener("mousedown", handleMouseDown);
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };
    }, [enabled, handleTouchStart, handleTouchMove, handleTouchEnd, handleMouseDown, handleMouseMove, handleMouseUp]);

    return {
        containerRef,
        isDragging: touchState.isDragging,
        deltaY: touchState.isDragging ? touchState.startY - touchState.currentY : 0,
    };
};