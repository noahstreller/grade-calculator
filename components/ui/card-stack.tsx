"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

let interval: any;

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
};

export const Highlight = ({
  colorName = "emerald",
  children
}: {
  colorName?: "emerald" | "red" | "green" | "blue" | "yellow" | "purple" | "pink" | "orange" | "brown";
  children: React.ReactNode;
}) => {
  // safelist: 
  // emerald: bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 
  // basic colors
  // red: bg-red-100 text-red-700 dark:bg-red-700/[0.2] dark:text-red-500
  // green: bg-green-100 text-green-700 dark:bg-green-700/[0.2] dark:text-green-500
  // blue: bg-blue-100 text-blue-700 dark:bg-blue-700/[0.2] dark:text-blue-500
  // yellow: bg-yellow-100 text-yellow-700 dark:bg-yellow-700/[0.2] dark:text-yellow-500
  // purple: bg-purple-100 text-purple-700 dark:bg-purple-700/[0.2] dark:text-purple-500
  // pink: bg-pink-100 text-pink-700 dark:bg-pink-700/[0.2] dark:text-pink-500
  // orange: bg-orange-100 text-orange-700 dark:bg-orange-700/[0.2] dark:text-orange-500
  // brown: bg-brown-100 text-brown-700 dark:bg-brown-700/[0.2] dark:text-brown-500

  const className = `font-bold bg-${colorName}-100 text-${colorName}-700 dark:bg-${colorName}-700/[0.2] dark:text-${colorName}-500 px-1 py-0.5`;
  return (
    <span
      className={className}
    >
      {children}
    </span>
  );
};

export const CardStack = ({
  items,
  offset,
  scaleFactor,
}: {
  items: Card[];
  offset?: number;
  scaleFactor?: number;
}) => {
  const CARD_OFFSET = offset || 10;
  const SCALE_FACTOR = scaleFactor || 0.06;
  const [cards, setCards] = useState<Card[]>(items);

  useEffect(() => {
    startFlipping();

    return () => clearInterval(interval);
  }, []);

  const flip = () => {
    setCards((prevCards: Card[]) => {
      const newArray = [...prevCards]; // create a copy of the array
      newArray.unshift(newArray.pop()!); // move the last element to the front
      return newArray;
    });
  }

  const startFlipping = () => {
    interval = setInterval(() => {
      flip()
    }, 5000);
  };

  const skip = () => {
    flip();
    clearInterval(interval);
    startFlipping();
  };

  return (
    <div className="relative h-80 w-full 2xl:h-60 md:w-full select-none" onClick={skip}>
      {cards.map((card, index) => {
        return (
          <motion.div
            key={card.id}
            className="transition-colors absolute hover:bg-secondary bg-card h-80 w-full 2xl:h-60 md:w-full rounded-xl p-4 shadow-md border border-border flex flex-col justify-between"
            style={{
              transformOrigin: "top center",
            }}
            animate={{
              top: index * -CARD_OFFSET,
              scale: 1 - index * SCALE_FACTOR, // decrease scale for cards that are behind
              zIndex: cards.length - index, //  decrease z-index for the cards that are behind
            }}
          >
            <div className="font-normal text-foreground select-none">
              {card.content}
            </div>
            <div>
              <p className="text-neutral-500 font-medium dark:text-white">
                {card.name}
              </p>
              <p className="text-neutral-400 font-normal dark:text-neutral-200">
                {card.designation}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
