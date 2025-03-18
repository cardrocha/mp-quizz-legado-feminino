import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import type { ApiResponse } from "../types";
import { ArrowRightIcon } from "lucide-react";

interface QuestionAnswerProps {
  count: number;
  setCount: (value: number) => void;
  setCorrectCount: (value: (prev: number) => number) => void;
  setIncorrectCount: (value: (prev: number) => number) => void;
}

export function QuestionAnswer({ count, setCount, setCorrectCount, setIncorrectCount }: QuestionAnswerProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionData, setQuestionData] = useState<{ nome: string; contribuicao: string; id: string }[] | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<{ contribuicao: string } | null>(null);

  const { data: apiResponse, isLoading, isError, error } = useQuery<ApiResponse>({
    queryKey: ["question"],
    queryFn: async () => {
      const response = await fetch("https://apis.codante.io/api/legado-feminino/women");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      return response.json();
    },
  });

  useEffect(() => {
    if (apiResponse?.data) {
      const shuffledQuestions = [...apiResponse.data].sort(() => Math.random() - 0.5).slice(0, 4);
      setQuestionData(shuffledQuestions.map((q) => ({ ...q, id: q.id.toString() })));
      setCorrectAnswer(shuffledQuestions[Math.floor(Math.random() * shuffledQuestions.length)]);
      setSelectedAnswer(null);
    }
  }, [apiResponse]);

  const compareResult = (selectedAnswer: string) => {
    if (!correctAnswer) return;

    if (selectedAnswer === correctAnswer.contribuicao) {
      setCorrectCount((prev) => prev + 1);
      setSelectedAnswer(selectedAnswer);
    } else {
      setIncorrectCount((prev) => prev + 1);
      setSelectedAnswer("incorrect");
    }
  };

  const nextQuestion = () => {
    if (apiResponse?.data) {
      const shuffledQuestions = [...apiResponse.data].sort(() => Math.random() - 0.5).slice(0, 4);
      setQuestionData(shuffledQuestions.map((q) => ({ ...q, id: q.id.toString() })));
      setCorrectAnswer(shuffledQuestions[Math.floor(Math.random() * shuffledQuestions.length)]);
      setSelectedAnswer(null);
      setCount(count + 1);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data: {(error as Error).message}</div>;

  return (
    <>
      {correctAnswer && (
        <p className="text-xl text-foreground text-center font-light">{correctAnswer.contribuicao}</p>
      )}

      <ul className="grid grid-cols-2 gap-6">
        {questionData?.map((question) => (
          <li
            key={question.id}
            onClick={() => selectedAnswer === null && compareResult(question.contribuicao)}
            onKeyUp={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                selectedAnswer === null && compareResult(question.contribuicao);
              }
            }}
            className={`flex items-center justify-center py-3 px-4 text-center text-xl font-medium rounded-md cursor-pointer
              ${selectedAnswer ? "pointer-events-none" : "bg-rosa hover:saturate-200"}
              ${
                selectedAnswer === question.contribuicao
                  ? "bg-verde text-background"
                  : selectedAnswer === "incorrect" && correctAnswer?.contribuicao === question.contribuicao
                  ? "bg-verde text-background"
                  : selectedAnswer === "incorrect" && question.contribuicao !== correctAnswer?.contribuicao
                  ? "bg-red-500 text-foreground"
                  : "bg-rosa text-black"
              }
            `}
          >
            {question.nome}
          </li>
        ))}
      </ul>

      {selectedAnswer && (
        <span
          className={`mt-4 py-3 px-6 text-xl w-full md:w-[410px] text-center font-medium rounded-md ${
            selectedAnswer === correctAnswer?.contribuicao ? "bg-verde" : "bg-red-500"
          }`}
        >
          {selectedAnswer === correctAnswer?.contribuicao ? "Correto!" : "Incorreto!"}
        </span>
      )}

      {selectedAnswer && (
        <button
          type="button"
          onClick={nextQuestion}
          className="mt-4 flex items-center justify-center gap-2.5 bg-rosa py-2 px-6 w-full md:w-[410px] text-xl text-center font-medium rounded-md cursor-pointer hover:brightness-110"
        >
          Próxima Pergunta
          <ArrowRightIcon />
        </button>
      )}
      <a className="flex justify-center gap-2.5 bg-verde-2 text-background py-2 px-6 w-full md:w-[410px] text-xl text-center font-medium rounded-md cursor-pointer hover:brightness-110" href="/">Sair</a>
    </>
  );
}
