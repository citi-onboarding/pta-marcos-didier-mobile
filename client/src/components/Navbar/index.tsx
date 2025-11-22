//por padrao, todos os componente do diretorio 'app' do Next.js são 'Server Components'
//isso significa que eles sao renderizados no server e enviam apenas html puro para o navegador
//para usar coisas como 'useState' ou outros Hooks do React, precisamo dizer explicitamente com 'use cliente' que este componente é um 'Client Componente'
"use client"; 

import { citipetlogo } from "@/assets"
import { button_groups } from "@/assets"
import { useState } from "react"

export default function NavBar(){

    const [buttonSelected, setButtonSelected] = useState("atendimento");

    return(
        <div className="ml-2 mr-2 flex w-full min-w-[675px] min-h-[80px] bg-white justify-between items-center p-5">
            <div>
                <img src={citipetlogo.src} alt="citipetlogo" className="w-[160px]"/>
            </div>
            <div className="space-x-8 flex">
                <div className="space-y-1 flex flex-col items-center">
                    <button onClick={() => setButtonSelected("cadastro")} className=" p-2 hover:bg-lime-300 hover:rounded-full transition-all duration-300 ease-in-out">Cadastro</button>
                    <div className={`h-[2px] bg-green-500 transition-all duration-300 ease-in-out ${buttonSelected === "cadastro" ? "w-full" : "w-0"}`}></div>
                </div>
                <div className="space-y-1 flex flex-col items-center">
                    <button onClick={() => setButtonSelected("atendimento")} className=" p-2 hover:bg-lime-300 hover:rounded-full transition-all duration-300 ease-in-out">Atendimento</button>
                    <div className={`h-[2px] bg-green-500 transition-all duration-300 ease-in-out ${buttonSelected === "atendimento" ? "w-full" : "w-0"}`}></div>
                </div>
            </div>
            <div>
                <img src={button_groups.src} alt="button_groups" className="w-[220px]" />
            </div>
        </div>
    )
}