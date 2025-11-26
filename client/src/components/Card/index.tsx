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
            <div className = {`w-[495px] h-[135px] ${color} rounded-[16px] flex items-center gap-8`}>
                <div className = "w-[51px] h-[90px] bg-[#FFFFFFCC] rounded-[4px] ml-[24px] flex flex-col items-center justify-center">
                    <Image src={alarm} alt="Alarme" className="w-[20px] h-[20px] mb-1"></Image>
                    <div className = "font-bold text-[14px] mb-1">{date}</div>
                    <div className = "font-bold text-[14px]">{time}</div>
                </div>
                <div className = "w-[106px] h-[15px]">
                    <span className = "font-bold text-[14px]">{patientName} </span>
                    <span className = "text-[14px]">/ {ownerName}</span>
                </div>    

                <div className = "w-[106px] h-[12px] text-[14px]">{doctorName}</div>            
                <div className = {`w-[101px] h-[103px] rounded-[8px]  ${color} relative`}>
                    <Image src={animalIcon} alt="Animal" className="w-[69px] h-[70px] ml-[16px] object-cover"/>
                    <div className = "absolute bottom-0 left-0 w-[101px] h-[25px] rounded-[4px] bg-[#FFFFFFCC] flex items-center justify-center">
                        <div className = "text-black text-center truncate w-full text-[12px]">{type_appointment}</div>
                    </div>
                    </div> 
                </div>  
    );
}
