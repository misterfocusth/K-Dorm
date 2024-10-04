"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Dot } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

type OnBoardingPageProps = {
  config: {
    id: number;
    title: string;
    description: string;
    imageSrc: string;
  }[];
};

const OnBoardingPage = ({ config }: OnBoardingPageProps) => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<number>(0);

  return (
    <div className="h-full flex flex-col justify-center items-center gap-10 pt-40 pb-6">
      <Image src={config[currentStep].imageSrc} width={200} height={200} alt="OnBoarding Image" />

      <div className="text-center flex flex-col gap-5">
        <p className="text-xl font-semibold">{config[currentStep].title}</p>

        <p>{config[currentStep].description}</p>
      </div>

      <div className="flex justify-between items-center w-full mt-auto">
        {currentStep > 0 ? (
          <Button
            variant="link"
            className="flex-1 text-xl text-[#9E9E9E] p-0 flex justify-start"
            onClick={() => setCurrentStep((prev) => prev - 1)}
          >
            <ChevronLeft /> กลับ
          </Button>
        ) : (
          <Button
            variant="link"
            className="flex-1 text-xl text-[#9E9E9E] p-0 flex justify-start   "
            onClick={() => router.push("/student/login")}
          >
            ข้าม
          </Button>
        )}

        <div className="flex-1 text-center flex items-center">
          {new Array(config.length).fill(0).map((_, index) => {
            return index === currentStep ? (
              <Dot className="text-primary w-8 h-8" />
            ) : (
              <Dot className="opacity-50" />
            );
          })}
        </div>

        {currentStep + 1 === config.length ? (
          <Button
            variant="link"
            onClick={() => router.push("/student/login")}
            className="flex-1 text-black text-xl flex items-center gap-1 p-0 justify-end"
          >
            เข้าสู่ระบบ
          </Button>
        ) : (
          <Button
            variant="link"
            onClick={() => setCurrentStep((prev) => prev + 1)}
            className="flex-1 text-black text-xl flex items-center gap-1 p-0 justify-end"
          >
            ถัดไป <ChevronRight />
          </Button>
        )}
      </div>
    </div>
  );
};

export default OnBoardingPage;
