import React, {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ActivityIndicator } from "react-native";
import { DataSource, Repository } from "typeorm/browser";

import { TodoModel } from "./entities/todo";
import { ProductModal } from "./entities/product";

interface DatabaseConnectionContextData {
  todosRepository: Repository<TodoModel>;
  productRepository: Repository<ProductModal>;
}

const DatabaseConnectionContext = createContext<DatabaseConnectionContextData>(
  {} as DatabaseConnectionContextData
);

const dataSource = new DataSource({
  database: "todos_example_article.db",
  driver: require("expo-sqlite"),
  entities: [TodoModel, ProductModal],
  synchronize: true,
  type: "expo",
});

export const DatabaseConnectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [connection, setConnection] = useState<DataSource | null>(null);

  const connect = useCallback(async () => {
    const source = await dataSource.initialize();

    setConnection(source);
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
        todosRepository: connection.getRepository(TodoModel),
        productRepository: connection.getRepository(ProductModal),
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
