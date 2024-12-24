import AsyncStorage from "@react-native-async-storage/async-storage";
import { Task } from "../types/types";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

export const saveTask = async (taskData: Omit<Task, 'id' | 'status'>): Promise<void> => {
    try {
        const newTask: Task = {
            id: uuidv4(),
            status: 'Pending',
            ...taskData,
        }

        const tasks = await AsyncStorage.getItem("tasks");
        const parsedTasks = tasks ? JSON.parse(tasks) : [];
        const updatedTasks = [...parsedTasks, newTask];
        await AsyncStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }  catch (error) {
      console.error("Error saving task:", error);
    } 
  }

  export const loadTasks = async () => {
    try {
        const tasks = await AsyncStorage.getItem("tasks");
        return tasks ? JSON.parse(tasks) : []; 
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  }