export interface QuestionResponse {
  id: number;
  nome: string;
  ano_nascimento: number | null;
  ano_morte: number | null;
  contribuicao: string;
}

export interface ApiResponse {
  data: QuestionResponse[];
}