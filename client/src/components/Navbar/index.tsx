"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { citipetlogo } from "@/assets";
import { button_groups } from "@/assets";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();
  const [buttonSelected, setButtonSelected] = useState(() => {
    if (!pathname) return "atendimento";
    return pathname.toLowerCase().startsWith("/cadastro")
      ? "cadastro"
      : "atendimento";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  const handleAtendimentoClick = () => {
    setButtonSelected("atendimento");
    router.push("/Atendimento");
    setMobileMenuOpen(false);
  };

  const handleCadastroClick = () => {
    setButtonSelected("cadastro");
    router.push("/Cadastro");
    setMobileMenuOpen(false);
  };

  // Keep selected button in sync with current pathname (handles navigation from other parts)
  useEffect(() => {
    if (!pathname) return;
    const p = pathname.toLowerCase();
    if (p.startsWith("/cadastro")) setButtonSelected("cadastro");
    else setButtonSelected("atendimento");
  }, [pathname]);

  return (
    <div className="mx-2 flex w-full bg-white justify-between items-center p-3 sm:p-5 min-h-[70px] sm:min-h-[80px]">
      <div className="flex-shrink-0">
        <img
          src={citipetlogo.src}
          alt="citipetlogo"
          className="w-[120px] sm:w-[160px]"
        />
      </div>

      {/* Desktop Menu (converted to Tabs, preserving styles) */}
      <Tabs
        value={buttonSelected}
        onValueChange={(v) => {
          setButtonSelected(v);
          if (v === "cadastro") router.push("/Cadastro");
          else router.push("/Atendimento");
          setMobileMenuOpen(false);
        }}
      >
        <TabsList className="hidden md:flex space-x-8">
          <div className="space-y-1 flex flex-col items-center">
            <TabsTrigger
              value="atendimento"
              className="p-2 hover:bg-lime-300 hover:rounded-full transition-all duration-300 ease-in-out"
            >
              Atendimento
            </TabsTrigger>
            <div
              className={`h-[2px] bg-green-500 transition-all duration-300 ease-in-out ${
                buttonSelected === "atendimento" ? "w-full" : "w-0"
              }`}
            ></div>
          </div>

          <div className="space-y-1 flex flex-col items-center">
            <TabsTrigger
              value="cadastro"
              className="p-2 hover:bg-lime-300 hover:rounded-full transition-all duration-300 ease-in-out"
            >
              Cadastro
            </TabsTrigger>
            <div
              className={`h-[2px] bg-green-500 transition-all duration-300 ease-in-out ${
                buttonSelected === "cadastro" ? "w-full" : "w-0"
              }`}
            ></div>
          </div>
        </TabsList>
      </Tabs>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md hover:bg-gray-100"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Desktop Button Groups */}
      <div className="hidden lg:block flex-shrink-0">
        <img
          src={button_groups.src}
          alt="button_groups"
          className="w-[180px] xl:w-[220px]"
        />
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 right-0 bg-white border-t border-gray-200 md:hidden z-50">
          <div className="px-4 py-2 space-y-2">
            <Tabs
              value={buttonSelected}
              onValueChange={(v) => {
                setButtonSelected(v);
                if (v === "cadastro") router.push("/Cadastro");
                else router.push("/Atendimento");
                setMobileMenuOpen(false);
              }}
            >
              <TabsList className="flex flex-col">
                <TabsTrigger
                  value="atendimento"
                  className={`block w-full text-left p-3 rounded-md transition-colors ${
                    buttonSelected === "atendimento"
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Atendimento
                </TabsTrigger>
                <TabsTrigger
                  value="cadastro"
                  className={`block w-full text-left p-3 rounded-md transition-colors ${
                    buttonSelected === "cadastro"
                      ? "bg-green-100 text-green-700"
                      : "hover:bg-gray-100"
                  }`}
                >
                  Cadastro
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      )}
    </div>
  );
}
