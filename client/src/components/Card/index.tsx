"use client";
import React from "react";
import Image from "next/image";
import alarm from "@/assets/alarm.svg";

interface CardProps {
    color: string;
    patientName: string;
    ownerName: string;
    doctorName: string;
    animalIcon: string;
    time: string;
    date: string;
    type_appointment: string;
}

export default function Card(props: CardProps) {
    const { color, patientName, ownerName, doctorName, animalIcon, time, date, type_appointment} = props;

    return (
        <div className={`w-full max-w-[495px] h-auto min-h-[135px] ${color} rounded-[16px] flex flex-col sm:flex-row items-center gap-4 sm:gap-8 p-4 sm:p-6`}>
            <div className="w-[51px] h-[90px] bg-[#FFFFFFCC] rounded-[4px] flex flex-col items-center justify-center flex-shrink-0">
                <Image src={alarm} alt="Alarme" className="w-[20px] h-[20px] mb-1"></Image>
                <div className="font-bold text-[12px] sm:text-[14px] mb-1">{date}</div>
                <div className="font-bold text-[12px] sm:text-[14px]">{time}</div>
            </div>
            
            <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="mb-2 sm:mb-0">
                    <span className="font-bold text-[12px] sm:text-[14px]">{patientName} </span>
                    <span className="text-[12px] sm:text-[14px]">/ {ownerName}</span>
                </div>
                <div className="text-[12px] sm:text-[14px] text-center sm:text-left">{doctorName}</div>
            </div>

            <div className={`w-[101px] h-[103px] rounded-[8px] ${color} relative flex-shrink-0`}>
                <Image src={animalIcon} alt="Animal" className="w-[69px] h-[70px] ml-[16px] object-cover"/>
                <div className="absolute bottom-0 left-0 w-[101px] h-[25px] rounded-[4px] bg-[#FFFFFFCC] flex items-center justify-center">
                    <div className="text-black text-center truncate w-full text-[10px] sm:text-[12px] px-1">{type_appointment}</div>
                </div>
            </div> 
        </div>  
    );
}
