"use client";
import { btfechar, citipetlogo } from "@/assets";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";

type ModalNovaConsultaProps = {
  onClose: () => void;
};

export default function ModalNovaConsulta({ onClose }: ModalNovaConsultaProps) {
  type FormData = {
    tipodeconsulta: string;
    data: string;
    medico: string;
    horario: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  function onSubmit(data: FormData) {
    console.log(data);
    onClose();
  }

  const [dateType, setDateType] = useState("text");
  const [timeType, settimeType] = useState("text");

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[824px] h-[493px] bg-white rounded-3xl">
        <div className="flex justify-between items-center px-6 pt-6">
          <Image
            src={citipetlogo}
            alt="citipetlogo"
            className=" mt-[48px] ml-[269px]"
          />
          <Image
            src={btfechar}
            alt="btfechar"
            className="ml-[245px] cursor-pointer"
            onClick={onClose}
          />
        </div>

        <div className="flex gap-1 flex-col items-center mt-[20px] font-sf text-[16px]">
          <div className="flex gap-1">
            <div className="font-bold">
              O pet já está cadastrado no sistema!
            </div>
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
                {...register("tipodeconsulta", { required: true })}
                className="mt-[12px] h-[50px] w-[358px] border border-gray-300 px-3 rounded-lg"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione aqui
                </option>
                <option value="primeira">Primeira Consulta</option>
                <option value="vacinacao">Vacinação</option>
                <option value="retorno">Retorno</option>
                <option value="checkup">Check-up</option>
              </select>
              {errors.tipodeconsulta && (
                <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
              )}

              <div className="font-bold mt-[12px]">Data do atendimento</div>
              <input
                {...register("data", { required: true })}
                type={dateType}
                onFocus={() => setDateType("date")}
                onBlur={(e) => {
                  if (!e.target.value) setDateType("text");
                }}
                placeholder="dd/mm/aa"
                className="mt-[12px] h-[50px] w-[358px] border border-gray-300 px-3 rounded-lg"
              />
              {errors.data && (
                <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
              )}
            </div>

            <div className="ml-[12px]">
              <div className="font-bold">Médico Responsável</div>
              <input
                {...register("medico", { required: true })}
                type="text"
                className="mt-[12px] h-[50px] w-[358px] border border-gray-300 px-3 rounded-lg"
                placeholder="Digite aqui..."
              />
              {errors.medico && (
                <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
              )}

              <div className="font-bold mt-[12px]">Horário do atendimento</div>
              <input
                {...register("horario", { required: true })}
                type={timeType}
                onFocus={() => settimeType("time")}
                onBlur={(e) => {
                  if (!e.target.value) settimeType("text");
                }}
                className="appearance-none mt-[12px] h-[50px] w-[358px] border border-gray-300 px-3 rounded-lg"
                placeholder="00:00"
              />
              {errors.horario && (
                <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
              )}
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
    </div>
  );
}
