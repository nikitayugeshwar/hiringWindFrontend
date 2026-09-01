import { useState, useRef, useEffect } from "react";
import {
  detectFaceInFrame,
  drawFaceDetectionOverlay,
} from "../services/interview/faceDetection";

export const useFaceDetection = (videoRef, isWebcamActive) => {
  const [isFaceInFrame, setIsFaceInFrame] = useState(true);
  const [faceWarning, setFaceWarning] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    if (!isWebcamActive) return;

    // The loop lives inside the effect so each frame schedules the same
    // function without the callback having to reference itself.
    const detectFace = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      if (video && canvas && video.videoWidth > 0) {
        const result = detectFaceInFrame(video, canvas);

        setIsFaceInFrame(result.isFaceDetected);
        setFaceWarning(!result.isFaceDetected);

        if (result.ctx) {
          drawFaceDetectionOverlay(
            result.ctx,
            result.centerX,
            result.centerY,
            result.sampleSize,
            result.isFaceDetected,
          );
        }
      }

      animationFrameRef.current = requestAnimationFrame(detectFace);
    };

    animationFrameRef.current = requestAnimationFrame(detectFace);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isWebcamActive, videoRef]);

  return {
    canvasRef,
    isFaceInFrame,
    faceWarning,
  };
};
