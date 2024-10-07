"use client";

// Icons
import { Info } from "lucide-react";
import { useRouter } from "next/navigation";

// React
import { useEffect, useRef, useState } from "react";

type StudentResidenceCardProps = {
  room: string;
  building: string;
};

const StudentResidenceCard = ({ room, building }: StudentResidenceCardProps) => {
  const router = useRouter();
  const divRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.9,
      }
    );

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
      }
    };
  }, []);

  return (
    <div
      className={`bg-[#FDBA74] w-[210px] flex flex-col gap-4 p-4 rounded-2xl ${
        isInView ? " opacity-100" : "opacity-50"
      }`}
      ref={divRef}
    >
      <div className="text-gray-700 flex flex-row justify-between items-center">
        <p>{room}</p>
        <Info onClick={() => router.push("/student/residences")} />
      </div>

      <p className=" text-3xl text-black font-semibold">{building}</p>
    </div>
  );
};

export default StudentResidenceCard;
