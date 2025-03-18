import { ModeToggle } from "./ModeToggle";

export function Dashboard() {
  return (
    <div className="max-w-lg bg-background min-h-[745px] mx-auto flex flex-col gap-30 px-2 items-center justify-center rounded-3xl border-8 border-stone-800">
      <h1 className="text-foreground text-3xl font-semibold">Mulheres que Fizeram História</h1>
      <a href="/quiz" className="bg-verde-2 hover:brightness-125 text-foreground font-oxanium text-3xl font-extrabold px-9 py-3 rounded-lg cursor-pointer" type="button">Iniciar Quiz</a>
      <p className="text-foreground text-xl italic text-center">"Teste seus conhecimentos sobre mulheres incríveis que marcaram a história!"</p>
      <ModeToggle />
    </div>
  )
}