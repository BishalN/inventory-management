import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";
import { Connection, createConnection } from "typeorm";
import { TodoModel } from "./entities/todo";
import { TodosRepository } from "./repositories/todosRepository";

interface DatabaseConnectionContextData {
  todosRepository: TodosRepository;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

export const DatabaseConnectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [connection, setConnection] = useState<Connection | null>(null);

  const connect = useCallback(async () => {
    const createdConnection = await createConnection({
      type: "expo",
      database: "todos_example_article.db",
      driver: require("expo-sqlite"),
      entities: [TodoModel],
      synchronize: true,
    });

    setConnection(createdConnection);
  }, []);

  useEffect(() => {
    if (!connection) {
      connect();
    }
  }, [connect, connection]);

  if (!connection) {
    return <ActivityIndicator />;
  }

  return (
    <DatabaseConnectionContext.Provider
      value={{
        todosRepository: new TodosRepository(connection),
      }}
    >
      {children}
    </DatabaseConnectionContext.Provider>
  );
};

export function useDatabaseConnection() {
  const context = useContext(DatabaseConnectionContext);

  return context;
}
