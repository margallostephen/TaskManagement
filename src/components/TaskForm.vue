<template>
  <div
    v-if="formOpen"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 md:py-10 z-10"
  >
    <div class="bg-white p-8 w-full h-full sm:w-3/4 sm:h-auto overflow-y-auto">
      <div class="flex justify-between">
        <h2 class="text-2xl font-bold">{{ this.formType }} Task</h2>
        <button
          @click="toggleForm"
          class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold h-fit py-2 px-4 rounded transition-transform duration-300 hover:scale-105"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <form @submit.prevent="addTask">
        <div class="my-5">
          <label class="block text-lg font-bold mb-2" for="title">
            Task Title
          </label>
          <input
            class="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:outline-blue-600"
            v-model="title"
            type="text"
          />
        </div>
        <div class="mb-4">
          <label class="block text-lg font-bold mb-2" for="description">
            Task Description
          </label>
          <textarea
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline-blue-600"
            v-model="description"
            rows="5"
          ></textarea>
        </div>
        <div class="mb-4">
          <label class="block text-lg font-bold mb-2"> Task Status </label>
          <div class="flex gap-5 flex-wrap">
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio w-5 h-5 text-blue-500"
                v-model="status"
                value="pending"
                checked
              />
              <span class="ml-2">Pending</span>
            </label>
            <label class="inline-flex items-center">
              <input
                type="radio"
                class="form-radio w-5 h-5 text-yellow-500"
                v-model="status"
                value="prioritize"
              />
              <span class="ml-2">Prioritize</span>
            </label>
          </div>
        </div>
        <div class="flex items-center justify-end">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add
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
      formType: "",
      formOpen: false,
      title: "",
      description: "",
      status: "pending",
    };
  },
  computed: {},
  emits: ["taskAdded"],
  methods: {
    toggleForm() {
      this.formOpen = !this.formOpen;
    },
    addTask() {
      this.$emit("taskAdded", {
        title: this.title,
        description: this.description,
        status: this.status,
      });

      this.title = "";
      this.description = "";
      this.status = "pending";

      this.toggleForm();
    },
  },
};
</script>
