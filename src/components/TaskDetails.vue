<template>
  <div class="bg-white shadow-lg rounded-lg overflow-hidden p-6">
    <h2 class="text-2xl font-bold mb-4">Task Details</h2>
    <hr class="mb-4 border-gray-300" />
    <div
      class="flex flex-col md:flex-row md:justify-between md:items-center gap-4 pb-4 md:pb-0"
    >
      <div
        class="rounded-md p-2 text-white text-sm font-medium h-fit w-fit flex items-center justify-center"
        :class="status !== 'done' ? 'bg-purple-600' : 'bg-green-700'"
      >
        <p v-if="status !== 'done'">Created on {{ created }}</p>
        <p v-if="status === 'done'">Marked as Done on {{ done }}</p>
      </div>
      <div
        class="rounded-full text-white flex items-center gap-2 px-4 py-1 text-sm font-semibold w-fit"
        :class="{
          'bg-green-600': status === 'done',
          'bg-yellow-400': status === 'prioritize',
          'bg-red-500': status !== 'done' && status !== 'prioritize',
        }"
      >
        <i
          :class="{
            'bi bi-check-lg': status === 'done',
            'bi bi-exclamation-triangle-fill': status === 'prioritize',
            'bi bi-clock-history': status !== 'done' && status !== 'prioritize',
          }"
        ></i>
        <span>{{
          status === "done"
            ? "Done"
            : status === "prioritize"
            ? "Priority"
            : "Pending"
        }}</span>
      </div>
    </div>
    <h3 class="text-xl font-semibold text-gray-900 mt-4 mb-2 break-words">
      {{ title }}
    </h3>
    <p class="text-gray-600 break-words">{{ description }}</p>
  </div>
</template>

<script>
export default {
  props: ["title", "status", "created", "done", "description"],
};
</script>
