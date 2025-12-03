"use client";

import { useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { sheep, cat, pig, cow, horse } from "@/assets";
import dog from "@/assets/dog.png";
import NavBar from "@/components/Navbar";
import ModalCadastro from "@/components/modalcadastro";
import { useState } from "react";
import axios from "axios";
import api from "@/services/api";

export default function Cadastro() {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [modalAberto, setModalAberto] = useState(false);
  const router = useRouter();

  const speciesMap: Record<string, string> = {
    sheep: "Bode",
    cat: "Gato",
    pig: "Porco",
    cow: "Girafa", //schema não tem 'Vaca'. Mapeado para 'Bode' pra não quebrar.
    horse: "Cavalo",
    dog: "Cachorro",
  };

  const submitForm = async (data: any) => {
    try {
      //1 - traducao da especie
      const speciesEnum = speciesMap[data.especiePaciente];

      if (!speciesEnum) {
        alert("Espécie inválida selecionada.");
        return;
      }

      //2 - montar objeto do paciente (PET)
      const petBody = {
        nomeDoAnimal: data["Nome do Paciente"],
        nomeDono: data["Nome do tutor"],
        especie: speciesEnum,
        idade: Number(data["Idade do paciente"]),
        genero: "Macho", //Gênero não está sendo coletado no formulário
      };

      //3 - POST para criar o PET
      const petResponse = await api.post("/pet", petBody);

      console.log("Resposta da criação do pet:", petResponse.data);

      //4 - pegar o id gerado
      const createdPetId = petResponse.data.createdPet.id;

      if (!createdPetId) {
        throw new Error("ID do pet criado não retornado.");
      }

      //5 - montar objeto da consulta
      // format date to DD/MM
      let rawDate = data["Data do atendimento"];
      let formattedDate = rawDate;
      if (typeof rawDate === "string") {
        const isoMatch = rawDate.match(/^(\d{4})-(\d{2})-(\d{2})/);
        if (isoMatch) {
          const [, year, month, day] = isoMatch;
          formattedDate = `${day}/${month}`;
        } else {
          const dm = rawDate.match(/(\d{2})\/(\d{2})/);
          if (dm) formattedDate = `${dm[1]}/${dm[2]}`;
        }
      }

      const consultationBody = {
        medico: data["Médico Responsável"],
        descricao: data["Descrição do problema"],
        tipo: MockedTiposDeConsulta.find(
          (tipo) => tipo.label === data["Tipo de consulta"]
        )?.value, // Mapeia o valor exibido para o valor esperado pela API
        data: formattedDate,
        hora: data["Horário do atendimento"],
        idPaciente: createdPetId,
      };

      //6 - POST para criar consulta
      await api.post("consultation", consultationBody);

      setModalAberto(true);
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Erro ao realizar o cadastro. Verifique o console.");
    }

    setModalAberto(true);
  };

  const handleFecharModal = (openclose: boolean) => {
    setModalAberto(openclose);
  };

  const handleGoBack = () => {
    router.back();
  };

  const MockedTiposDeConsulta = [
    { label: "Primeira Consulta", value: "PrimeiraConsulta" },
    { label: "Check-up", value: "CheckUp" },
    { label: "Vacinação", value: "Vacinacao" },
    { label: "Retorno", value: "Retorno" },
  ];

  const MockedSpecies = ["sheep", "cat", "pig", "cow", "horse", "dog"];

  const MockedSpeciesImages: any = {
    sheep: sheep,
    cat: cat,
    pig: pig,
    cow: cow,
    horse: horse,
    dog: dog,
  };

  const especieSelecionada = watch("especiePaciente");

  {
    console.log(watch);
  }

  return (
    <div className="flex flex-1 flex-col bg-[#FFFFFF] min-h-screen overflow-x-hidden">
      <div className="w-full flex flex-col">
        <div className="w-full">
          <NavBar />
          <div className="h-px w-full bg-gray-200" role="separator" />
        </div>

        <div className="w-full px-4 sm:px-8 lg:px-[165px]">
          <div className="pt-[40px] w-full">
            <div className="flex items-center">
              <FaChevronLeft
                className="w-[24px] h-[24px] hover:text-3xl hover:bg-slate-400 hover: rounded-full hover:p-1 cursor-pointer"
                onClick={handleGoBack}
              />
              <p className="text-[32px] sm:text-[48px] ml-[16px] font-bold">
                Cadastro
              </p>
            </div>
          </div>

          <div className="w-full mt-[40px] overflow-y-auto max-w-[1532px]">
            <form
              onSubmit={handleSubmit(submitForm)}
              className="flex flex-col gap-y-6"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    Nome do paciente
                  </span>
                  <input
                    {...register("Nome do Paciente", { required: true })}
                    placeholder="Digite aqui..."
                    className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    Nome do tutor
                  </span>
                  <input
                    {...register("Nome do tutor", { required: true })}
                    placeholder="Digite aqui..."
                    className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <span className="font-bold text-gray-900 text-base sm:text-lg">
                  Qual é a espécie do paciente?
                </span>

                <input
                  type="hidden"
                  {...register("especiePaciente", { required: true })}
                />

                <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
                  {MockedSpecies.map((animal) => (
                    <div
                      key={animal}
                      onClick={() =>
                        setValue("especiePaciente", animal, {
                          shouldValidate: true,
                        })
                      }
                      className={`
                                                cursor-pointer p-3 sm:p-4 rounded-xl border transition-all duration-200
                                                flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24
                                                ${
                                                  especieSelecionada ===
                                                    animal &&
                                                  "bg-green-100 border-green-500 shadow-md scale-105"
                                                }
                                            `}
                    >
                      <img
                        src={MockedSpeciesImages[animal].src}
                        alt={animal}
                        className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                      />
                    </div>
                  ))}
                </div>

                {errors.especiePaciente && (
                  <span className="text-red-500 text-sm mt-1">
                    Por favor, selecione uma espécie.
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    Idade do paciente
                  </span>
                  <input
                    type="number"
                    min="0"
                    {...register("Idade do paciente", {
                      required: true,
                      min: 0,
                    })}
                    placeholder="Digite aqui..."
                    className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    Tipo de consulta
                  </span>
                  <select
                    {...register("Tipo de consulta", { required: true })}
                    defaultValue=""
                    className="border border-gray-400 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-base sm:text-lg"
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {MockedTiposDeConsulta.map((tipo) => (
                      <option key={tipo.value} value={tipo.label}>
                        {tipo.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    Médico responsável
                  </span>
                  <input
                    {...register("Médico Responsável", { required: true })}
                    placeholder="Digite aqui o nome do médico"
                    className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    Data do atendimento
                  </span>
                  <input
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    {...register("Data do atendimento", { required: true })}
                    className="border border-gray-400 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="font-bold text-gray-900 text-base sm:text-lg">
                    Horário do atendimento
                  </span>
                  <input
                    type="time"
                    {...register("Horário do atendimento", { required: true })}
                    className="border border-gray-400 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 w-full">
                <span className="font-bold text-gray-900 text-base sm:text-lg">
                  Descrição do problema
                </span>
                <textarea
                  {...register("Descrição do problema", { required: true })}
                  placeholder="Descrição do problema"
                  rows={4}
                  className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none text-base sm:text-lg"
                />
              </div>

              <div className="flex justify-center sm:justify-end w-full mt-8 mb-8">
                <button
                  type="submit"
                  className="bg-[#50E678] text-white font-bold py-3 px-6 sm:px-8 rounded-full hover:brightness-90 transition-all shadow-md text-base sm:text-lg w-full sm:w-auto max-w-xs"
                >
                  Finalizar Cadastro
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ModalCadastro abrirModal={handleFecharModal} />
        </div>
      )}
    </div>
  );
}
