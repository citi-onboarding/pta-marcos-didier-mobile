"use client"

import { useForm } from "react-hook-form";
import { FaChevronLeft } from "react-icons/fa";
import { sheep, cat, pig, cow, horse, dog } from "@/assets";

export default function Cadastro(){

    const {register, handleSubmit, setValue, watch, formState: {errors}} = useForm();

    const submitForm = (data: any) => {
        console.log("Dados do formulário: ", data);
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
        <div className="grid grid-cols-1 ml-24 mr-24">
            <div className="p-5">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2 text-2xl font-semibold mb-6 cursor-pointer">
                        <FaChevronLeft className="hover:text-3xl hover:bg-slate-400 hover: rounded-full hover:p-1" />
                        <span>Cadastro</span>
                    </div>
                    <form onSubmit={handleSubmit(submitForm)} className="flex flex-col gap-y-3">
                        <div className="grid grid-cols-2 gap-2 w-full">
                            <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-sm">Nome do paciente</span>
                            <input
                                {...register("Nome do Paciente", { required: true })}
                                placeholder="Digite aqui..."
                                className="border border-gray-400 rounded-lg px-3 py-2 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            />
                            </div>
                            <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-sm">Nome do tutor</span>
                            <input
                                {...register("Nome do tutor", { required: true })}
                                placeholder="Digite aqui..."
                                className="border border-gray-400 rounded-lg px-3 py-2 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            />
                            </div>
                            
                        </div>
                        {/** */}
                        <div className="flex flex-col gap-2 my-2">
                        <span className="font-bold text-gray-900 text-sm">Qual é a espécie do paciente?</span>
                    
                        {/*INPUT INVISÍVEL armazena o valor para o formulário ser enviado corretamente */}
                        <input 
                            type="hidden" 
                            {...register("especiePaciente", { required: true })} 
                        />

                        <div className="flex flex-wrap gap-4">
                            {MockedSpecies.map((animal) => (
                                <div
                                    key={animal}
                                    // quando clica, define o valor no input invisivel e avisa que validou
                                    onClick={() => setValue("especiePaciente", animal, { shouldValidate: true })}
                                    className={`
                                        cursor-pointer p-3 rounded-xl border transition-all duration-200
                                        flex items-center justify-center w-20 h-20
                                            ${especieSelecionada === animal &&  "bg-green-100 border-green-500 shadow-md scale-105" //style selecionado
                                        }
                                    `}
                                >
                                    <img 
                                        src={MockedSpeciesImages[animal].src} 
                                        alt={animal} 
                                        className="w-12 h-12 object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    
                    {/*msg de erro*/}
                    {errors.especiePaciente && (
                        <span className="text-red-500 text-xs mt-1">Por favor, selecione uma espécie.</span>
                    )}
                    </div>
                        {/** */}

                        <div className="grid grid-cols-2 gap-3 w-full">
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-sm">Idade do paciente</span>
                            <input
                                type="number"
                                min="0"
                                {...register("Idade do paciente", { required: true, min: 0 })}
                                placeholder="Digite aqui..."
                                className="border border-gray-400 rounded-lg px-3 py-2 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-sm">Tipo de consulta</span>
                            <select
                                {...register("Tipo de consulta", { required: true })}
                                defaultValue=""
                                className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
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
                        <div className="grid grid-cols-3 gap-3 w-full">
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-sm">Médico responsável</span>
                            <select
                                {...register("Médico Responsável", { required: true })}
                                defaultValue=""
                                className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors bg-white"
                            >
                                <option value="" disabled>Selecione...</option>
                                {MockedMedicosCadastrados.map((medico) => (
                                    <option key={medico} value={medico}>
                                        {medico}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-sm">Data do atendimento</span>
                            <input
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                {...register("Data do atendimento", {required: true})}
                                className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-gray-900 text-sm">Horário do atendimento</span>
                            <input 
                                type="time"
                                {...register("Horário do atendimento", {required: true})}
                                className="border border-gray-400 rounded-lg px-3 py-2 w-full text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors"
                            />
                        </div>
                        </div>
                        <div className="grid grid-cols-1 gap-3 w-full">
                        <span className="font-bold text-gray-900 text-sm">Descrição do problema</span>
                        <textarea
                            {...register("Descrição do problema", {required: true})}
                            placeholder="Descrição do problema"
                            rows={3}
                            className="border border-gray-400 rounded-lg px-3 py-2 w-full placeholder:text-gray-300 text-gray-700 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-colors resize-none"
                        />
                        </div>
                        <div className="flex justify-end w-full mt-4">
                            <div className="flex justify-end w-full">
                                <button
                                    type="submit"
                                    className="bg-[#50E678] text-white font-bold py-2 px-6 rounded-full hover:brightness-90 transition-all shadow-md"
                                >
                                    Finalizar Cadastro
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        
    )

}