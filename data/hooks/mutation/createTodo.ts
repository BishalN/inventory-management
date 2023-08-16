import { useMutation } from "@tanstack/react-query";
import { useDatabaseConnection } from "../../connection";
import { queryClient } from "../../../app/_layout";

type CreateTodo = {
  text: string;
};

export function useCreateTodo() {
  const { todosRepository } = useDatabaseConnection();
  return useMutation({
    mutationFn: async (data: CreateTodo) => {
      return todosRepository.create({ text: data.text });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });
}
