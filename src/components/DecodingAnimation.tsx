
import { useState, useEffect } from "react";

interface DecodingAnimationProps {
  text: string;
  className?: string;
  delay?: number;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*![]{}()<>?/\\|~`+=_-.:;,";

export function DecodingAnimation({ text, className = "", delay = 0 }: DecodingAnimationProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isDecoding, setIsDecoding] = useState(false);

  useEffect(() => {
    const startDecoding = () => {
      setIsDecoding(true);
      const originalText = text;
      let iterations = 0;
      
      // For longer text, adjust iterations to make animation still feel snappy
      const maxIterations = Math.min(originalText.length + 3, 50);
      const iterationStep = originalText.length > 50 ? Math.floor(originalText.length / 50) : 1;

      const interval = setInterval(() => {
        const progress = iterations / maxIterations;

        const newText = originalText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            
            // Add some chaos at the beginning
            if (iterations < 2) {
              return characters[Math.floor(Math.random() * characters.length)];
            }
            
            // Progressive decoding with occasional glitches
            // For long text, we decode in chunks based on iteration steps
            if (index < iterations * iterationStep - 2) {
              // Rare random glitch on already decoded characters
              return Math.random() < 0.05 ? 
                characters[Math.floor(Math.random() * characters.length)] : 
                originalText[index];
            }
            
            // Current decoding position gets special treatment
            if (index >= iterations * iterationStep - 2 && index <= iterations * iterationStep) {
              return Math.random() < 0.7 ? 
                originalText[index] : 
                characters[Math.floor(Math.random() * characters.length)];
            }
            
            // Future characters are random
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("");

        setDisplayText(newText);
        iterations += 1;

        // Stop when we've decoded all characters
        if (iterations > maxIterations) {
          clearInterval(interval);
          setDisplayText(originalText);
          setIsDecoding(false);
        }
      }, 50); // Slightly faster for longer text

    };

    const timer = setTimeout(() => {
      startDecoding();
    }, delay);

    // Repeat animation less frequently for long text to avoid performance issues
    const repeatTimer = setInterval(() => {
      if (text.length > 500) return; // Skip repeat animation for very long text
      startDecoding();
    }, Math.max(8000, text.length * 10));

    return () => {
      clearTimeout(timer);
      clearInterval(repeatTimer);
    };
  }, [text, delay]);

  return (
    <span 
      className={`${className} font-mono tracking-wider transition-all duration-200 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent`}
      style={{
        textShadow: '0 0 20px rgba(139, 92, 246, 0.3)',
        filter: 'drop-shadow(0 0 10px rgba(139, 92, 246, 0.2))'
      }}
    >
      {displayText}
    </span>
  );
}
