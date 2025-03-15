import { ModeToggle } from "./ModeToggle";

export function Dashboard() {
  return (
    <div className="max-w-lg bg-background min-h-[745px] mx-auto flex flex-col gap-30 px-2 items-center justify-center rounded-3xl border-8 border-stone-800">
      <h1 className="text-white text-3xl font-semibold">Mulheres que Fizeram História</h1>
      <button className="bg-cyan-400 hover:bg-cyan-300 text-white font-oxanium text-3xl font-semibold px-6 py-1 rounded-lg cursor-pointer" type="button">Iniciar Quiz</button>
      <p className="text-white text-xl italic text-center">"Teste seus conhecimentos sobre mulheres incríveis que marcaram a história!"</p>
      <ModeToggle />
    </div>
  )
}