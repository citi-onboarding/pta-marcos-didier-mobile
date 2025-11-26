"use client"

import { useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { sheep, cat, pig, cow, horse } from "@/assets";
import dog from "@/assets/dog.png";
import NavBar from "@/components/Navbar";
import ModalCadastro from "@/components/modalcadastro";
import { useState } from "react";

export default function Cadastro(){

    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm();
    const [modalAberto, setModalAberto] = useState(false);

    const submitForm = (data: any) => {
        console.log("Dados do formulário: ", data);
        setModalAberto(true);
    }

    const handleFecharModal = (openclose: boolean) => {
        setModalAberto(openclose);
    }

    const MockedMedicosCadastrados = [
        "Marcos Didier",
        "Ana Silva",
        "João Pereira",
        "Maria Oliveira"
    ]

    const MockedTiposDeConsulta = [
        "Consulta de rotina",
        "Vacinação",
        "Emergência",
        "Exame laboratoriais"
    ]
    
    const MockedSpecies = [
        "sheep",
        "cat",
        "pig",
        "cow",
        "horse",
        "dog"
    ]

    const MockedSpeciesImages: any = {
        sheep: sheep,
        cat: cat,
        pig: pig,
        cow: cow,
        horse: horse,
        dog: dog
    }

    const especieSelecionada = watch("especiePaciente")

    {console.log(watch)}

    return (
        <div className="flex flex-1 flex-col bg-[#FFFFFF] min-h-screen">
            <div className="w-full flex flex-col">
                <div className="w-full">
                    <NavBar/>
                    <div className="h-px w-full bg-gray-200" role="separator" />
                </div>

                <div className="w-full px-4 sm:px-8 lg:px-[165px]">
                    <div className="pt-[40px] w-full">
                        <div className="flex items-center">
                            <FaChevronLeft className="w-[24px] h-[24px] hover:text-3xl hover:bg-slate-400 hover: rounded-full hover:p-1 cursor-pointer" />
                            <p className="text-[32px] sm:text-[48px] ml-[16px] font-bold">Cadastro</p>
                        </div>
                    </div>

                    <div className="w-full mt-[40px] overflow-y-auto max-w-[1532px]">
                        <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-y-6">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-gray-900 text-base sm:text-lg">Nome do paciente</span>
                                    <input
                                        {...register("Nome do Paciente", { required: true })}
                                        placeholder="Digite aqui..."
                                        className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-gray-900 text-base sm:text-lg">Nome do tutor</span>
                                    <input
                                        {...register("Nome do tutor", { required: true })}
                                        placeholder="Digite aqui..."
                                        className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col gap-4">
                                <span className="font-bold text-gray-900 text-base sm:text-lg">Qual é a espécie do paciente?</span>
                            
                                <input 
                                    type="hidden" 
                                    {...register("especiePaciente", { required: true })} 
                                />

                                <div className="flex flex-wrap gap-4 sm:gap-6 justify-center sm:justify-start">
                                    {MockedSpecies.map((animal) => (
                                        <div
                                            key={animal}
                                            onClick={() => setValue("especiePaciente", animal, { shouldValidate: true })}
                                            className={`
                                                cursor-pointer p-3 sm:p-4 rounded-xl border transition-all duration-200
                                                flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24
                                                ${especieSelecionada === animal &&  "bg-green-100 border-green-500 shadow-md scale-105"}
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
                                    <span className="text-red-500 text-sm mt-1">Por favor, selecione uma espécie.</span>
                                )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-gray-900 text-base sm:text-lg">Idade do paciente</span>
                                    <input
                                        type="number"
                                        min="0"
                                        {...register("Idade do paciente", { required: true, min: 0 })}
                                        placeholder="Digite aqui..."
                                        className="border border-gray-400 rounded-lg px-4 py-3 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-gray-900 text-base sm:text-lg">Tipo de consulta</span>
                                    <select
                                        {...register("Tipo de consulta", { required: true })}
                                        defaultValue=""
                                        className="border border-gray-400 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-base sm:text-lg"
                                    >
                                        <option value="" disabled>Selecione...</option>
                                        {MockedTiposDeConsulta.map((tipo) => (
                                            <option key={tipo} value={tipo}>
                                                {tipo}
                                            </option>
                                        ))} 
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-gray-900 text-base sm:text-lg">Médico responsável</span>
                                    <select
                                        {...register("Médico Responsável", { required: true })}
                                        defaultValue=""
                                        className="border border-gray-400 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white text-base sm:text-lg"
                                    >
                                        <option value="" disabled>Selecione...</option>
                                        {MockedMedicosCadastrados.map((medico) => (
                                            <option key={medico} value={medico}>
                                                {medico}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-gray-900 text-base sm:text-lg">Data do atendimento</span>
                                    <input
                                        type="date"
                                        min={new Date().toISOString().split("T")[0]}
                                        {...register("Data do atendimento", {required: true})}
                                        className="border border-gray-400 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                                    />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <span className="font-bold text-gray-900 text-base sm:text-lg">Horário do atendimento</span>
                                    <input 
                                        type="time"
                                        {...register("Horário do atendimento", {required: true})}
                                        className="border border-gray-400 rounded-lg px-4 py-3 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors text-base sm:text-lg"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2 w-full">
                                <span className="font-bold text-gray-900 text-base sm:text-lg">Descrição do problema</span>
                                <textarea
                                    {...register("Descrição do problema", {required: true})}
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
    )
}