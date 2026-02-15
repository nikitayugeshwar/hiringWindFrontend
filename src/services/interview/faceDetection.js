export const detectFaceInFrame = (video, canvas) => {
  if (!video || !canvas || video.videoWidth === 0) {
    return { isFaceDetected: false, faceCoverage: 0 };
  }

  const ctx = canvas.getContext("2d");

  // Set canvas dimensions to match video
  const displayWidth = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;

  if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }

  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw video frame to canvas (scaled to fit)
  const videoAspectRatio = video.videoWidth / video.videoHeight;
  const canvasAspectRatio = canvas.width / canvas.height;

  let drawWidth, drawHeight, offsetX, offsetY;

  if (videoAspectRatio > canvasAspectRatio) {
    // Video is wider than canvas
    drawHeight = canvas.height;
    drawWidth = video.videoWidth * (drawHeight / video.videoHeight);
    offsetX = -(drawWidth - canvas.width) / 2;
    offsetY = 0;
  } else {
    // Video is taller than canvas
    drawWidth = canvas.width;
    drawHeight = video.videoHeight * (drawWidth / video.videoWidth);
    offsetX = 0;
    offsetY = -(drawHeight - canvas.height) / 2;
  }

  ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight);

  // Get image data from the center region for face detection
  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;
  const sampleSize = 100;

  const imageData = ctx.getImageData(
    centerX - sampleSize / 2,
    centerY - sampleSize / 2,
    sampleSize,
    sampleSize,
  );
  const data = imageData.data;

  // Simple face detection based on skin tone detection
  let facePixels = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Simple skin tone detection (adjust thresholds as needed)
    if (
      r > 100 &&
      g > 40 &&
      b > 20 &&
      r > g &&
      r > b &&
      Math.abs(r - g) > 20 &&
      r - Math.min(g, b) > 20
    ) {
      facePixels++;
    }
  }

  // Calculate face coverage percentage in the sampled region
  const samplePixels = sampleSize * sampleSize;
  const faceCoverage = (facePixels / samplePixels) * 100;

  // Check if face is detected
  const isFaceDetected = faceCoverage > 10;

  return {
    isFaceDetected,
    faceCoverage,
    ctx,
    centerX,
    centerY,
    sampleSize,
  };
};

export const drawFaceDetectionOverlay = (
  ctx,
  centerX,
  centerY,
  sampleSize,
  isFaceDetected,
) => {
  if (isFaceDetected) {
    // Draw face bounding box (simulated)
    ctx.strokeStyle = "#00ff00";
    ctx.lineWidth = 3;
    ctx.strokeRect(centerX - 100, centerY - 100, 200, 200);

    // Draw center dot
    ctx.fillStyle = "#00ff00";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Draw warning box
    ctx.strokeStyle = "#ff0000";
    ctx.lineWidth = 3;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(centerX - 100, centerY - 100, 200, 200);
    ctx.setLineDash([]);

    // Draw center dot
    ctx.fillStyle = "#ff0000";
    ctx.beginPath();
    ctx.arc(centerX, centerY, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw warning text
    ctx.fillStyle = "#ff0000";
    ctx.font = "bold 16px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FACE NOT DETECTED", centerX, centerY - 120);
  }
};
