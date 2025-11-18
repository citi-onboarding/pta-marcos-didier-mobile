"use client";
import { btfechar, citipetlogo } from "@/assets";
import Image from "next/image";
import { useForm } from "react-hook-form";

export default function Modalcadastro() {
  const { register, handleSubmit } = useForm<{ email: string }>();

  function onSubmit(data: { email: string }) {
    console.log("Email enviado:", data.email);
  }

  return (
    <div className="w-[408px] h-[423px] bg-white rounded-3xl">
      <div className="flex justify-center">
        <div className="flex">
          <Image
            src={citipetlogo}
            alt="citipetlogo"
            className=" mt-[48px] ml-[54px]"
          />
          <Image src={btfechar} alt="btfechar" className="ml-[30px]" />
        </div>
      </div>

      <div className="flex gap-1 flex-col items-center mt-[20px] font-sf text-[16px]">
        <div className="flex">
          <div className="font-bold">Cadastro finalizado!</div>
          <div>Envie o</div>
        </div>
        <div className="flex">
          <div>comprovante para o</div>
          <div className="font-bold">tutor</div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col mt-[29px] w-[312px] ml-[48px] text-[16px] font-sf"
      >
        <div className="font-bold">E-mail</div>
        <input
          type="email"
          {...register("email", { required: true })}
          className="mt-[12px] h-[50px] border border-gray-300 px-3 rounded-lg"
          placeholder="Digite aqui..."
        />

        <button
          type="submit"
          className="mt-[30px] w-[312px] h-[42px] bg-[#50E678] rounded-3xl flex items-center justify-center shadow-[0px_4px_4px_rgba(0,0,0,0.10)] text-white font-sf text-[16px]"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
