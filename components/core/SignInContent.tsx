"use client";
import { ArrowRight, Triangle } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { BsGoogle } from "react-icons/bs";
import { Button, buttonVariants } from "../ui/button";
import { Input } from "../ui/input";

const SignInContent = () => {
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
        className=" relative z-20 max-w-md p-5 bg-slate-50 dark:bg-slate-950 w-full shadow-lg rounded-2xl border border-border/10  flex-col flex items-center justify-center"
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
          Welcom Back in UVIBE
        </motion.div>
        <div className=" w-full">
          <div className=" mt-2">
            <div className=" font-Poppins text-sm opacity-75">
              <div className="flex items-center gap-2">
                <div>
                  <Triangle className=" fill-foreground" size={12} />
                </div>
                <div className=" mt-1">Email</div>
              </div>
            </div>
            <div>
              <Input
                placeholder="example@gmail.com"
                type="text"
                className=" mt-1"
              />
            </div>
          </div>

          <div className=" mt-2">
            <div className=" font-Poppins text-sm opacity-75">
              <div className="flex items-center gap-2">
                <div>
                  <Triangle className=" fill-foreground" size={12} />
                </div>
                <div className=" mt-1">Password</div>
              </div>
            </div>
            <div>
              <Input
                placeholder="•••••••••••••"
                type="password"
                className=" mt-1"
              />
            </div>
          </div>
        </div>

        <div className=" w-full mt-6">
          <div>
            <Button className=" w-full">
              <div className="flex items-center gap-2">
                <div>Sign in</div>
                <div>
                  <ArrowRight size={13} />
                </div>
              </div>
            </Button>
          </div>
          <div className=" mt-1">
            <Button variant={"secondary"} className=" w-full">
              <div className="flex items-center gap-2">
                <div>Sign in with Google</div>
                <div>
                  <BsGoogle size={13} />
                </div>
              </div>
            </Button>
          </div>

          <div className=" mt-2">
            <Link
              className={buttonVariants({
                variant: "link",
                size: "sm",
                className: " px-0",
              })}
              href={"/"}
            >
              Don&apos;t Have An Account ?
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignInContent;
