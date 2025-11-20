import { View, Text } from "react-native";
import PetCard from "../src/components/MobileCard";
import Citipet from "../src/assets/citipet.svg";
import Citipetnovo from "../src/assets/citipetnovo.svg";
import Citigpt from "../src/assets/citigpt.svg";
import { ScrollView } from "react-native-gesture-handler";
import { Pressable } from "react-native";
import React, { useState } from "react";
import Sun from "../src/assets/sun.svg";
import Cloud from "../src/assets/cloud.svg";
import Moon from "../src/assets/moon.svg";

const [selecionado, setSelecionado] = useState("");

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

const App = () => (
  <View className="flex-1 mt-[91px] items-center bg-gray-100 flex flex-col">
    <Citigpt width={160} height={48} />

    <View className="mt-[40px]">
      <Text className="font-sf font-bold text-[24px] ">Sua agenda</Text>
      <Text className="font-sf text-[14px] mt-[12px]">
        Veja aqui todos os seus pacientes agendados para hoje
      </Text>
    </View>
    <View className="w-full px-6 mt-4" style={{ height: 440 }}>
      <ScrollView
        contentContainerStyle={{ gap: 16, alignItems: "center" }}
        className="mt-[39px]"
      >
        {cardsMock.map((card, idx) => (
          <PetCard key={idx} {...card} />
        ))}
      </ScrollView>
    </View>
  </View>
);

export default App;
