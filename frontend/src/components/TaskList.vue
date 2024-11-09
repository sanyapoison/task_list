<template>
  <v-container>
    <v-row justify="space-between" align="center">
      <v-btn color="primary" @click="openTaskModal">Add Task</v-btn>
      <!-- Ваша кнопка добавлена слева -->
    </v-row>

    <!-- Модальное окно для добавления/редактирования задачи -->
    <v-dialog v-model="isTaskModalOpen" max-width="600px">
      <v-card>
        <v-card-title>{{ isEditMode ? "Edit Task" : "Add New Task" }}</v-card-title>
        <v-card-text>
          <v-form @submit.prevent="isEditMode ? updateTask() : addTask()">
            <v-text-field v-model="taskForm.title" label="Title" required></v-text-field>
            <v-textarea v-model="taskForm.description" label="Description"></v-textarea>
            <v-checkbox v-model="taskForm.status" label="Completed"></v-checkbox>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="isEditMode ? updateTask() : addTask()">Save</v-btn>
          <v-btn text @click="closeTaskModal">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Отображение списка задач -->
    <v-row>
      <v-col v-for="task in tasks" :key="task.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ task.title }}</v-card-title>
          <v-card-subtitle>Status: {{ task.status ? 'Completed' : 'Pending' }}</v-card-subtitle>
          <v-card-text>{{ task.description }}</v-card-text>
          <v-card-actions>
            <v-btn color="blue" @click="openTaskModal(task)">Edit</v-btn>
            <v-btn color="red" @click="deleteTask(task.id)">Delete</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-snackbar v-model="snackbar" color="red" timeout="3000" top right>
      {{ errorMessage }}
    </v-snackbar>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  data() {
    return {
      tasks: [],
      isTaskModalOpen: false,
      isEditMode: false,
      taskForm: { title: "", description: "", status: false },
      errorMessage: "",
      snackbar: false,
    };
  },
  computed: {
    ...mapState(["isAuthenticated"]),
  },
  methods: {
    async fetchTasks() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/tasks", {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.tasks = response.data;
      } catch (error) {
        this.errorMessage = "Failed to load tasks.";
        this.snackbar = true;
      }
    },
    async addTask() {
      try {
        const token = localStorage.getItem("token");
        await axios.post("http://localhost:5000/tasks", this.taskForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.closeTaskModal();
        this.fetchTasks();
      } catch (error) {
        this.errorMessage = "Failed to add task.";
        this.snackbar = true;
      }
    },
    openTaskModal(task = null) {
      this.isEditMode = !!task;
      this.taskForm = task ? { ...task } : { title: "", description: "", status: false };
      this.isTaskModalOpen = true;
    },
    closeTaskModal() {
      this.isTaskModalOpen = false;
    },
    async updateTask() {
      try {
        const token = localStorage.getItem("token");
        await axios.put(`http://localhost:5000/tasks/${this.taskForm.id}`, this.taskForm, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.closeTaskModal();
        this.fetchTasks();
      } catch (error) {
        this.errorMessage = "Failed to update task.";
        this.snackbar = true;
      }
    },
    async deleteTask(taskId) { // Проверка, что taskId передается
      if (typeof taskId !== 'number') {
        this.errorMessage = "Invalid task ID.";
        this.snackbar = true;
        return;
      }

      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:5000/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.fetchTasks();
      } catch (error) {
        this.errorMessage = "Failed to delete task.";
        this.snackbar = true;
      }
    },
  },
  mounted() {
    if (!this.isAuthenticated) this.$router.push("/login");

    this.fetchTasks();
  },
};
</script>