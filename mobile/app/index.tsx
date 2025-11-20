import { View, Text } from "react-native";
import PetCard from "../src/components/MobileCard";
import { citipet } from "../src/assets";

const App = () => (
  <View className="flex-1 mt-[91px] items-center bg-gray-100 flex flex-col">
    <View></View>
    <View className="mt-[40px]">
      <Text className="font-sf font-bold text-[24px] ">Sua agenda</Text>
      <Text className="font-sf text-[14px] mt-[12px]">
        Veja aqui todos os seus pacientes agendados para hoje
      </Text>
    </View>

    <PetCard
      nomeDono="vico mac"
      nomeDr="marcelo"
      nomePet="sara"
      data="20/11"
      horario="11:00"
      type="Retorno"
      tipoPet="cat"
    />
  </View>
);

export default App;
