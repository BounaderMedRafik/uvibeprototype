"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { BodyTypes, headTypes, skinTones } from "@/frontdata";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, ChevronDown, Triangle } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const BuildingUpPageContent = () => {
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState("");
  const [wieght, setWieght] = useState("");
  const [hieght, setHieght] = useState("");
  const [faceType, setFaceType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [RelationStatus, setRelationStatus] = useState("");

  const [work, setWork] = useState("");
  const [skin, setSkin] = useState("");
  return (
    <div className=" flex items-center justify-center flex-col h-svh w-full relative ">
      <img
        src="/background/image.png"
        className="  absolute top-0 object-cover left-0 w-full  h-full z-10"
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
        className=" relative  z-20 max-w-md md:p-5 p-2 bg-slate-50 dark:bg-slate-950 w-full shadow-lg md:rounded-2xl border border-border/10  "
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
        {step == 0 ? (
          <>
            <div className=" font-Poppins text-xl font-semibold w-full">
              Basic Information
            </div>
            <div className=" font-Poppins mt-1 max-w-xs  w-full text-xs opacity-75  text-start ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              libero eum illo.
            </div>

            <div className=" mt-4">
              <div>
                <div className=" font-Poppins text-sm opacity-75">
                  <div className="flex items-center gap-2">
                    <div>
                      <Triangle className=" fill-foreground" size={12} />
                    </div>
                    <div className=" mt-1">Gender</div>
                  </div>
                </div>

                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className=" w-full">
                        <div className="flex items-center gap-3">
                          <div className=" text-sm opacity-75">
                            {gender ? gender : "Select Gender"}
                          </div>
                          <div>
                            <ChevronDown size={11} />
                          </div>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="  w-96">
                      <DropdownMenuRadioGroup
                        value={gender}
                        onValueChange={setGender}
                      >
                        <DropdownMenuRadioItem disabled value="Male">
                          <div className="flex items-center gap-2">
                            <div>
                              {gender == "Male" ? (
                                <Triangle
                                  className=" fill-foreground"
                                  size={10}
                                />
                              ) : null}
                            </div>
                            <div>Male (coming soon)</div>
                          </div>
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="Female">
                          <div className="flex items-center gap-2">
                            <div>
                              {gender == "Female" ? (
                                <Triangle
                                  className=" fill-foreground"
                                  size={10}
                                />
                              ) : null}
                            </div>
                            <div>Female</div>
                          </div>
                        </DropdownMenuRadioItem>
                      </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className=" mt-2 flex items-center gap-3">
              <div>
                <div className=" font-Poppins text-sm opacity-75">
                  <div className="flex items-center gap-2">
                    <div>
                      <Triangle className=" fill-foreground" size={12} />
                    </div>
                    <div className=" mt-1">Weight (kg)</div>
                  </div>
                </div>

                <div className=" mt-1">
                  <Input
                    type="number"
                    placeholder="52kg"
                    min={0}
                    value={wieght}
                    onChange={(e) => setWieght(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <div className=" font-Poppins text-sm opacity-75">
                  <div className="flex items-center gap-2">
                    <div>
                      <Triangle className=" fill-foreground" size={12} />
                    </div>
                    <div className=" mt-1">Height (cm)</div>
                  </div>
                </div>

                <div className=" mt-1">
                  <Input
                    type="number"
                    placeholder="175cm"
                    min={0}
                    value={hieght}
                    onChange={(e) => setHieght(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : step == 1 ? (
          <>
            <div className=" font-Poppins text-xl font-semibold w-full">
              Head Shape
            </div>
            <div className=" font-Poppins mt-1 max-w-xs  w-full text-xs opacity-75  text-start ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              libero eum illo.
            </div>

            <div className=" grid grid-cols-3 gap-3  mt-4 ">
              {headTypes.map((item, i) => (
                <div
                  onClick={() => {
                    setFaceType(item.head);
                  }}
                  key={i}
                  className={cn(
                    " border hover:opacity-75  transition-all ease-in-out  duration-300 cursor-pointer border-foreground/10 relative aspect-square overflow-hidden rounded-lg",
                    faceType == item.head && "border-accent/75"
                  )}
                >
                  <img
                    className="w-full h-full absolute top-0 left-0 z-10"
                    src={item.headPic}
                    alt={item.head}
                  />
                  <div
                    className={cn(
                      " absolute top-0 left-0 w-full h-full z-20 bg-accent opacity-0 transition-all  duration-300 ease-in-out",
                      faceType == item.head && "opacity-25"
                    )}
                  />

                  <div className=" absolute bottom-2 z-20 text-xs left-1/2 -translate-x-1/2 bg-accent text-background font-Poppins px-3 py-0.5 rounded-md">
                    {item.head}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : step == 2 ? (
          <>
            <div className=" font-Poppins text-xl font-semibold w-full">
              Body Shape
            </div>
            <div className=" font-Poppins mt-1 max-w-xs  w-full text-xs opacity-75  text-start ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              libero eum illo.
            </div>
            <div>
              <div className=" grid grid-cols-2 gap-3  mt-4 ">
                {BodyTypes.map((item, i) => (
                  <div
                    onClick={() => {
                      setBodyType(item.body);
                    }}
                    key={i}
                    className={cn(
                      " border hover:opacity-75  transition-all ease-in-out  duration-300 cursor-pointer border-foreground/10 relative aspect-square overflow-hidden rounded-lg",
                      bodyType == item.body && "border-accent/75"
                    )}
                  >
                    <img
                      className="w-full h-full absolute top-0 left-0 z-10"
                      src={item.bodyPic}
                      alt={item.body}
                    />
                    <div
                      className={cn(
                        " absolute top-0 left-0 w-full h-full z-20 bg-accent opacity-0 transition-all  duration-300 ease-in-out",
                        bodyType == item.body && "opacity-25"
                      )}
                    />

                    <div className=" absolute bottom-2 z-20 text-xs left-1/2 -translate-x-1/2 bg-accent text-background text-center font-Poppins px-3 py-0.5 rounded-md">
                      {item.body}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : step == 3 ? (
          <>
            <div className=" font-Poppins text-xl font-semibold w-full">
              Specified Questions
            </div>
            <div className=" font-Poppins mt-1 max-w-xs  w-full text-xs opacity-75  text-start ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              libero eum illo.
            </div>

            <div className=" mt-3">
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className=" w-full">
                      <div className="flex items-center gap-3">
                        <div className=" text-sm opacity-75">
                          {RelationStatus
                            ? RelationStatus
                            : "Select Relationship Status"}
                        </div>
                        <div>
                          <ChevronDown size={11} />
                        </div>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="  w-96">
                    <DropdownMenuRadioGroup
                      value={RelationStatus}
                      onValueChange={setRelationStatus}
                    >
                      <DropdownMenuRadioItem value="Single">
                        <div className="flex items-center gap-2">
                          <div>
                            {RelationStatus == "Single" ? (
                              <Triangle
                                className=" fill-foreground"
                                size={10}
                              />
                            ) : null}
                          </div>
                          <div>Single</div>
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Married">
                        <div className="flex items-center gap-2">
                          <div>
                            {RelationStatus == "Married" ? (
                              <Triangle
                                className=" fill-foreground"
                                size={10}
                              />
                            ) : null}
                          </div>
                          <div>Married</div>
                        </div>
                      </DropdownMenuRadioItem>
                      <DropdownMenuRadioItem value="Divorced">
                        <div className="flex items-center gap-2">
                          <div>
                            {RelationStatus == "Divorced" ? (
                              <Triangle
                                className=" fill-foreground"
                                size={10}
                              />
                            ) : null}
                          </div>
                          <div>Divorced</div>
                        </div>
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className=" mt-2">
                <div className=" font-Poppins text-sm opacity-75">
                  <div className="flex items-center gap-2">
                    <div>
                      <Triangle className=" fill-foreground" size={12} />
                    </div>
                    <div className=" mt-1">What do you do for work?</div>
                  </div>
                </div>

                <div className=" mt-1">
                  <Input
                    type="text"
                    placeholder="A Doctor"
                    min={0}
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : step == 4 ? (
          <>
            <div className=" font-Poppins text-xl font-semibold w-full">
              Skin Tone
            </div>
            <div className=" font-Poppins mt-1 max-w-xs  w-full text-xs opacity-75  text-start ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              libero eum illo.
            </div>

            <div className=" grid-cols-4 grid w-full mt-4">
              <div></div>
              <div className=" text-sm opacity-75 font-Poppins px-3 bg-foreground/10 m-1 rounded-sm pt-1">
                Cool
              </div>
              <div className=" text-sm opacity-75 font-Poppins px-3 bg-foreground/10 m-1 rounded-sm pt-1">
                Warm
              </div>
              <div className=" text-sm opacity-75 font-Poppins px-3 bg-foreground/10 m-1 rounded-b-none rounded-sm pt-1">
                Neutral
              </div>
            </div>
            <div>
              <div>
                {skinTones.map((item, i) => (
                  <div className=" grid grid-cols-4 w-full mt-1" key={i}>
                    <div className=" text-sm opacity-75 font-Poppins">
                      {item.skinTone}
                    </div>
                    {item.skinToneColors.map((SubItem, j) => (
                      <div
                        onClick={() => {
                          setSkin(SubItem);
                        }}
                        style={{
                          backgroundColor: SubItem,
                        }}
                        className={cn(
                          ` w-full transition-all cursor-pointer `,
                          skin == SubItem
                            ? " border-4 border-accent transition-all "
                            : null
                        )}
                        key={j}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : step == 5 ? (
          <>
            <div className=" font-Poppins text-xl font-semibold w-full">
              Thank you for your time!
            </div>
            <div className=" font-Poppins mt-1 max-w-xs  w-full text-xs opacity-75  text-start ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum
              libero eum illo.
            </div>

            <div className=" mt-3">
              <div className=" text-sm font-Poppins">
                <span>
                  <span className="font-semibold">• Gender</span> : {gender}
                </span>
              </div>
              <div className=" text-sm font-Poppins">
                <span>
                  <span className="font-semibold">• Height</span> : {hieght}cm
                </span>
              </div>
              <div className=" text-sm font-Poppins">
                <span>
                  <span className="font-semibold">• Weight</span> : {wieght}kg
                </span>
              </div>
              <div className=" text-sm font-Poppins">
                <span>
                  <span className="font-semibold">• Face Type</span> :{" "}
                  {faceType}
                </span>
              </div>
              <div className=" text-sm font-Poppins">
                <span>
                  <span className="font-semibold">• Body Type</span> :{" "}
                  {bodyType}
                </span>
              </div>
              <div className=" text-sm font-Poppins">
                <span>
                  <span className="font-semibold">• Relationship Status</span> :{" "}
                  {RelationStatus}
                </span>
              </div>
              <div className=" text-sm font-Poppins">
                <span>
                  <span className="font-semibold">• Work Nature</span> : {work}
                </span>
              </div>
            </div>
          </>
        ) : null}

        <div
          className={cn(
            " mt-4 flex items-center gap-0.5 w-full justify-between",
            step == 0 || step < 0 ? " justify-end" : null
          )}
        >
          {step == 0 || step < 0 ? null : (
            <Button
              onClick={() => {
                setStep(step - 1);
              }}
              className={buttonVariants({
                variant: "secondary",
                size: "sm",
              })}
            >
              <div className="flex items-center gap-2">
                <div>
                  <ArrowLeft size={10} />
                </div>
                <div>Previous</div>
              </div>
            </Button>
          )}
          {step == 5 ? (
            <>
              <Link
                href={"/feed-buildup"}
                onClick={() => {
                  console.log("yaaayyy");
                }}
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                })}
              >
                <div className="flex items-center gap-2">
                  <div>Submit</div>
                  <div>
                    <ArrowRight size={10} />
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setStep(step + 1);
                }}
                size={"sm"}
              >
                <div className="flex items-center gap-2">
                  <div>Next</div>
                  <div>
                    <ArrowRight size={10} />
                  </div>
                </div>
              </Button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default BuildingUpPageContent;
