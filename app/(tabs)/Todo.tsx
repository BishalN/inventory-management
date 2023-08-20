import {
  ActivityIndicator,
  Alert,
  Button,
  Modal,
  Pressable,
  TextInput,
} from "react-native";
import { Text, View } from "../../components/Themed";
import { useState } from "react";
import { useCreateTodo } from "../../data/hooks/mutation/createTodo";
import { useGetAllTodos } from "../../data/hooks/query/getAllTodos";
import { TodoModel } from "../../data/entities/todo";
import { ScrollView } from "react-native-gesture-handler";

export default function TabOneScreen() {
  const [todo, setTodo] = useState("");
  const { mutate: createTodo, isLoading: isCreateTodoLoading } =
    useCreateTodo();
  const { data: todos, isLoading: isGetTodosLoading } = useGetAllTodos();

  const handleCreateTodo = () => {
    createTodo({ text: todo });
    setTodo("");
  };

  return (
    <View className="flex justify-center px-4">
      <Text className="text-xl my-4 text-gray-300">Welcome to orm page</Text>
      <TextInput
        placeholder="E.g Go for Grocery Shopping"
        value={todo}
        onChangeText={setTodo}
        className="mb-3 rounded-md divide-solid px-4 py-2 border-[2px] border-red-300"
      />
      <Button
        onPress={handleCreateTodo}
        title="Create Todo"
        color="#841584"
        disabled={isCreateTodoLoading}
        accessibilityLabel="Create Todo"
      />

      <ScrollView className="my-2">
        <Text className="text-xl font-bold">Todos</Text>
        {isGetTodosLoading ? <ActivityIndicator /> : null}
        {todos?.map((todo) => (
          <TodoItem todo={todo} key={todo.id} />
        ))}
      </ScrollView>
    </View>
  );
}

interface TodoItemProps {
  todo: TodoModel;
}

function TodoItem(data: TodoItemProps) {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      <EditTodoModal
        todo={data.todo}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <Pressable
        onPress={() => setModalVisible(!modalVisible)}
        className="bg-gray-300 my-2 rounded-md p-4 flex justify-between flex-row"
      >
        <Text>{data.todo.text}</Text>
        <Text
          className={`rounded-md px-2 py-1 ${
            data.todo.is_toggled ? "bg-green-300" : "bg-red-300"
          }`}
        >
          {data.todo.is_toggled ? "Completed" : "Not complete"}
        </Text>
      </Pressable>
    </View>
  );
}

interface EditTodoModalProps {
  todo: TodoModel;
  modalVisible: boolean;
  setModalVisible: (state: boolean) => void;
}

function EditTodoModal({
  modalVisible,
  setModalVisible,
  todo,
}: EditTodoModalProps) {
  return (
    <Modal
      animationType="slide"
      visible={modalVisible}
      presentationStyle="pageSheet"
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View>
        <Pressable onPress={() => setModalVisible(!modalVisible)}>
          <Text>Hide Modal</Text>
        </Pressable>
      </View>
    </Modal>
  );
}
