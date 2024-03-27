<template>
  <WebHeader />
  <div class="container mx-auto p-4">
    <div
      class="w-full flex flex-col lg:flex-row justify-between items-center mb-4"
    >
      <div class="mb-4 lg:mb-0">
        <p class="text-lg font-semibold text-gray-800">
          Total Tasks: {{ taskCount }}
        </p>
        <p class="text-lg font-semibold text-gray-800">
          Completed Tasks:
          {{ completedCount }}
        </p>
      </div>
      <div class="flex gap-4 items-center">
        <button
          @click="toggleForm('Add')"
          class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
        >
          <i class="bi bi-plus-circle"></i> Add Task
        </button>
        <button
          v-if="taskCount > 0"
          @click="handleTaskDone"
          class="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-300"
        >
          <i class="bi bi-check-circle"></i> Mark Done
        </button>
        <button
          v-if="taskCount > 0"
          @click="handleTaskDelete"
          class="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          <i class="bi bi-x-circle"></i> Remove
        </button>
      </div>
    </div>
    <TaskList
      @taskCountChanged="handleTaskCountChanged"
      @completedCountChanged="handleCompletedTaskCount"
      @openUpdateForm="toggleForm"
      ref="taskList"
    />
  </div>
  <TaskForm @fetchData="handleFetchData" ref="taskForm" />
</template>

<script>
import TaskForm from "../components/TaskForm.vue";

export default {
  components: { TaskForm },
  data() {
    return {
      taskCount: 0,
      completedCount: 0,
    };
  },
  methods: {
    toggleForm(formType, task) {
      const { id, title, description, status } = task || {};
      this.$refs.taskForm.formType = formType;
      this.$refs.taskForm.taskId = formType == "Update" ? id : "";
      this.$refs.taskForm.title = formType == "Update" ? title : "";
      this.$refs.taskForm.description = formType == "Update" ? description : "";
      this.$refs.taskForm.status = formType == "Update" ? status : "pending";
      this.$refs.taskForm.toggleForm();
    },
    handleFetchData(task) {
      this.$refs.taskList.handleData(task);
    },
    handleTaskDone() {
      this.$refs.taskList.doneTask();
    },
    handleTaskDelete() {
      this.$refs.taskList.deleteTask();
    },
    handleTaskCountChanged(newCount) {
      this.taskCount = newCount;
    },
    handleCompletedTaskCount(completedCount) {
      this.completedCount = completedCount;
    },
  },
};
</script>
