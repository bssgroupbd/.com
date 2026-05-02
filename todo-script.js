// Todo Application with Local Storage
class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.editingId = null;

        // DOM Elements
        this.todoInput = document.getElementById('todoInput');
        this.categorySelect = document.getElementById('categorySelect');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.emptyState = document.getElementById('emptyState');
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.modal = document.getElementById('editModal');
        this.editInput = document.getElementById('editInput');
        this.editCategorySelect = document.getElementById('editCategorySelect');
        this.editDueDate = document.getElementById('editDueDate');
        this.saveEditBtn = document.getElementById('saveEditBtn');
        this.cancelEditBtn = document.getElementById('cancelEditBtn');
        this.modalClose = document.querySelector('.modal-close');

        this.init();
    }

    init() {
        this.loadFromStorage();
        this.attachEventListeners();
        this.render();
        this.updateStats();
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setFilter(e.target.closest('.filter-btn')));
        });

        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());

        this.saveEditBtn.addEventListener('click', () => this.saveEdit());
        this.cancelEditBtn.addEventListener('click', () => this.closeModal());
        this.modalClose.addEventListener('click', () => this.closeModal());

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        const category = this.categorySelect.value;

        if (text === '') {
            this.showError('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            category: category,
            completed: false,
            dueDate: '',
            createdAt: new Date().toISOString()
        };

        this.todos.unshift(todo);
        this.todoInput.value = '';
        this.categorySelect.value = 'general';
        this.saveToStorage();
        this.render();
        this.updateStats();
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
        this.saveToStorage();
        this.render();
        this.updateStats();
    }

    openEditModal(id) {
        const todo = this.todos.find(t => t.id === id);
        if (!todo) return;

        this.editingId = id;
        this.editInput.value = todo.text;
        this.editCategorySelect.value = todo.category;
        this.editDueDate.value = todo.dueDate || '';
        this.modal.classList.add('show');
        this.editInput.focus();
    }

    saveEdit() {
        const todo = this.todos.find(t => t.id === this.editingId);
        if (!todo) return;

        const newText = this.editInput.value.trim();
        if (newText === '') {
            this.showError('Task cannot be empty!');
            return;
        }

        todo.text = newText;
        todo.category = this.editCategorySelect.value;
        todo.dueDate = this.editDueDate.value;

        this.saveToStorage();
        this.render();
        this.closeModal();
        this.updateStats();
    }

    closeModal() {
        this.modal.classList.remove('show');
        this.editingId = null;
    }

    setFilter(btn) {
        this.filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.render();
    }

    clearCompleted() {
        if (confirm('Are you sure you want to delete all completed tasks?')) {
            this.todos = this.todos.filter(t => !t.completed);
            this.saveToStorage();
            this.render();
            this.updateStats();
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.completed);
            case 'completed':
                return this.todos.filter(t => t.completed);
            default:
                return this.todos;
        }
    }

    render() {
        const filteredTodos = this.getFilteredTodos();

        if (filteredTodos.length === 0) {
            this.todoList.innerHTML = '';
            this.emptyState.classList.add('show');
            return;
        }

        this.emptyState.classList.remove('show');
        this.todoList.innerHTML = filteredTodos.map(todo => this.createTodoElement(todo)).join('');

        // Attach event listeners to rendered elements
        this.todoList.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                this.toggleTodo(parseInt(checkbox.dataset.id));
            });
        });

        this.todoList.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.openEditModal(parseInt(btn.dataset.id));
            });
        });

        this.todoList.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                if (confirm('Delete this task?')) {
                    this.deleteTodo(parseInt(btn.dataset.id));
                }
            });
        });
    }

    createTodoElement(todo) {
        const dueDateStr = todo.dueDate ? new Date(todo.dueDate).toLocaleDateString() : '';
        const dueDateHtml = dueDateStr ? `<div class="todo-duedate"><i class="fas fa-calendar"></i>${dueDateStr}</div>` : '';

        return `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <input 
                    type="checkbox" 
                    class="todo-checkbox" 
                    data-id="${todo.id}" 
                    ${todo.completed ? 'checked' : ''}
                >
                <div class="todo-content">
                    <div class="todo-text">${this.escapeHtml(todo.text)}</div>
                    <div class="todo-meta">
                        <span class="todo-category ${todo.category}">${todo.category}</span>
                        ${dueDateHtml}
                    </div>
                </div>
                <div class="todo-actions">
                    <button class="action-btn edit-btn" data-id="${todo.id}" title="Edit task">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" data-id="${todo.id}" title="Delete task">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            </div>
        `;
    }

    updateStats() {
        const total = this.todos.length;
        const completed = this.todos.filter(t => t.completed).length;
        const remaining = total - completed;
        const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

        document.getElementById('totalStats').textContent = total;
        document.getElementById('completedStats').textContent = completed;
        document.getElementById('remainingStats').textContent = remaining;
        document.getElementById('progressStats').textContent = `${progress}%`;
    }

    saveToStorage() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    loadFromStorage() {
        const stored = localStorage.getItem('todos');
        this.todos = stored ? JSON.parse(stored) : [];
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showError(message) {
        alert(message);
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});