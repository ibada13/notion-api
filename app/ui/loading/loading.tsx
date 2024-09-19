'use client';

import { useEffect, useState } from "react";
import Head from "next/head";
export default function Loading() {
  let dots: string = ".....";
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const animation = () => {
      let acc = 0;
      const intervalId = setInterval(() => {
        setActiveIndex(acc); 
        acc = (acc + 1) % dots.length; 
      }, 500); 

      return () => clearInterval(intervalId); 
    };

    animation();
  }, [dots]);

  return (
    <>
      <Head>
        <title>
          Loading
        </title>
      </Head>
    <div className="h-full w-full flex justify-center items-center">
      <p className="text-6xl uppercase ">loading</p>
      {dots.split("").map((e, i) => {
        return (
          <p
            className={`text-6xl inline text-red-500 ${
              i === activeIndex ? "opacity-100" : "opacity-20"
            }`} 
            key={`d-${i}`}
            id={`d-${i}`}
          >
            {e}
          </p>
        );
      })}
    </div>
      </>
  );
}
