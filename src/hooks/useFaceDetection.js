import { useState, useRef, useCallback, useEffect } from "react";
import {
  detectFaceInFrame,
  drawFaceDetectionOverlay,
} from "../services/interview/faceDetection";

export const useFaceDetection = (videoRef, isWebcamActive) => {
  const [isFaceInFrame, setIsFaceInFrame] = useState(true);
  const [faceWarning, setFaceWarning] = useState(false);
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);

  const detectFace = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas || video.videoWidth === 0 || !isWebcamActive) {
      animationFrameRef.current = requestAnimationFrame(detectFace);
      return;
    }

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

    animationFrameRef.current = requestAnimationFrame(detectFace);
  }, [videoRef, isWebcamActive]);

  useEffect(() => {
    if (isWebcamActive) {
      animationFrameRef.current = requestAnimationFrame(detectFace);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isWebcamActive, detectFace]);

  return {
    canvasRef,
    isFaceInFrame,
    faceWarning,
  };
};
