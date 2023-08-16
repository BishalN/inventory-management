import { useQuery } from "@tanstack/react-query";
import { useDatabaseConnection } from "../../connection";

export function useGetAllTodos() {
  const { todosRepository } = useDatabaseConnection();
  return useQuery({
    queryFn: () => {
      return todosRepository.getAll();
    },
    queryKey: ["todos"],
  });
}
