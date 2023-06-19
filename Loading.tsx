import React, { useState, useEffect } from 'react';
import { Progress } from 'antd';
import 'antd/dist/antd.css';
import './LoadingProgressBar.css';

function LoadingProgressBar() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let currentPercent = 0;

    const animate = () => {
      currentPercent += 1;
      setPercent(prevPercent => {
        const newPercent = currentPercent > 100 ? 100 : currentPercent;
        return newPercent;
      });

      if (currentPercent <= 100) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="loading-progress-bar">
      <Progress type="line" percent={percent} strokeWidth={4} strokeLinecap="square" />
    </div>
  );
}

export default LoadingProgressBar;
