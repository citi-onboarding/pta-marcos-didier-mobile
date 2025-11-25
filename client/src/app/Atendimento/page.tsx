"use client";
import NavBar from "@/components/Navbar";
import Card from "@/components/Card";
import Botao from "@/components/Botao";
import Image from "next/image";
import Arrow from "@/assets/arrow_back.svg";
import React from "react";
import { useForm } from "react-hook-form";
import cat from "@/assets/cat.svg";
import dog from "@/assets/dog.svg";
import sheep from "@/assets/sheep.svg";
import horse from "@/assets/horse.svg";
import pig from "@/assets/pig.svg";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import calendar_icon from "@/assets/calendar_month.svg";

export default function Atendimento() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<
    "agendamento" | "historico"
  >("agendamento");

  const cardsMock = [
    {
      type_appointment: "Retorno",
      patientName: "Sara",
      ownerName: "Vico Mac",
      doctorName: "Marcelo",
      date: "20/11",
      time: "11:00",
      animalIcon: cat,
      color: "bg-[#BFB5FF]",
    },
    {
      type_appointment: "Primeira consulta",
      patientName: "Rex",
      ownerName: "Ana Paula",
      doctorName: "João",
      date: "20/11",
      time: "12:30",
      animalIcon: dog,
      color: "bg-[#FF6419]",
    },
    {
      type_appointment: "Vacinacao",
      patientName: "Bela",
      ownerName: "Carlos",
      doctorName: "Mariana",
      date: "20/11",
      time: "14:00",
      animalIcon: sheep,
      color: "bg-[#9CFF95]",
    },
    {
      type_appointment: "Checkup",
      patientName: "Estrela",
      ownerName: "Luisa",
      doctorName: "Pedro",
      date: "20/11",
      time: "15:30",
      animalIcon: horse,
      color: "bg-[#AAE1FF]",
    },
    {
      type_appointment: "Historico",
      patientName: "Porquinho",
      ownerName: "Marco",
      doctorName: "Fernanda",
      date: "21/11",
      time: "09:00",
      animalIcon: pig,
      color: "bg-[#AAE1FF]",
    },

    {
      type_appointment: "Retorno",
      patientName: "Luna",
      ownerName: "Sofia",
      doctorName: "Ricardo",
      date: "21/11",
      time: "10:30",
      animalIcon: cat,
      color: "bg-[#BFB5FF]",
    },

    {
      type_appointment: "Vacinacao",
      patientName: "Max",
      ownerName: "Bruno",
      doctorName: "Camila",
      date: "21/11",
      time: "13:00",
      animalIcon: dog,
      color: "bg-[#9CFF95]",
    },
  ];

  type FormData = {
    doctor: string;
  };

  const { register, handleSubmit } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
    alert("Pesquisa enviada!");
  }

  return (
    <div className="flex flex-1 flex-col bg-[#FFFFFF] items-center h-screen overflow-hidden">
      <div className="w-[1920px] h-[1080px] flex flex-col overflow-hidden">
        <div className="w-full h-[114px]">
          <NavBar />
          <div className="h-px w-full bg-gray-200" role="separator" />
        </div>

        <div className="w-full">
          <div className="pt-[40px] w-full ml-[165px]">
            <div className="flex items-center mr-[100px]">
              <Image src={Arrow} alt="arrow back" />
              <p className="text-[48px] ml-[16px] font-bold">Atendimento</p>
            </div>
          </div>

          <div className="w-[660px] h-[100px] mt-[16px] bg-[#FFFFFF] ml-[165px]">
            <div className="w-[660px] h-[26px] text-[24px] text-color-[#000000]">
              <p>Qual é o médico?</p>
            </div>

            <div className="w-[660px] h-[50px] mt-[24px] items-center flex">
              <div className="w-[400px] h-[50px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input
                    type="text"
                    placeholder="Pesquise Aqui..."
                    {...register("doctor")}
                    className="w-[400px] h-[50px] pl-[16px] rounded-[8px] border border-black outline-none"
                  />
                </form>
              </div>
              <div className="w-[116px] h-[42px] ml-[24px] bg-[#7D1AD7] rounded-full ">
                <button
                  className="w-[116px] h-[42px] text-white font-semibold rounded-full transition-colors duration-200 ease-in-out transform
      hover:scale-105 active:scale-95 focus:outline-none "
                >
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-[1532px] h-[62px] mt-[40px] ml-[165px] bg-[#FFFFFF] flex">
            <div className="w-[243px] h-[62px] bg-[#F0F0F0] flex items-center justify-center">
              <button
                onClick={() => setSelectedTab("agendamento")}
                className={`w-[159px] h-[49px] rounded-[8px] ml-[8px] transition-colors duration-200 ease-in-out transform
      hover:scale-105 active:scale-95 focus:outline-none
               ${
                 selectedTab === "agendamento" ? "bg-[#FFFFFF]" : "bg-[#F0F0F0]"
               }`}
              >
                Agendamento
              </button>

              <button
                onClick={() => setSelectedTab("historico")}
                className={`w-[92px] h-[42px] mr-[8px] rounded-[8px] transition-colors duration-200 ease-in-out transform
      hover:scale-105 active:scale-95 focus:outline-none ${
        selectedTab === "historico" ? "bg-[#FFFFFF]" : "bg-[#F0F0F0]"
      }`}
              >
                Histórico
              </button>
            </div>

            <div className="ml-[1015px]">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-[126px] h-[56px] justify-between font-normal transition-colors duration-200 ease-in-out transform
      hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    {date
                      ? date.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "dd/mm/aa"}

                    <Image
                      src={calendar_icon}
                      alt="calendar icon"
                      className="w-[20px] h-[20px]"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="ml-[16px]">
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-[126px] h-[56px] justify-between font-normal transition-colors duration-200 ease-in-out transform
      hover:scale-105 active:scale-95 focus:outline-none"
                  >
                    {date
                      ? date.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "dd/mm/aa"}

                    <Image
                      src={calendar_icon}
                      alt="calendar icon"
                      className="w-[20px] h-[20px]"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setDate(date);
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-2 mx-auto w-[1536px] h-[294px] ml-[165px] overflow-y-auto">
            {cardsMock.map((card, idx) => (
              <Card
                key={idx}
                {...card}
                color={
                  selectedTab === "historico" ? "bg-[#F0F0F0]" : card.color
                }
              />
            ))}

            <div />
          </div>

          <div className="w-[205px] h-[48px] ml-[1525px] mt-[60px]">
            <Botao
              text="Nova Consulta"
              color="#50E678"
              image_src="/Vector.svg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
