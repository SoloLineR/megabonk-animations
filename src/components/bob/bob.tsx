import styles from "./bob.module.css";
import { useRef, useEffect } from "react";

export const Bob = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const currPointRef = useRef({ x: 0, y: 0 });
  const targetPointRef = useRef({ x: 0, y: 0 });

  function lerp() {
    // Calculate final target position (5px away from cursor)
    const finalTargetX = targetPointRef.current.x - 5;
    const finalTargetY = targetPointRef.current.y - 5;

    // Use final target for calculations
    const finalDx = finalTargetX - currPointRef.current.x;
    const finalDy = finalTargetY - currPointRef.current.y;

    // Stop if image is close enough to final target (within 1 pixel)
    if (Math.abs(finalDx) < 1 && Math.abs(finalDy) < 1) {
      return;
    }
    const speed = 0.01;

    currPointRef.current.x += finalDx * speed;
    currPointRef.current.y += finalDy * speed;

    // console.log(`Current: ${currPointRef.current.x.toFixed(1)}, ${currPointRef.current.y.toFixed(1)} | Target: ${finalTargetX}, ${finalTargetY}`);

    if (imgRef.current) {
      imgRef.current.style.setProperty(
        "--x",
        currPointRef.current.x.toString()
      );
      imgRef.current.style.setProperty(
        "--y",
        currPointRef.current.y.toString()
      );
    }

    requestAnimationFrame(lerp);
  }

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      const { clientX, clientY } = event;

      // Constrain position within viewport bounds
      const maxX = window.innerWidth - 32; // 32px = half of 64px image width
      const maxY = window.innerHeight - 32; // 32px = half of 64px image height

      targetPointRef.current.x = Math.min(Math.max(clientX, 32), maxX);
      targetPointRef.current.y = Math.min(Math.max(clientY, 32), maxY);

      // Calculate final target position (5px away from cursor)
      const finalTargetX = targetPointRef.current.x - 5;
      const finalTargetY = targetPointRef.current.y - 5;

      // Restart lerp if it was stopped
      const finalDx = finalTargetX - currPointRef.current.x;
      const finalDy = finalTargetY - currPointRef.current.y;
      if (Math.abs(finalDx) >= 1 || Math.abs(finalDy) >= 1) {
        lerp();
      }
    };

    const handleResize = () => {
      // Update current position to be within new bounds
      const maxX = window.innerWidth - 32;
      const maxY = window.innerHeight - 32;
      currPointRef.current.x = Math.min(
        Math.max(currPointRef.current.x, 32),
        maxX
      );
      currPointRef.current.y = Math.min(
        Math.max(currPointRef.current.y, 32),
        maxY
      );
    };

    document.body.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", handleResize);
    lerp(); // Start the animation loop

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <img
      className={styles.bob}
      src="/assets/bob/ItemBobDead.png"
      width={64}
      height={64}
      ref={imgRef}
    />
  );
};
