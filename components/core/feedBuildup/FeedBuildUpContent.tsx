"use client";
import { motion } from "motion/react";
import React from "react";

const FeedBuildUpContent = () => {
  return (
    <div className=" flex items-center justify-center flex-col h-svh w-full relative ">
      <img
        src="/background/image.png"
        className="  absolute top-0 left-0 w-full  h-full z-10"
      />
      <motion.div
        initial={{
          y: 40,
          opacity: 0,
          filter: "blur(10px)",
        }}
        animate={{
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          transition: {
            ease: [0.25, 1, 0.5, 1],
            duration: 1,
          },
        }}
        className=" relative  z-20 max-w-md p-5 bg-slate-50 dark:bg-slate-950 w-full shadow-lg rounded-2xl border border-border/10  flex-col flex items-center justify-center"
      >
        <motion.img
          initial={{
            rotate: "180deg",
            y: 20,
          }}
          animate={{
            rotate: 0,
            y: 0,
            transition: {
              ease: [0.25, 1, 0.5, 1],
              duration: 2,
            },
          }}
          className=" size-32 rounded-full  mix-blend-multiply"
          src="/brand/logos/logo.jpeg"
          alt=""
        />
        <motion.div
          initial={{
            y: 20,
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
              ease: [0.25, 1, 0.5, 1],
              duration: 1,
              delay: 0.3,
            },
          }}
          className=" text-2xl font-Poppins"
        >
          Let's Build Your Feed
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FeedBuildUpContent;
