import { createApp } from 'vue'
import App from './App.vue'
import './assets/tailwind.css'
import router from './router'
import TaskList from './components/TaskList.vue';
import WebHeader from './components/WebHeader.vue';

createApp(App).component('TaskList', TaskList).component('WebHeader', WebHeader).use(router).mount('#app');