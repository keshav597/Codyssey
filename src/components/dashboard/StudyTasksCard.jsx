import { useState, useEffect } from 'react';
import Card from '../common/Card';
import Button from '../common/Button';
import { CheckSquare, Square, Trash2, Plus, ListTodo } from 'lucide-react';

// Default starter study tasks aligned with front-end curriculum
const DEFAULT_TASKS = [
  { id: 'task-1', title: 'Review HTML5 semantic tags and accessibility rules', completed: true },
  { id: 'task-2', title: 'Practice CSS Flexbox and Grid layouts', completed: true },
  { id: 'task-3', title: 'Build interactive counter and product card UI in React', completed: false },
  { id: 'task-4', title: 'Test custom hooks and global state management with Zustand', completed: false },
];

export default function StudyTasksCard() {
  // This state is used to store the list of study tasks
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem('codyssey_study_tasks');
      return saved ? JSON.parse(saved) : DEFAULT_TASKS;
    } catch {
      return DEFAULT_TASKS;
    }
  });

  // This state is used for the new task input text
  const [taskInput, setTaskInput] = useState('');
  // This state is used for filtering tasks (all, pending, completed)
  const [filter, setFilter] = useState('all');

  // This effect is used to persist tasks to browser localStorage using JSON
  useEffect(() => {
    try {
      localStorage.setItem('codyssey_study_tasks', JSON.stringify(tasks));
    } catch (err) {
      console.warn('Failed to save study tasks to localStorage', err);
    }
  }, [tasks]);

  // This function is used to add a new study task to the list
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskInput.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      title: taskInput.trim(),
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setTaskInput('');
  };

  // This function is used to toggle a task between completed and pending
  const handleToggleTask = (taskId) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  };

  // This function is used to delete a task from the list
  const handleDeleteTask = (taskId) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // This function is used to filter tasks based on the active tab
  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <Card className="dash-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <ListTodo size={18} color="#059669" />
          <h3 style={{ fontSize: 16 }}>Study Tasks Checklist</h3>
        </div>
        <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>
          {completedCount} of {tasks.length} done
        </span>
      </div>

      <p className="text-secondary" style={{ fontSize: 13, marginBottom: 14 }}>
        Interactive to-do list with browser localStorage persistence for daily study milestones.
      </p>

      {/* Task input form */}
      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
        <input
          type="text"
          placeholder="Add a new engineering study task..."
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid #cbd5e1',
            fontSize: 13,
            outline: 'none',
          }}
        />
        <Button size="sm" type="submit" disabled={!taskInput.trim()} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <Plus size={14} /> Add
        </Button>
      </form>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {['all', 'pending', 'completed'].map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 500,
              textTransform: 'capitalize',
              border: 'none',
              cursor: 'pointer',
              background: filter === f ? '#059669' : '#f1f5f9',
              color: filter === f ? '#ffffff' : '#64748b',
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task items list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 220, overflowY: 'auto' }}>
        {filteredTasks.length === 0 ? (
          <p style={{ fontSize: 13, color: '#94a3b8', fontStyle: 'italic', padding: '10px 0' }}>
            No {filter} tasks. Keep up the good work!
          </p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 10px',
                borderRadius: 8,
                background: task.completed ? '#f8fafc' : '#ffffff',
                border: '1px solid #e2e8f0',
                transition: 'all 0.15s ease',
              }}
            >
              <div
                onClick={() => handleToggleTask(task.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  cursor: 'pointer',
                  flex: 1,
                }}
              >
                {task.completed ? (
                  <CheckSquare size={17} color="#059669" />
                ) : (
                  <Square size={17} color="#94a3b8" />
                )}
                <span
                  style={{
                    fontSize: 13,
                    color: task.completed ? '#94a3b8' : '#1e293b',
                    textDecoration: task.completed ? 'line-through' : 'none',
                  }}
                >
                  {task.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => handleDeleteTask(task.id)}
                title="Delete task"
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  padding: 4,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}
