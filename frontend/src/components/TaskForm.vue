<template>
  <v-form @submit.prevent="submitTask">
    <v-text-field v-model="task.title" label="Title" required></v-text-field>
    <v-textarea v-model="task.description" label="Description"></v-textarea>
    <v-checkbox v-model="task.status" label="Completed"></v-checkbox>
    <v-btn type="submit" color="primary">{{ editMode ? 'Update Task' : 'Add Task' }}</v-btn>
  </v-form>
</template>

<script>
import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  name: "TaskForm",
  props: {
    editMode: {
      type: Boolean,
      default: false,
    },
    initialTask: {
      type: Object,
      default: () => ({ title: "", description: "", status: false }),
    },
  },
  data() {
    return {
      task: { ...this.initialTask },
    };
  },
  methods: {
    async submitTask() {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      if (this.editMode) {
        await axios.put(`${API_BASE_URL}/tasks/${this.task.id}`, this.task, { headers });
      } else {
        await axios.post(`${API_BASE_URL}/tasks`, this.task, { headers });
      }

      this.$emit("taskSubmitted");
    },
  },
};
</script>
