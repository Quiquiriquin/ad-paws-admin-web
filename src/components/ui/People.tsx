import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Update paths to ensure they're correctly pointing to your public folder
const images = [
  "/cool-guy.svg",
  "/curly-girl.svg",
  "/guy-2.svg",
  "/point-girl.svg",
  "/curly-girl-2.svg",
];

export default function AnimatedImages() {
  const [index, setIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>(
    Array(images.length).fill(false)
  );
  const [hasError, setHasError] = useState(false);

  // Preload images to avoid rendering issues
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const promises = images.map((src, i) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
              setImagesLoaded((prev) => {
                const newState = [...prev];
                newState[i] = true;
                return newState;
              });
              resolve();
            };
            img.onerror = () => {
              console.error(`Failed to load image: ${src}`);
              setHasError(true);
              resolve();
            };
          });
        });

        await Promise.all(promises);
      } catch (error) {
        console.error("Error preloading images:", error);
        setHasError(true);
      }
    };

    preloadImages();
  }, []);

  //   useEffect(() => {
  //     // Only start the interval if images are loaded
  //     if (imagesLoaded.some((loaded) => loaded)) {
  //       const interval = setInterval(() => {
  //         setIndex((prev) => {
  //           // Find the next loaded image
  //           let nextIndex = (prev + 1) % images.length;
  //           let attempts = 0;

  //           while (!imagesLoaded[nextIndex] && attempts < images.length) {
  //             nextIndex = (nextIndex + 1) % images.length;
  //             attempts++;
  //           }

  //           return nextIndex;
  //         });
  //       }, 2500); // cambia cada 2.5s

  //       return () => clearInterval(interval);
  //     }
  //   }, [imagesLoaded]);

  // Show loading state if no images are loaded yet
  if (!imagesLoaded.some((loaded) => loaded) && !hasError) {
    return (
      <div className="relative w-40 h-40 overflow-hidden bg-gray-200 rounded-full animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          Loading...
        </div>
      </div>
    );
  }

  // Show error state if there was an error loading images
  if (hasError && !imagesLoaded.some((loaded) => loaded)) {
    return (
      <div className="relative w-40 h-40 overflow-hidden bg-red-100 rounded-full">
        <div className="absolute inset-0 flex items-center justify-center text-red-500">
          Failed to load images
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-[200px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.img
          key={images[index]}
          src={images[index]}
          className="absolute w-full h-full rounded-full object-cover"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.6 }}
          alt={`Animated image ${index + 1}`}
        />
      </AnimatePresence>
    </div>
  );
}
