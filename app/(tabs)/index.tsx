import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { loadTasks } from "@/utils/utils";
import { Task } from "@/types/types";
import { FlatList } from "react-native";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const router = useRouter();

  useEffect(() => {
    loadTasks().then(setTasks)
  }, [tasks]);

  const handleTaskPress = (id: string) => {
    router.push(`/editTask?id=${id}`);
  }

  const renderTasks = ({ item }: { item: Task }) => {
    return(
    <TouchableOpacity style={styles.task} onPress={() => handleTaskPress(item.id)}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.subtitle}>{item.location}</Text>
      <Text>{item.description}</Text>
      <Text>{item.date}</Text>
      <Text>{item.status}</Text>
    </TouchableOpacity>
    )
  }

  return (
    <View style={styles.container}>
      <FlatList data={tasks} keyExtractor={(item, index) => index.toString()}  renderItem={renderTasks} />
      <Button title="Add New Task" onPress={() => router.push("/addTask")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  task: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
});
