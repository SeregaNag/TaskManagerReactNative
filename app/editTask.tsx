import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Task } from "@/types/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export default function EditTask() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{id: string}>();

    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const storedTask = await AsyncStorage.getItem("tasks");
                const tasks: Task[] = storedTask ? JSON.parse(storedTask) : [];
                const foundTask = tasks.find((t) => t.id === id);
                setTask(foundTask || null);
            } catch (error) {
             console.error("Error fetching task:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchTask()
    }, [id]);

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    if (!task) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Task not found</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{task.title}</Text>
            <Text style={styles.description}>{task.description}</Text>
            <Text style={styles.details}>Date: {task.date}</Text>
            <Text style={styles.details}>Location: {task.location}</Text>
            <Text style={styles.details}>Status: {task.status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
    },
    details: {
        fontSize: 14,
        marginBottom: 4,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
});