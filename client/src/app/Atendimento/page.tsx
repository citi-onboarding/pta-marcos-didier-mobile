"use client";
import NavBar from "@/components/Navbar";
import Card from "@/components/Card";
import Botao from "@/components/Botao";
import Image from "next/image";
import Arrow from "@/assets/arrow_back.svg";
import React from "react";
import { useForm } from "react-hook-form";
import cat from "@/assets/cat.svg";
import dog from "@/assets/dog.png";
import sheep from "@/assets/sheep.svg";
import horse from "@/assets/horse.svg";
import pig from "@/assets/pig.svg";
import cow from "@/assets/cow.svg";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import calendar_icon from "@/assets/calendar_month.svg";
import { useEffect } from "react";
import api from "@/services/api";

function getConsultationDate(date: string, time: string) {
  const [day, month] = date.split("/").map(Number); //recebe a data do formato dd/mm e transforma em numeros
  const [hour, minute] = time.split(":").map(Number); //recebe a hora do formato hh:mm e transforma em numeros

  const now = new Date(); //pega a data atual
  const year = now.getFullYear(); //pega o ano atual

  return new Date(year, month - 1, day, hour, minute); //retorna um objeto Date com a data e hora da consulta
} //mes -1 aq pq os meses em JS começam do 0

function isPastConsultation(date: string, time: string) {
  const consultaDate = getConsultationDate(date, time);
  const now = new Date();

  return consultaDate < now; //retorna true se a consulta ja passou
}

type Consultation = {
  id: string;
  type_appointment: string;
  patientName: string;
  ownerName: string;
  doctorName: string;
  date: string;
  time: string;
  animal?:
    | "Bode"
    | "Gato"
    | "Porco"
    | "Girafa"
    | "Cavalo"
    | "Cachorro"
    | string;
  animalIcon?: any;
  color?: string;
};

export default function Atendimento() {
  const [date, setDate] = React.useState<Date | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<
    "agendamento" | "historico"
  >("agendamento");

  const [loading, setLoading] = React.useState(false);
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);

  //COPILOT
  function normalizeString(str?: string) {
    if (!str) return "";
    return str
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  //COPILOT
  function getAnimalIcon(especie?: string) {
    const s = normalizeString(especie);
    if (!s) return cat; // gato eh o default
    if (s.includes("gato")) return cat;
    if (s.includes("cachorro")) return dog;
    if (s.includes("bode")) return sheep;
    if (s.includes("cavalo")) return horse;
    if (s.includes("porco")) return pig;
    if (s.includes("girafa")) return cow;
    return cat;
  }

  //CRIEI
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/consultation/cards"); //api.metodo("rota")

        const mapped = response.data.map((item: any, index: number) => ({
          // backend retorna: { data, hora, medico, tipo, paciente: { especie, nomeDoAnimal, nomeDono } }
          id: item.id,
          type_appointment: item.tipo, // corresponde a `tipo` no backend
          patientName: item.paciente.nomeDoAnimal,
          ownerName: item.paciente.nomeDono,
          doctorName: item.medico,
          date: item.data,
          time: item.hora,
          animal: item.paciente.especie,
          animalIcon: getAnimalIcon(item.paciente?.especie),
        }));

        console.log("consultation response:", response.data);
        setConsultations(mapped);
      } catch (error) {
        console.error("Erro ao buscar consultas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);

  type FormData = {
    doctor: string;
  };

  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    try {
      setLoading(true);

      const doctor = (data.doctor || "").trim();

      let response;

      if (!doctor) {
        // se vazio, volta a lista completa
        response = await api.get("/consultation/cards");
      } else {
        const encoded = encodeURIComponent(doctor);
        response = await api.get(`/consultation/drcards/${encoded}`);
      }

      const mapped = response.data.map((item: any, index: number) => ({
        // backend retorna: { data, hora, medico, tipo, paciente: { especie, nomeDoAnimal, nomeDono } }
        id: item.id,
        type_appointment: item.tipo, // corresponde a `tipo` no backend
        patientName: item.paciente.nomeDoAnimal,
        ownerName: item.paciente.nomeDono,
        doctorName: item.medico,
        date: item.data,
        time: item.hora,
        animal: item.paciente.especie,
        animalIcon: getAnimalIcon(item.paciente?.especie),
      }));

      setConsultations(mapped);
    } catch (error) {
      console.error("Erro ao buscar consultas por médico:", error);
    } finally {
      setLoading(false);
    }
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
                  onClick={() => handleSubmit(onSubmit)()}
                >
                  <span>Buscar</span>
                </button>
              </div>
            </div>
          </div>

          <div className="w-[1532px] h-[62px] mt-[40px] ml-[165px] bg-[#FFFFFF] flex">
            <div className="w-[243px] h-[62px] bg-[#F0F0F0] flex items-center justify-center rounded-[8px]">
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

          <div className="grid grid-cols-3 gap-x-4 gap-y-6 mt-2 mx-auto w-[1536px] h-[294px] ml-[165px] overflow-y-auto">
            {/* CRIEI */}
            {consultations
              .filter((card) =>
                selectedTab === "historico"
                  ? isPastConsultation(card.date, card.time)
                  : !isPastConsultation(card.date, card.time)
              )
              .map((card, idx) => (
                <div key={card.id ?? idx}>
                  <Card {...card} isHistorical={selectedTab === "historico"} />
                </div>
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
