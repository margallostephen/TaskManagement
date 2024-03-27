<template>
  <ul
    v-show="taskCount > 0"
    class="shadow-2xl p-4 grid grid-flow-col-1 gap-6 mt-4"
  >
    <li
      v-for="task in tasks"
      :key="task.id"
      class="bg-white rounded-lg shadow-xl overflow-hidden"
    >
      <div class="px-6 py-4 flex justify-between items-center flex-wrap gap-4">
        <div class="flex flex-col">
          <div class="flex items-center mb-2">
            <input
              type="checkbox"
              class="form-checkbox text-blue-500 h-4 w-4 mr-2"
              v-model="task.checked"
              v-show="task.status !== 'done'"
            />
            <h3 class="text-lg font-bold text-gray-800">{{ task.title }}</h3>
          </div>
          <div class="flex items-center">
            <div
              class="rounded-full py-1 px-3 flex items-center text-sm font-semibold text-white"
              :class="{
                'bg-green-500': task.status === 'done',
                'bg-yellow-500': task.status === 'prioritize',
                'bg-red-500':
                  task.status !== 'done' && task.status !== 'prioritize',
              }"
            >
              <i
                :class="{
                  'bi bi-check-lg': task.status === 'done',
                  'bi bi-exclamation-triangle-fill':
                    task.status === 'prioritize',
                  'bi bi-clock-history':
                    task.status !== 'done' && task.status !== 'prioritize',
                }"
              ></i>
              <span class="ml-2">{{
                task.status === "done"
                  ? "Done"
                  : task.status === "prioritize"
                  ? "Priority"
                  : "Pending"
              }}</span>
            </div>
          </div>
        </div>
        <div class="flex gap-4">
          <button
            class="px-4 py-2 text-sm font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
            v-show="task.status !== 'done'"
            @click="openUpdateForm(task)"
          >
            <i class="bi bi-pencil-square"></i> Update
          </button>
          <router-link
            :to="{
              name: 'DetailView',
              params: {
                done: task.done,
                title: task.title,
                status: task.status,
                created: task.created,
                description: task.description,
              },
            }"
          >
            <button
              class="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 transition duration-300 ease-in-out"
            >
              <i class="bi bi-card-text"></i> View Details
            </button>
          </router-link>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
  data() {
    return {
      tasks: [],
    };
  },
  computed: {
    taskCount() {
      return this.tasks.length;
    },
    completedTask() {
      return this.tasks.filter((task) => task.status === "done").length;
    },
  },
  methods: {
    handleData(task) {
      if (task.id == "") {
        task.id = this.tasks.length + 1;
        this.tasks.push(task);
      } else {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) Object.assign(this.tasks[index], task);
      }
    },
    deleteTask() {
      this.tasks = this.tasks.filter((task) => !task.checked);
    },
    openUpdateForm(task) {
      this.$emit("openUpdateForm", "Update", task);
    },
    doneTask() {
      this.tasks
        .filter((task) => task.checked)
        .forEach((task) => {
          task.status = "done";
          task.checked = false;
          task.done = new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        });
    },
  },
  watch: {
    taskCount(newCount) {
      this.$emit("taskCountChanged", newCount);
    },
    completedTask(completedCount) {
      this.$emit("completedCountChanged", completedCount);
    },
  },
};
</script>
