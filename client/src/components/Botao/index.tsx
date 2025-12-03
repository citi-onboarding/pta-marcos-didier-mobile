interface BotaoProps {
    text: string;
    color: string;
    image_src?: string; //propriedade opcional
    onClick?: () => void; //propriedade opcional
}

export default function Botao({text, color, image_src, onClick}: BotaoProps) { //desestruturacao atraves do { }
    return (
        <button
            style={{backgroundColor:color}}
            className="flex flex-items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-white hover:brightness-90 transition-all text-sm sm:text-base min-w-fit"
            onClick={onClick}
        >
            {
                image_src && <img src={image_src} alt="icon" className="w-4 h-4 sm:w-5 sm:h-5"/>
            }
            <span className="whitespace-nowrap">{text}</span>
        </button>
    )
}

/*
EXEMPLO DE USO:
.
.

import Botao from "@/components/Botao";
import {plus_icon} from "@/assets";

export default function Home() {
  return (
    <Botao
      text="Nova consulta"
      color="#7D1AD7"
      image_src={plus_icon.src}
    />
  );
}

*/