<template>
  <WebHeader />
  <div class="container mx-auto p-2.5">
    <div class="w-full flex justify-end gap-2 text-md font-medium">
      <button
        v-on:click="toggleForm"
        class="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        <i class="bi bi-plus-circle"></i> Add
      </button>
      <button
        class="px-4 py-2 text-white bg-green-600 rounded hover:bg-green-700"
      >
        <i class="bi bi-check-circle"></i>
        Done
      </button>
      <button
        class="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
        v-on:click="handleTaskDelete"
      >
        <i class="bi bi-x-circle"></i>
        Delete
      </button>
    </div>
    <TaskList ref="taskList" />
  </div>
  <TaskForm @taskAdded="handleTaskAdded" ref="taskForm" />
</template>

<script>
import TaskForm from "../components/TaskForm.vue";

export default {
  components: { TaskForm },
  methods: {
    toggleForm() {
      this.$refs.taskForm.formType = "Add";
      this.$refs.taskForm.toggleForm();
    },
    handleTaskAdded(task) {
      this.$refs.taskList.addTask(task);
    },
    handleTaskDelete() {
      this.$refs.taskList.deleteTask();
    },
  },
};
</script>
