"use client";
import { btfechar, citipetlogo } from "@/assets";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import api from "@/services/api";

type ModalNovaConsultaProps = {
  onClose: () => void;
  idPaciente: number | string;
  descricao: string;
};

export default function ModalNovaConsulta({
  onClose,
  idPaciente,
  descricao,
}: ModalNovaConsultaProps) {
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

  function onSubmit(data: FormData) {}

  const [dateType, setDateType] = useState<"text" | "date">("text");
  const [timeType, settimeType] = useState<"text" | "time">("text");
  const [submitting, setSubmitting] = useState(false);

  async function asyncSubmit(formData: FormData) {
    if (!idPaciente) {
      console.error("idPaciente não fornecido");
      return;
    }

    // normalize date to DD/MM
    let formattedDate = formData.data || "";
    // if input is in YYYY-MM-DD (type=date) convert to DD/MM
    const isoMatch = formattedDate.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
      const [, year, month, day] = isoMatch;
      formattedDate = `${day}/${month}`;
    } else {
      // if user typed something like DD/MM/YYYY or DD/MM, extract DD/MM
      const dmMatch = formattedDate.match(/(\d{2})\/(\d{2})/);
      if (dmMatch) formattedDate = `${dmMatch[1]}/${dmMatch[2]}`;
    }

    const payload = {
      medico: formData.medico,
      descricao: descricao,
      tipo: formData.tipodeconsulta,
      data: formattedDate,
      hora: formData.horario,
      idPaciente: Number(idPaciente),
    };

    try {
      setSubmitting(true);
      console.log("Payload para POST /consultation:", payload);
      const res = await api.post("/consultation", payload);
      // You can handle success feedback here (toast, etc.)
      onClose();
    } catch (error) {
      // Log more details from Axios error if available
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err: any = error;
      console.error("Erro ao criar consulta:", err);
      if (err?.response) {
        console.error(
          "Resposta do servidor:",
          err.response.status,
          err.response.data
        );
      }
      // Optionally show error feedback to user
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-[90vw] max-w-[824px] h-auto max-h-[90vh] bg-white rounded-3xl overflow-y-auto mx-4">
        <div className="flex justify-center px-4 sm:px-8">
          <div className="flex w-full justify-between items-start">
            <div className="flex-1" />
            <Image
              src={citipetlogo}
              alt="citipetlogo"
              className="mt-[32px] w-[120px] sm:w-[160px]"
            />
            <div className="flex-1 flex justify-end">
              <Image
                src={btfechar}
                alt="btfechar"
                className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 mt-4"
                onClick={onClose}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-1 flex-col items-center mt-[20px] font-sf text-[14px] sm:text-[16px] px-4">
          <div className="flex gap-1 flex-wrap justify-center text-center">
            <div className="font-bold">
              O pet já está cadastrado no sistema!
            </div>
            <div>Preencha os dados da</div>
            <div className="font-bold">consulta</div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(asyncSubmit)}
          className="flex flex-col mt-[29px] px-4 sm:px-8 text-[14px] sm:text-[16px] font-sf pb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="font-bold">Tipo de consulta</div>
              <select
                {...register("tipodeconsulta", { required: true })}
                className="mt-[12px] h-[50px] w-full border border-gray-300 px-3 rounded-lg"
                defaultValue=""
              >
                <option value="" disabled>
                  Selecione aqui
                </option>
                <option value="PrimeiraConsulta">Primeira Consulta</option>
                <option value="Vacinacao">Vacinação</option>
                <option value="Retorno">Retorno</option>
                <option value="CheckUp">Check-up</option>
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
                className="mt-[12px] h-[50px] w-full border border-gray-300 px-3 rounded-lg"
              />
              {errors.data && (
                <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
              )}
            </div>

            <div className="flex-1">
              <div className="font-bold">Médico Responsável</div>
              <input
                {...register("medico", { required: true })}
                type="text"
                className="mt-[12px] h-[50px] w-full border border-gray-300 px-3 rounded-lg"
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
                className="appearance-none mt-[12px] h-[50px] w-full border border-gray-300 px-3 rounded-lg"
                placeholder="00:00"
              />
              {errors.horario && (
                <p className="text-red-500 text-sm mt-1">Campo obrigatório</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className={`mt-[30px] w-full h-[42px] ${
              submitting ? "bg-green-300" : "bg-[#50E678]"
            } rounded-3xl flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.10)] text-white font-sf text-[14px] sm:text-[16px]`}
          >
            {submitting ? "Enviando..." : "Finalizar cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}
