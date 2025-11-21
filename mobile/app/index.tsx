import { View, Text } from "react-native";
import PetCard from "../src/components/MobileCard";
import Citipet from "../src/assets/citipet.svg";
import Citipetnovo from "../src/assets/citipetnovo.svg";
import Citigpt from "../src/assets/citigpt.svg";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import React, { useState } from "react";
import Sun from "../src/assets/sunsvg.svg";
import Cloud from "../src/assets/cloudsvg.svg";
import Moon from "../src/assets/moonsvg.svg";

const cardsMock = [
  {
    type: "Retorno",
    nomePet: "Sara",
    nomeDono: "Vico Mac",
    nomeDr: "Marcelo",
    data: "20/11",
    horario: "11:00",
    tipoPet: "cat",
  },
  {
    type: "Primeira consulta",
    nomePet: "Rex",
    nomeDono: "Ana Paula",
    nomeDr: "João",
    data: "20/11",
    horario: "12:30",
    tipoPet: "dog",
  },
  {
    type: "Vacinacao",
    nomePet: "Bela",
    nomeDono: "Carlos",
    nomeDr: "Mariana",
    data: "20/11",
    horario: "14:00",
    tipoPet: "sheep",
  },
  {
    type: "Checkup",
    nomePet: "Estrela",
    nomeDono: "Luisa",
    nomeDr: "Pedro",
    data: "20/11",
    horario: "15:30",
    tipoPet: "horse",
  },
  {
    type: "Historico",
    nomePet: "Porquinho",
    nomeDono: "Marco",
    nomeDr: "Fernanda",
    data: "21/11",
    horario: "09:00",
    tipoPet: "pig",
  },
] as const;

const App = () => {
  type FiltroHora = "" | "Sun" | "cloud" | "lua";
  const [selecionado, setSelecionado] = useState<FiltroHora>("");

  const toMinutes = (hora: string) => {
    // recebe hora e minutos e transforma em minutos totais pra fazer o filtro de manha tarde e noite
    const [h, m] = hora.split(":").map(Number);
    return h * 60 + m;
  };

  const ranges: Record<
    Exclude<FiltroHora, "">,
    { start: number; end: number }
  > = {
    Sun: { start: 0, end: 12 * 60 },
    cloud: { start: 12 * 60 + 1, end: 18 * 60 },
    lua: { start: 18 * 60 + 1, end: 24 * 60 },
  };

  const filteredCards = (() => {
    if (!selecionado) return cardsMock;

    const range = ranges[selecionado];

    return cardsMock.filter((c) => {
      const minutos = toMinutes(c.horario);
      return minutos >= range.start && minutos <= range.end;
    });
  })();

  return (
    <View className="flex-1 mt-[91px] items-center bg-gray-100 flex flex-col">
      <Citigpt width={160} height={48} />

      <View className="bg-white mt-[32px] rounded-full w-[252px] h-[70px] flex-row justify-around items-center shadow-[0px_4px_4px_rgba(0,0,0,0.3)]">
        <Pressable
          onPress={() => setSelecionado(selecionado === "Sun" ? "" : "Sun")}
          className={`w-[40px] h-[40px] rounded-full items-center justify-center ${
            selecionado === "Sun" ? "bg-gray-300" : "bg-transparent"
          }`}
        >
          <Sun />
        </Pressable>

        <Pressable
          onPress={() => setSelecionado(selecionado === "cloud" ? "" : "cloud")}
          className={`w-[40px] h-[40px] rounded-full items-center justify-center ${
            selecionado === "cloud" ? "bg-gray-300" : "bg-transparent"
          }`}
        >
          <Cloud />
        </Pressable>

        <Pressable
          onPress={() => setSelecionado(selecionado === "lua" ? "" : "lua")}
          className={`w-[40px] h-[40px] rounded-full items-center justify-center ${
            selecionado === "lua" ? "bg-gray-300" : "bg-transparent"
          }`}
        >
          <Moon />
        </Pressable>
      </View>

      <View className="mt-[40px]">
        <Text className="font-sf font-bold text-[24px]">Sua agenda</Text>
        <Text className="font-sf text-[14px] mt-[12px]">
          Veja aqui todos os seus pacientes agendados para hoje
        </Text>
      </View>

      <View className="w-full px-6 mt-4" style={{ height: 440 }}>
        <ScrollView
          contentContainerStyle={{ gap: 16, alignItems: "center" }}
          className="mt-[39px]"
        >
          {filteredCards.map((card, idx) => (
            <PetCard key={idx} {...card} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default App;
