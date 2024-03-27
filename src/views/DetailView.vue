<template>
  <WebHeader />
  <div class="container mx-auto p-4">
    <TaskDetails
      :title="$route.params.title"
      :status="$route.params.status"
      :done="$route.params.done"
      :created="$route.params.created"
      :description="$route.params.description"
    />
  </div>
</template>

<script>
import TaskDetails from "../components/TaskDetails.vue";

export default {
  components: {
    TaskDetails,
  },
};
</script>
