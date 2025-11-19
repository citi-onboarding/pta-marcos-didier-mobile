interface BotaoProps {
    text: string;
    color: string;
    image_src?: string; //propriedade opcional
}

export default function Botao({text, color, image_src}: BotaoProps) { //desestruturacao atraves do { }
    return (
        <button
            style={{backgroundColor:color}}
            className="flex flex-items-center gap-2 px-4 py-2 rounded-full text-white hover:brightness-90 transition-all"

        >
            {
                image_src && <img src={image_src} alt="icon" className="w-5 h-5"/>
            }
            <span>{text}</span>
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