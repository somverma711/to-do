import { useEffect, useState } from "react";
import "./App.css";
import Task from "./components/Task";
import TaskForm from "./components/TaskForm";

function App() {
  const [task, setTask] = useState([]);
  useEffect(() => {
    if (task.length === 0) return;
    localStorage.setItem("task", JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    const tasks = JSON.parse(localStorage.getItem("task"));
    if (tasks) {
      setTask(tasks);
    }
  }, []);
  function addTask(name) {
    setTask((prev) => {
      return [...prev, { name: name, done: false }];
    });
  }

  function removeTask(indexToRemove) {
    setTask((prev) => {
      return prev.filter((taskObject, index) => index !== indexToRemove);
    });
  }

  function updateTaskDone(taskIndex, newDone) {
    setTask((prev) => {
      const newTasks = [...prev];
      newTasks[taskIndex].done = newDone;
      return newTasks;
    });
  }

  const numberComplete = task.filter((t) => t.done).length;
  const numberTotal = task.length;

  function getMessage() {
    const percentage = (numberComplete / numberTotal) * 100;
    if (percentage === 0) {
      return "Try to do one at least 🙏";
    }
    if (percentage === 100) {
      return "Nice job for today 🍻";
    }
    if (numberTotal === 0) {
      return "Add some Tasks✍️";
    }

    return "Keep at going 💪";
  }

  function renameTask(index, newName) {
    setTask((prev) => {
      const newTasks = [...prev];
      newTasks[index].name = newName;
      return newTasks;
    });
  }

  return (
    <main>
      <div className="main-content">
        <h1>
          {numberComplete}/{numberTotal} Complete
        </h1>
        <h2>{getMessage()}</h2>

        <TaskForm onAdd={addTask} />
        <div className="Task-content">
          {task.map((task, index) => (
            <Task
              {...task}
              onRename={(newName) => renameTask(index, newName)}
              onTrash={() => removeTask(index)}
              onToggle={(done) => updateTaskDone(index, done)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
