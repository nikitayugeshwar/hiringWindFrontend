import * as faceapi from "face-api.js";

export class FaceDetector {
  constructor() {
    this.modelsLoaded = false;
    this.video = null;
    this.canvas = null;
  }

  async loadModels() {
    try {
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
        faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        faceapi.nets.faceExpressionNet.loadFromUri("/models"),
      ]);
      this.modelsLoaded = true;
      return true;
    } catch (error) {
      console.error("Error loading face detection models:", error);
      return false;
    }
  }

  async startDetection(videoElement, canvasElement, onFaceDetected) {
    this.video = videoElement;
    this.canvas = canvasElement;

    if (!this.modelsLoaded) {
      await this.loadModels();
    }

    this.detectFace(onFaceDetected);
  }

  async detectFace(onFaceDetected) {
    if (!this.video || !this.canvas) return;

    const detections = await faceapi
      .detectAllFaces(this.video, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();

    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set canvas dimensions
    this.canvas.width = this.video.videoWidth;
    this.canvas.height = this.video.videoHeight;

    // Draw detections
    faceapi.draw.drawDetections(this.canvas, detections);
    faceapi.draw.drawFaceLandmarks(this.canvas, detections);
    faceapi.draw.drawFaceExpressions(this.canvas, detections);

    // Check if face is detected
    const hasFace = detections.length > 0;
    let isCentered = false;

    if (hasFace) {
      const detection = detections[0];
      const box = detection.detection.box;

      // Calculate face center
      const faceCenterX = box.x + box.width / 2;
      const faceCenterY = box.y + box.height / 2;

      // Calculate frame center
      const frameCenterX = this.canvas.width / 2;
      const frameCenterY = this.canvas.height / 2;

      // Define thresholds (30% of frame size)
      const xThreshold = this.canvas.width * 0.3;
      const yThreshold = this.canvas.height * 0.3;

      isCentered =
        Math.abs(faceCenterX - frameCenterX) < xThreshold &&
        Math.abs(faceCenterY - frameCenterY) < yThreshold;
    }

    onFaceDetected(hasFace, isCentered);

    // Continue detection
    requestAnimationFrame(() => this.detectFace(onFaceDetected));
  }
}
