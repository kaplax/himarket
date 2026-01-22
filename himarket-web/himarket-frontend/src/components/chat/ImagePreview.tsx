import { useEffect, useCallback, useState, useRef } from "react";
import { createPortal } from "react-dom";
import {
  CloseOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
} from "@ant-design/icons";

interface ImagePreviewProps {
  src: string;
  alt?: string;
  visible: boolean;
  onClose: () => void;
}

const MIN_SCALE = 0.5;
const MAX_SCALE = 5;
const SCALE_STEP = 0.25;

export function ImagePreview({
  src,
  alt,
  visible,
  onClose,
}: ImagePreviewProps) {
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const positionStart = useRef({ x: 0, y: 0 });

  // Reset state when opening
  useEffect(() => {
    if (visible) {
      setScale(1);
      setRotate(0);
      setPosition({ x: 0, y: 0 });
    }
  }, [visible]);

  // Handle keyboard events
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!visible) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "+":
        case "=":
          setScale(s => Math.min(s + SCALE_STEP, MAX_SCALE));
          break;
        case "-":
          setScale(s => Math.max(s - SCALE_STEP, MIN_SCALE));
          break;
        case "ArrowLeft":
          setRotate(r => r - 90);
          break;
        case "ArrowRight":
          setRotate(r => r + 90);
          break;
      }
    },
    [visible, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  // Handle wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -SCALE_STEP : SCALE_STEP;
    setScale(s => Math.max(MIN_SCALE, Math.min(MAX_SCALE, s + delta)));
  }, []);

  // Handle drag
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setIsDragging(true);
      dragStart.current = { x: e.clientX, y: e.clientY };
      positionStart.current = { ...position };
    },
    [position]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      setPosition({
        x: positionStart.current.x + dx,
        y: positionStart.current.y + dy,
      });
    },
    [isDragging]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Handle backdrop click
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  const zoomIn = () => setScale(s => Math.min(s + SCALE_STEP, MAX_SCALE));
  const zoomOut = () => setScale(s => Math.max(s - SCALE_STEP, MIN_SCALE));
  const rotateLeft = () => setRotate(r => r - 90);
  const rotateRight = () => setRotate(r => r + 90);
  const resetView = () => {
    setScale(1);
    setRotate(0);
    setPosition({ x: 0, y: 0 });
  };

  if (!visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 transition-opacity duration-200"
      onClick={handleBackdropClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 rounded-full px-4 py-2 z-10">
        <button
          onClick={zoomOut}
          className="p-2 text-white/80 hover:text-white transition-colors disabled:opacity-50"
          disabled={scale <= MIN_SCALE}
          title="Zoom Out (-)"
        >
          <ZoomOutOutlined className="text-lg" />
        </button>
        <span className="text-white/80 min-w-[60px] text-center text-sm">
          {Math.round(scale * 100)}%
        </span>
        <button
          onClick={zoomIn}
          className="p-2 text-white/80 hover:text-white transition-colors disabled:opacity-50"
          disabled={scale >= MAX_SCALE}
          title="Zoom In (+)"
        >
          <ZoomInOutlined className="text-lg" />
        </button>
        <div className="w-px h-4 bg-white/30 mx-1" />
        <button
          onClick={rotateLeft}
          className="p-2 text-white/80 hover:text-white transition-colors"
          title="Rotate Left (Arrow Left)"
        >
          <RotateLeftOutlined className="text-lg" />
        </button>
        <button
          onClick={rotateRight}
          className="p-2 text-white/80 hover:text-white transition-colors"
          title="Rotate Right (Arrow Right)"
        >
          <RotateRightOutlined className="text-lg" />
        </button>
        <div className="w-px h-4 bg-white/30 mx-1" />
        <button
          onClick={resetView}
          className="px-3 py-1 text-white/80 hover:text-white transition-colors text-sm"
          title="Reset View"
        >
          Reset
        </button>
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-black/50 rounded-full transition-colors z-10"
        title="Close (Esc)"
      >
        <CloseOutlined className="text-xl" />
      </button>

      {/* Image container */}
      <div
        className="relative select-none"
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        style={{
          cursor: isDragging ? "grabbing" : "grab",
        }}
      >
        <img
          src={src}
          alt={alt || "Preview"}
          className="max-w-[90vw] max-h-[85vh] object-contain pointer-events-none transition-transform duration-100"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotate}deg)`,
          }}
          draggable={false}
        />
      </div>
    </div>,
    document.body
  );
}

export default ImagePreview;
