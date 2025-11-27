"use client";
import React from "react";
import Image from "next/image";
import alarm from "@/assets/alarm.svg";
import arrow_front from "@/assets/arrow_front.svg";

interface CardProps {
  data: string;
  time: string;
  type_appointment: string;
  doctorName: string;
}

export default function CardConsulta(props: CardProps) {
  const { data, time, type_appointment, doctorName } = props;

  return (
    <div
      className={`w-[510px] h-[82px] bg-[#F0F0F0] rounded-[16px] flex items-center gap-12`}
    >
      <div className="w-[51px] h-[50px] bg-[#FFFFFFCC] rounded-[4px] ml-[24px]">
        <div className="w-[39px] h-[15px] font-bold ml-[6px] mt-[2px] text-[14px]">
          {data}
        </div>
        <div className="w-[39px] h-[15px] font-bold ml-[7px] mt-[8px] text-[14px]">
          {time}
        </div>
      </div>
      <div className="w-[106px] h-[15px] -mt-[10px]">
        <span className="font-bold text-[14px]">{type_appointment} </span>
      </div>

      <div className="w-[106px] h-[12px] text-[14px] -mt-[10px]">
        {doctorName}
      </div>
      <div>
        <Image
          src={arrow_front}
          alt="Arrow Front"
          className="w-[16px] h-[16px] ml-[30px]"
        />
      </div>
    </div>
  );
}
