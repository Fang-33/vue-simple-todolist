const { createApp } = Vue

const STORAGE_NAME = 'todo-data'

// save to lacalstorage
function saveTodos(todos) {
  localStorage.setItem(STORAGE_NAME, JSON.stringify(todos))

}

const dataObject = {
  data() {
    return {
      task: "",
      todos: [],
    }
  },
  // 使用 mounted 時，初始化 todos 需要檢查： 在 mounted 中檢查是否有存在的 STORAGE_NAME，避免 this.todos 賦值為 null
  mounted() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_NAME)) || [];
    this.todos = todos;
  },
  methods: {
    addTask() {
      if (this.task != "") {
        const t = { id: crypto.randomUUID(), task: this.task };
        console.log(t);
        
        this.todos.unshift(t);
        this.task = "";

        saveTodos(this.todos);
      }
    },
    close(e) {
      const { id } = e.target.dataset;
      const idx = this.todos.findIndex((t) => t.id == id)
      if (idx != -1) {
        this.todos.splice(idx, 1)
        saveTodos(this.todos);
      }
    },
  }
}

createApp(dataObject).mount('.todo-app')