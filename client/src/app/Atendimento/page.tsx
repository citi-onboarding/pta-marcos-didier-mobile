"use client";
import NavBar from "@/components/Navbar";
import Card from "@/components/Card";
import Botao from "@/components/Botao";
import Image from "next/image";
import Arrow from "@/assets/arrow_back.svg";
import React, { useEffect } from "react";
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
import api from "@/services/api";
import { useRouter } from "next/navigation";

function getConsultationDate(date: string, time: string) {
  const [day, month] = date.split("/").map(Number); // dd/mm
  const [hour, minute] = time.split(":").map(Number); // hh:mm
  const now = new Date();
  const year = now.getFullYear();
  return new Date(year, month - 1, day, hour, minute); // mês em JS começa no 0
}

function isPastConsultation(date: string, time: string) {
  const consultaDate = getConsultationDate(date, time);
  const now = new Date();
  return consultaDate < now;
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
  const router = useRouter();

  const [startDate, setStartDate] = React.useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = React.useState<Date | undefined>(undefined);
  const [openStart, setOpenStart] = React.useState(false);
  const [openEnd, setOpenEnd] = React.useState(false);
  const [selectedTab, setSelectedTab] = React.useState<
    "agendamento" | "historico"
  >("agendamento");

  const [loading, setLoading] = React.useState(false);
  const [consultations, setConsultations] = React.useState<Consultation[]>([]);

  // normaliza acentos / espaços
  function normalizeString(str?: string) {
    if (!str) return "";
    return str
      .toString()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "");
  }

  function getAnimalIcon(especie?: string) {
    const s = normalizeString(especie);
    if (!s) return cat; // default
    if (s.includes("gato")) return cat;
    if (s.includes("cachorro")) return dog;
    if (s.includes("bode")) return sheep;
    if (s.includes("cavalo")) return horse;
    if (s.includes("porco")) return pig;
    if (s.includes("girafa")) return cow; // placeholder
    return cat;
  }

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        const response = await api.get("/consultation/cards");
        const mapped = response.data.map((item: any) => ({
          id: item.id,
          type_appointment: item.tipo,
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
        response = await api.get("/consultation/cards");
        console.log(response);
      } else {
        const encoded = encodeURIComponent(doctor);
        response = await api.get(`/consultation/drcards/${encoded}`);
      }
      const mapped = response.data.map((item: any) => ({
        id: item.id,
        type_appointment: item.tipo,
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
    <div className="flex flex-1 flex-col bg-[#FFFFFF] min-h-screen overflow-x-hidden">
      <div className="w-full flex flex-col">
        <div className="w-full">
          <NavBar />
          <div className="h-px w-full bg-gray-200" role="separator" />
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-[165px] flex flex-col h-full">
          <div className="pt-[40px] w-full">
            <div className="flex items-center">
              <div
                className="w-6 h-6 sm:w-8 sm:h-8 cursor-pointer"
                onClick={() => router.back()}
              >
                <Image src={Arrow} alt="arrow back" className="w-full h-full" />
              </div>
              <p className="text-2xl sm:text-3xl lg:text-[48px] ml-4 font-bold">
                Atendimento
              </p>
            </div>
          </div>

          <div className="w-full max-w-2xl mt-4 lg:mt-6">
            <div className="w-full">
              <p className="text-lg sm:text-xl lg:text-[24px] font-medium">
                Qual é o médico?
              </p>
            </div>

            <div className="w-full mt-6 items-center flex flex-col sm:flex-row gap-4">
              <div className="w-full sm:max-w-md">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full">
                  <input
                    type="text"
                    placeholder="Pesquise Aqui..."
                    {...register("doctor")}
                    className="w-full h-12 sm:h-[50px] pl-4 rounded-lg border border-gray-400 outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base"
                  />
                </form>
              </div>
              <div className="w-full sm:w-auto">
                <button
                  onClick={() => handleSubmit(onSubmit)()}
                  className="w-full sm:w-[116px] h-10 sm:h-[42px] bg-[#7D1AD7] text-white font-semibold rounded-full transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>

          <div className="w-full mt-8 lg:mt-[40px] bg-[#FFFFFF] flex flex-col lg:flex-row lg:justify-between">
            <div className="w-full lg:w-auto bg-[#F0F0F0] rounded-lg p-2 flex">
              <button
                onClick={() => setSelectedTab("agendamento")}
                className={`flex-1 lg:w-[159px] h-12 lg:h-[49px] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base font-medium ${
                  selectedTab === "agendamento"
                    ? "bg-[#FFFFFF] shadow-sm"
                    : "bg-[#F0F0F0]"
                }`}
              >
                Agendamento
              </button>

              <button
                onClick={() => setSelectedTab("historico")}
                className={`flex-1 lg:w-[92px] h-12 lg:h-[42px] rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base font-medium flex items-center justify-center ${
                  selectedTab === "historico"
                    ? "bg-[#FFFFFF] shadow-sm"
                    : "bg-[#F0F0F0]"
                }`}
              >
                Histórico
              </button>
            </div>

            <div className="flex gap-4 mt-4 lg:mt-0">
              <Popover open={openStart} onOpenChange={setOpenStart}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="flex-1 lg:w-[126px] h-12 lg:h-[56px] justify-center font-normal transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base"
                  >
                    {startDate
                      ? startDate.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "dd/mm/aa"}
                    <Image
                      src={calendar_icon}
                      alt="calendar icon"
                      className="w-5 h-5 ml-2"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={startDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setStartDate(date);
                      setOpenStart(false);
                    }}
                  />
                </PopoverContent>
              </Popover>

              <Popover open={openEnd} onOpenChange={setOpenEnd}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-end"
                    className="flex-1 lg:w-[126px] h-12 lg:h-[56px] justify-center font-normal transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none text-sm sm:text-base"
                  >
                    {endDate
                      ? endDate.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        })
                      : "dd/mm/aa"}
                    <Image
                      src={calendar_icon}
                      alt="calendar icon"
                      className="w-5 h-5 ml-2"
                    />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={endDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setEndDate(date);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex-1 flex flex-col mt-6">
            <div
              className="w-full overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 400px)" }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 pb-6">
                {loading ? (
                  // placeholder simples; troque por skeleton se tiver
                  <div className="col-span-full text-center text-gray-500">
                    Carregando...
                  </div>
                ) : (
                  consultations
                    .filter((card) =>
                      selectedTab === "historico"
                        ? isPastConsultation(card.date, card.time)
                        : !isPastConsultation(card.date, card.time)
                    )
                    .filter((card) => {
                      if (!startDate && !endDate) return true; // sem filtro
                      const consultaDate = getConsultationDate(
                        card.date,
                        card.time
                      ); // data da consulta
                      let start = startDate ? new Date(startDate) : undefined; // copia da data inicial
                      if (start) start.setHours(0, 0, 0, 0); // início do dia
                      let end = endDate ? new Date(endDate) : undefined; // copia da data final
                      if (end) end.setHours(23, 59, 59, 999); // fim do dia
                      if (start && end)
                        return consultaDate >= start && consultaDate <= end; // entre as datas
                      if (start) return consultaDate >= start; // após a data inicial
                      if (end) return consultaDate <= end; // antes da data final
                      return true;
                    })
                    .map((card, idx) => (
                      <Card
                        key={card.id ?? idx}
                        {...card}
                        isHistorical={selectedTab === "historico"}
                      />
                    ))
                )}
              </div>
            </div>

            <div className="w-full flex justify-center lg:justify-end mt-8 lg:mt-[60px] mb-8 flex-shrink-0">
              <div className="w-full sm:w-auto max-w-xs lg:max-w-none">
                <Botao
                  text="Nova Consulta"
                  color="#50E678"
                  image_src="/Vector.svg"
                  onClick={() => router.push("/Cadastro")}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
