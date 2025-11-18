"use client";
import { btfechar, citipetlogo } from "@/assets";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { time } from "console";

export default function ModalNovaConsulta() {
  type FormData = {
    tipodeconsulta: string;
    data: string;
    medico: string;
    horario: string;
  };

  const { register, handleSubmit } = useForm<FormData>(); //define o tipo do form

  function onSubmit(data: FormData) {
    console.log(data);
  }

  const [dateType, setDateType] = useState("text");
  const [timeType, settimeType] = useState("text");

  return (
    <div className="w-[824px] h-[493px] bg-white rounded-3xl">
      <div className="flex justify-center">
        <div className="flex">
          <Image
            src={citipetlogo}
            alt="citipetlogo"
            className=" mt-[48px] ml-[269px]"
          />
          <Image src={btfechar} alt="btfechar" className="ml-[245px]" />
        </div>
      </div>

      <div className="flex gap-1 flex-col items-center mt-[20px] font-sf text-[16px]">
        <div className="flex gap-1">
          <div className="font-bold">O pet já está cadastrado no sistema!</div>
          <div>Preencha os dados da</div>
          <div className="font-bold">consulta</div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-[29px] w-[312px] ml-[48px] text-[16px] font-sf"
      >
        <div className="flex">
          <div>
            <div className="font-bold">Tipo de consulta</div>
            <select
              {...register("tipodeconsulta")}
              className="mt-[12px] h-[50px] w-[358px] border border-gray-300 px-3 rounded-lg"
            >
              <option value="" disabled>
                Selecione aqui
              </option>
              <option value="primeira">Primeira Consulta</option>
              <option value="vacinacao">Vacinação</option>
              <option value="retorno">Retorno</option>
              <option value="checkup">Check-up</option>
            </select>

            <div className="font-bold mt-[12px]">Data do atendimento</div>
            <input
              {...register("data")}
              type={dateType}
              onFocus={() => setDateType("date")}
              onBlur={(e) => {
                if (!e.target.value) setDateType("text");
              }}
              placeholder="dd/mm/aa"
              className="mt-[12px] h-[50px] w-[358px] border border-gray-300 px-3 rounded-lg"
            />
          </div>
          <div className="ml-[12px]">
            <div className="font-bold">Médico Responsável</div>
            <input
              {...register("medico")}
              type="text"
              className="mt-[12px] h-[50px]  w-[358px] border border-gray-300 px-3 rounded-lg"
              placeholder="Digite aqui..."
            />

            <div className="font-bold mt-[12px]">Horário do atendimento</div>
            <input
              {...register("horario")}
              type={timeType}
              onFocus={() => settimeType("time")}
              onBlur={(e) => {
                if (!e.target.value) settimeType("text");
              }}
              className="appearance-none mt-[12px] h-[50px]  w-[358px] border border-gray-300 px-3 rounded-lg"
              placeholder="00:00"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-[30px] w-[728px] h-[42px] bg-[#50E678] rounded-3xl flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.10)] text-white font-sf text-[16px]"
        >
          Finalizar cadastro
        </button>
      </form>
    </div>
  );
}
