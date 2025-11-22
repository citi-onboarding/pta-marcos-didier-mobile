import Image from "next/image";

import { LogoCITi } from "../assets";
import Card from "@/components/Card";
import NavBar from "@/components/Navbar";
import horse from "@/assets/horse.svg";
import cow from "@/assets/cow.svg";

export default function Home() {
  return (
    <div>
    <NavBar/>
    <div className="flex flex-1 flex-col h-full justify-around items-center bg-black">
      <div>
        <div className="flex flex-col gap-4 mt-6">
          <Card 
            color="bg-blue-400"
            patientName="Thunder"
            ownerName="Carlos Mendes"
            doctorName="Dr. Ana Veterinária"
            animalIcon={horse}
            time="14:30"
            date="15/03"
            type_appointment="Consulta"
          />
          <Card 
            color="bg-green-400"
            patientName="Bessie"
            ownerName="Fazenda São José"
            doctorName="Dr. Pedro Rural"
            animalIcon={cow}
            time="16:00"
            date="15/03"
            type_appointment="Vacinação"
          />
        </div>
      </div>
    </div>
  </div>
  );
}
