<template>
  <div
    v-if="formOpen"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl w-full max-w-md p-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">{{ formType }} Task</h2>
        <button
          @click="toggleForm"
          class="text-gray-600 hover:text-gray-800 transition-colors duration-300 focus:outline-none"
        >
          <i class="bi bi-x-lg text-xl"></i>
        </button>
      </div>
      <form @submit.prevent="fetchData">
        <div class="mb-6">
          <label for="title" class="block text-lg font-bold mb-2"
            >Task Title</label
          >
          <input
            v-model="title"
            type="text"
            id="title"
            class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div class="mb-6">
          <label for="description" class="block text-lg font-bold mb-2"
            >Task Description</label
          >
          <textarea
            v-model="description"
            id="description"
            rows="5"
            class="border rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>
        <div class="mb-6">
          <label class="block text-lg font-bold mb-2">Task Status</label>
          <div class="flex gap-5">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-4 w-4"
                v-model="status"
                value="pending"
              />
              <span class="ml-2">Pending</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio h-4 w-4"
                v-model="status"
                value="prioritize"
              />
              <span class="ml-2">Prioritize</span>
            </label>
          </div>
        </div>
        <div class="flex justify-end">
          <button
            :class="[
              'btn',
              formType == 'Add'
                ? 'bg-blue-500 hover:bg-blue-600'
                : 'bg-yellow-400 hover:bg-yellow-500',
            ]"
            class="px-4 py-2 text-sm font-medium text-white rounded-lg transition duration-300 ease-in-out"
            type="submit"
          >
            {{ formType == "Add" ? "Add" : "Update" }}
          </button>
        </div>
      </form>
    </div>
  </div>

  <TaskList ref="TaskList" />
</template>

<script>
export default {
  data() {
    return {
      formOpen: false,
      formType: "",
      taskId: 0,
      title: "",
      description: "",
      status: "",
    };
  },
  emits: ["fetchData"],
  methods: {
    toggleForm() {
      this.formOpen = !this.formOpen;
    },
    fetchData() {
      if (!this.title.trim() || !this.description.trim()) {
        return;
      }

      this.$emit("fetchData", {
        id: this.formType == "Add" ? "" : this.taskId,
        title: this.title,
        description: this.description,
        status: this.status,
        created: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }),
        done: " ",
      });

      this.title = "";
      this.description = "";
      this.status = "";

      this.toggleForm();
    },
  },
};
</script>
