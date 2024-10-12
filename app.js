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
  mounted() {
    const todos = JSON.parse(localStorage.getItem(STORAGE_NAME))
    this.todos = todos;
  },
  methods: {
    addTask() {
      if (this.task != "") {
        const t = { id: crypto.randomUUID(), task: this.task }
        // console.log(t);

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