<template>
  <ul v-show="taskCount > 0" class="shadow-2xl p-4 grid grid-flow-col-1 gap-2">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="border border-gray-200 rounded shadow-md"
    >
      <div class="p-2 flex justify-between gap-2 flex-wrap">
        <!-- <div
          class="text-center bg-violet-950 rounded-md p-2 text-white text-sm font-medium"
        >
          <p>May 25</p>
          <p>2022</p>
        </div> -->
        <div class="flex gap-3">
          <input
            type="checkbox"
            class="form-checkbox w-5 h-5 text-blue-500 mt-1.5"
            v-model="task.checked"
          />
          <div class="flex flex-col-reverse gap-2">
            <div
              class="rounded-full text-white px-4 py-1 flex items-center gap-2"
              :class="{
                'bg-green-600': task.status === 'done',
                'bg-yellow-400': task.status === 'prioritize',
                'bg-red-700':
                  task.status !== 'done' && task.status !== 'prioritize',
              }"
            >
              <i
                class="text-xl"
                :class="
                  task.status === 'done'
                    ? 'bi bi-check-lg'
                    : task.status === 'prioritize'
                    ? 'bi bi-exclamation-triangle-fill'
                    : 'bi bi-clock-history'
                "
              ></i>
              {{
                task.status === "done"
                  ? "Done"
                  : task.status === "prioritize"
                  ? "Prioritize"
                  : "Pending"
              }}
            </div>
            <h3 class="text-lg font-bold text-gray-800">{{ task.title }}</h3>
          </div>
        </div>
        <div class="flex items-center space-x-2">
          <button
            class="px-4 py-2 text-md text-white text font-medium bg-orange-500 rounded hover:bg-orange-600"
          >
            <i class="bi bi-card-text"></i> View Details
          </button>
          <button
            class="px-4 py-2 text-md text-white text font-medium bg-yellow-400 rounded hover:bg-yellow-500"
          >
            <i class="bi bi-pencil-square"></i> Update
          </button>
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
  },
  methods: {
    addTask(task) {
      task.id = this.tasks.length + 1;
      this.tasks.push(task);
    },
    deleteTask() {
      this.tasks = this.tasks.filter((task) => !task.checked);
    },
  },
};
</script>
