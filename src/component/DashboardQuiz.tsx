import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { SVGImage } from "./SVGComponent";
import { QuestionAnswer } from "./QuestionAnswer";

export function Quiz() {
  const [count, setCount] = useState(1);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  const finishQuiz = count > 5; // O quiz termina após 5 perguntas

  return (
    <div>
      {finishQuiz ? (
        <div className="max-w-lg bg-background min-h-[745px] mx-auto flex flex-col gap-8 py-11 px-6 items-center justify-start rounded-3xl border-8 border-stone-800">
          <SVGImage />
          <div className="flex flex-col gap-8 items-center w-[470px] p-6">
            <h1 className="text-foreground text-xl font-semibold">Parabéns!</h1>
            <h2 className="text-foreground text-2xl text-center">Você concluiu o quiz com sucesso!</h2>
            <p className="text-verde-2 text-xl">Acertou {correctCount} resposta(s)</p>
            <p className="text-red-400 text-xl">Errou {incorrectCount} resposta(s)</p>
          </div>
          <a className="flex justify-center gap-2.5 bg-verde-2 text-background py-2 px-6 w-[410px] text-xl text-center font-medium rounded-md cursor-pointer hover:brightness-110" href="/">Voltar ao inicio</a>
          <a href="/quiz" className="flex justify-center gap-2.5 bg-rosa text-background py-2 px-6 w-[410px] text-xl text-center font-medium rounded-md cursor-pointer hover:brightness-110">Jorgar Novamente</a>
          <ModeToggle />
        </div>
      ) : (
        <div className="max-w-lg bg-background min-h-[745px] mx-auto flex flex-col gap-8 py-11 px-6 items-center justify-start rounded-3xl border-8 border-stone-800">
          <SVGImage />
          <div className="flex flex-col gap-8 items-center w-[470px] p-6">
            <h1 className="text-foreground text-xl font-semibold">Pergunta {count} de 5</h1>
            <h2 className="text-foreground text-2xl text-center">Qual alternativa descreve essa informação?</h2>
          </div>
          <QuestionAnswer count={count} setCount={setCount} setCorrectCount={setCorrectCount} setIncorrectCount={setIncorrectCount} />
          <ModeToggle />
        </div>
      )}
    </div>
  );
}
