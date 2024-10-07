import { useEffect, useState } from "react";

interface ISpinWheelProps {
  segments: ISegments[];
  onFinished: (result: string) => void;
  primaryColor?: string;
  contrastColor?: string;
  buttonText?: string;
  isOnlyOnce?: boolean;
  size?: number;
  upDuration?: number;
  downDuration?: number;
  fontFamily?: string;
  arrowLocation?: "center" | "top";
  showTextOnSpin?: boolean;
  isSpinSound?: boolean;
}

interface ISegments {
  segmentText: string;
  segColor?: string;
}

const SpinWheel: React.FC<ISpinWheelProps> = ({
  segments,
  onFinished,
  primaryColor = "black",
  contrastColor = "white",
  //buttonText = "",
  isOnlyOnce = false,
  size = 45,
  upDuration = 100,
  downDuration = 600,
  fontFamily = "Arial",
  //arrowLocation = "center",
  showTextOnSpin = true,
  //isSpinSound = false,
}: ISpinWheelProps) => {
  // Separate arrays without nullish values
  const segmentTextArray = segments
    .map((segment) => segment.segmentText)
    .filter(Boolean);
  const segColorArray = segments
    .map((segment) => segment.segColor)
    .filter(Boolean);

  const [isFinished, setFinished] = useState<boolean>(false);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  
  const currentSegment = "";
  
  let timerHandle: any = 0; 
  const timerDelay = segmentTextArray.length;
  let angleCurrent = 0;
  let angleDelta = 0;
  
  let canvasContext: any = null;
  let maxSpeed = Math.PI / segmentTextArray.length;
  const upTime = segmentTextArray.length * upDuration;
  const downTime = segmentTextArray.length * downDuration;
  let spinStart = 0;
  
  let frames = 0;
  const centerX = size;
  const centerY = size;

  useEffect(() => {
    wheelInit();
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wheelInit = () => {
    initCanvas();
    wheelDraw();
  };

  const initCanvas = () => {
    let canvas: HTMLCanvasElement | null = document.getElementById(
      "canvas"
    ) as HTMLCanvasElement;

    if (!canvas) {
      // Create a new canvas if it doesn't exist
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", `${size * 2}`);
      canvas.setAttribute("height", `${size * 2}`);
      canvas.setAttribute("id", "canvas");
      document?.getElementById("wheel")?.appendChild(canvas);
    }
    canvasContext = canvas.getContext("2d");

    canvas.style.borderRadius = "50%"; // Set border radius for a circular shape

    canvas?.addEventListener("click", spin, false);
  };

  const spin = () => {
    setIsStarted(true);
    if (timerHandle === 0) {
      spinStart = new Date().getTime();
      maxSpeed = Math.PI * 3 / segmentTextArray.length;
      frames = 0;
      timerHandle = setInterval(onTimerTick, timerDelay * 5);
    }
  };

  const onTimerTick = () => {
    frames++;
    wheelDraw();
    const duration = new Date().getTime() - spinStart;
    let progress = 0;
    let finished = false;

    if (duration < upTime) {
      progress = duration / upTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      progress = duration / downTime;
      angleDelta = maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);
      if (progress >= 1) finished = true;
    }

    angleCurrent += angleDelta;
    while (angleCurrent >= Math.PI * 2) angleCurrent -= Math.PI * 2;
    if (finished) {
      setFinished(true);
      onFinished(currentSegment);
      clearInterval(timerHandle);
      timerHandle = 0;
      angleDelta = 0;
    }
  };

  const wheelDraw = () => {
    clear();
    drawWheel();
  };

  const drawSegment = (key: number, lastAngle: number, angle: number) => {
    const ctx = canvasContext;
    const value = segmentTextArray[key];
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false);
    ctx.lineTo(centerX, centerY);
    ctx.closePath();
    ctx.fillStyle = segColorArray[key];
    ctx.fill();
    ctx.stroke();
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);
    ctx.fillStyle = contrastColor;
    ctx.font = "bold 1em " + fontFamily;
    ctx.fillText(value.substring(0, 21), size / 2 + 20, 0);
    ctx.restore();
  };

  const drawWheel = () => {
    const ctx = canvasContext;
    let lastAngle = angleCurrent;
    const len = segmentTextArray.length;
    const PI2 = Math.PI * 2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = primaryColor;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em " + fontFamily;
    for (let i = 1; i <= len; i++) {
      const angle = PI2 * (i / len) + angleCurrent;
      drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 4;
    ctx.strokeStyle = primaryColor;
    ctx.stroke();
  };

  const clear = () => {
    const ctx = canvasContext;
    ctx.clearRect(0, 0, size, size);
  };

  return (
    <div id="wheel">
      <canvas
        id="canvas"
        width={size * 2}
        height={size * 2}
        style={{
          pointerEvents: isFinished && isOnlyOnce ? "none" : "auto",
        }}
      />
      {showTextOnSpin && isStarted && (
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            fontWeight: "bold",
            fontSize: "1.5em",
            fontFamily: fontFamily,
          }}
        >

        </div>
      )}
    </div>
  );
};

export default SpinWheel;
