"use client";
import Image from "next/image";
import { useState } from "react";
import ModalCadastro from "@/components/modalcadastro";
import ModalNovaConsulta from "@/components/modalnovaconsulta";

export default function Home() {
  const [modalCadastro, setModalCadastro] = useState(true);
  const [modalNovaConsulta, setModalNovaConsulta] = useState(true);

  return (
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-black">
      {modalCadastro && <ModalCadastro abrirModal={setModalCadastro} />}
      {modalNovaConsulta && (
        <ModalNovaConsulta abrirModal={setModalNovaConsulta} />
      )}
    </div>
  );
}
