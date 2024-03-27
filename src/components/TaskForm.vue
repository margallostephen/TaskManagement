<template>
  <div
    v-if="formOpen"
    class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 md:py-10 z-10"
  >
    <div
      class="bg-white p-8 w-full h-full md:w-3/4 lg:h-fit lg:w-1/2 overflow-y-auto"
    >
      <div class="flex justify-between">
        <h2 class="text-2xl font-bold">{{ formType }} Task</h2>
        <button
          @click="toggleForm"
          class="bg-red-500 hover:bg-red-700 text-white text-sm font-bold h-fit py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
        >
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <form @submit.prevent="fetchData">
        <div class="my-5">
          <label class="block text-lg font-bold mb-2" for="title">
            Task Title
          </label>
          <input
            class="shadow appearance-none border rounded-lg w-full p-3 text-gray-700 leading-tight focus:outline-blue-600"
            v-model="title"
            type="text"
          />
        </div>
        <div class="mb-4">
          <label class="block text-lg font-bold mb-2" for="description">
            Task Description
          </label>
          <textarea
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-600"
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
            :class="[
              'bg-' + (formType == 'Add' ? 'blue-500' : 'yellow-400'),
              'hover:bg-' + (formType == 'Add' ? 'blue-700' : 'yellow-500'),
            ]"
            class="text-white font-bold py-2 px-4 rounded-lg transition-transform duration-300 hover:scale-105"
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
