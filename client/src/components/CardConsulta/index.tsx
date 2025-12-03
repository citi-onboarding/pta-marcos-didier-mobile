"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import alarm from "@/assets/alarm.svg";
import arrow_front from "@/assets/arrow_front.svg";

interface CardProps {
  id: number | string;
  date: string;
  time: string;
  type_appointment: string;
  doctorName: string;
}

export default function CardConsulta(props: CardProps) {
  const { id, date, time, type_appointment, doctorName } = props;
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/DetalheConsulta/${id}`)}
      role="button"
      tabIndex={0}
      className={`cursor-pointer w-full max-w-[510px] sm:max-w-[400px] xs:max-w-[320px] h-[82px] sm:h-[72px] xs:h-[64px] bg-[#F0F0F0] rounded-[16px] flex items-center gap-4 sm:gap-3 px-4`}
    >
      <div className="w-12 sm:w-10 xs:w-8 h-12 sm:h-10 xs:h-8 bg-[#FFFFFFCC] rounded-[4px] flex flex-col justify-center items-center">
        <div className="font-bold text-[14px] sm:text-[13px] xs:text-[12px]">
          {date}
        </div>
        <div className="font-bold text-[14px] sm:text-[13px] xs:text-[12px]">
          {time}
        </div>
      </div>

      <div className="flex-1">
        <span className="font-bold text-[14px] sm:text-[13px] xs:text-[12px]">
          {type_appointment}
        </span>
      </div>

      <div className="flex-1 text-[14px] sm:text-[13px] xs:text-[12px]">
        {doctorName}
      </div>

      <div>
        <Image
          src={arrow_front}
          alt="Arrow Front"
          className="w-4 h-4 sm:w-3 sm:h-3"
        />
      </div>
    </div>
  );
}
