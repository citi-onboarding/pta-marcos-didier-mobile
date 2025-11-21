import React from "react";
import { View, Text } from "react-native";
import type { SvgProps } from "react-native-svg";
import { alarmmobile, cat, dog, cow, horse, pig, sheep } from "../../assets";

export interface PetCardmbProps {
  type: "Primeira consulta" | "Vacinacao" | "Checkup" | "Retorno" | "Historico";
  nomePet: string;
  nomeDono: string;
  nomeDr: string;
  data: string;
  horario: string;
  tipoPet: "cat" | "dog" | "sheep" | "cow" | "horse" | "pig";
}

const corPorConsulta = {
  "Primeira consulta": "#BFB5FF",
  Vacinacao: "#AAE1FF",
  Checkup: "#9CFF95",
  Retorno: "#FF641999",
  Historico: "#F0F0F0",
};

const imgsporpet: Record<PetCardmbProps["tipoPet"], React.FC<SvgProps>> = {
  cat,
  dog,
  sheep,
  cow,
  horse,
  pig,
};

export default function PetCard(props: PetCardmbProps) {
  return (
    <View
      className="w-[358px] h-[122px] rounded-2xl flex flex-row gap-4 items-center"
      style={{ backgroundColor: corPorConsulta[props.type] }}
    >
      <View className="w-[51px] h-[90px] bg-[#FFFFFFCC] rounded-sm items-center justify-center  ml-[24px] gap-[8px]">
        {(() => {
          const Icon = alarmmobile;
          return <Icon className="" />;
        })()}

        <Text className="font-bold font-sf">{props.data}</Text>
        <Text className="font-bold font-sf">{props.horario}</Text>
      </View>
      <View className="flex flex-col gap-4 w-[135px]">
        <Text className="font-bold font-sf">
          {props.nomePet}{" "}
          <Text className="font-normal font-sf">/ {props.nomeDono}</Text>
        </Text>
        <Text className="font-sf">Dr. {props.nomeDr} </Text>
      </View>

      <View className="flex flex-col justify-center items-center w-[101px] ml-[0px]">
        {(() => {
          const Icon = imgsporpet[props.tipoPet];
          return <Icon width={69} height={70} />;
        })()}
        {/* retorna a imagem como componente */}

        <View className="w-[101px] h-[25px] bg-[#FFFFFFCC] rounded-[4px] text-[12px] flex flex-row justify-center items-center">
          {props.type}
        </View>
      </View>
    </View>
  );
}
