"use client";
import { btfechar, citipetlogo } from "@/assets";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";

export interface modalprops {
  abrirModal: (openclose: boolean) => void;
}

export default function ModalCadastro(props: modalprops) {
  const { register, handleSubmit } = useForm<{ email: string }>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string>("");

  async function onSubmit(data: { email: string }) {
    setLoading(true);
    setMessage("");

    try {
      console.log("Enviando email para:", data.email);

      const response = await axios.post("http://localhost:3001/send-email", {
        email: data.email,
      });

      console.log("Email enviado com sucesso:", response.data);
      setMessage("✅ Email enviado com sucesso!");

      setTimeout(() => {
        props.abrirModal(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar email:", error);
      setMessage("❌ Erro ao enviar email. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-[90vw] max-w-[408px] h-auto bg-white rounded-3xl mx-4">
      <div className="flex justify-center px-4 sm:px-8">
        <div className="flex w-full justify-between items-center">
          <div className="flex-1" />
          <Image
            src={citipetlogo}
            alt="citipetlogo"
            className="mt-[48px] w-[120px] sm:w-[160px]"
          />
          <div className="flex-1 flex justify-end">
            <Image
              src={btfechar}
              alt="btfechar"
              className="cursor-pointer w-6 h-6 sm:w-8 sm:h-8 mt-4"
              onClick={() => props.abrirModal(false)}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-1 flex-col items-center mt-[20px] font-sf text-[14px] sm:text-[16px] px-4">
        <div className="flex flex-wrap justify-center text-center">
          <div className="flex gap-1">
            <div className="font-bold">Cadastro finalizado!</div>
            <div>Envie o</div>
          </div>
        </div>
        <div className="flex gap-1">
          <div>comprovante para o</div>
          <div className="font-bold">tutor</div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-[29px] px-4 sm:px-8 text-[14px] sm:text-[16px] font-sf pb-8"
      >
        <div className="font-bold">E-mail</div>
        <input
          type="email"
          {...register("email", { required: true })}
          className="mt-[12px] h-[50px] border border-gray-300 px-3 rounded-lg"
          placeholder="Digite aqui..."
          disabled={loading}
        />

        {/* Mensagem de status */}
        {message && (
          <div
            className={`mt-3 text-sm text-center ${
              message.includes("sucesso") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-[30px] w-full h-[42px] bg-[#50E678] rounded-3xl flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.10)] text-white font-sf text-[14px] sm:text-[16px] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
}
