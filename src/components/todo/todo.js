import React, { useState, useEffect } from "react";
import axios from "axios";
import "./todo.css";

function Todo() {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [selectedPriority, setSelectedPriority] = useState("Low");
	const [selectedStatus, setSelectedStatus] = useState("Pending");
	const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = sessionStorage.getItem("token");
        const response = await axios.get("http://localhost:4000/api/todoList", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('bdjwbdeje',response?.data?.tasks)
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
  
    fetchTasks();
  }, []);
  


	const handleInputChange = (e) => {
		setInputValue(e.target.value);
	};

	const handleAddTask = async () => {
		if (inputValue.trim() !== "") {
			try {
				const token = sessionStorage.getItem("token");
				const response = await axios.post(
					"http://localhost:4000/api/createTodo",
					{
						task: inputValue,
						priority: selectedPriority,
						status: selectedStatus,
							},
					{
						headers: {
							"Content-Type": "application/json",
							Authorization: `Bearer ${token}`,
						},
					}
				);

				setTasks([...tasks, response.data.task]);
			} catch (error) {
				console.error("Error adding task:", error);
			}
			setInputValue("");
		}
	};

	const handleEditTask = async (taskId, taskPriority, taskStatus) => {
		const newText = prompt("Enter the updated task:");
		if (newText !== null) {
			try {
				const response = await axios.put(
					`http://localhost:8000/api/updateTask/${taskId}`,
					{
						text: newText,
						priority: taskPriority,
						status: taskStatus,
					}
				);
				const updatedTasks = tasks.map((task) =>
					task.id === taskId ? response.data.task : task
				);
				setTasks(updatedTasks);
			} catch (error) {
				console.error("Error updating task:", error);
			}
		}
	};

	const handleDeleteTask = async (taskId) => {
		if (window.confirm("Are you sure you want to delete this task?")) {
			try {
				await axios.delete(`http://localhost:8000/api/tasks/${taskId}`);
				const updatedTasks = tasks.filter((task) => task.id !== taskId);
				setTasks(updatedTasks);
			} catch (error) {
				console.error("Error deleting task:", error);
			}
		}
	};

	return (
		<div className="todo-container">
			<div className="todo-form">
				<input
					type="text"
					placeholder="Enter task..."
					value={inputValue}
					onChange={handleInputChange}
				/>
				<select
					value={selectedPriority}
					onChange={(e) => setSelectedPriority(e.target.value)}
				>
					<option value="Low">Low</option>
					<option value="Medium">Medium</option>
					<option value="High">High</option>
				</select>
				<select
					value={selectedStatus}
					onChange={(e) => setSelectedStatus(e.target.value)}
				>
					<option value="Pending">Pending</option>
					<option value="Complete">Complete</option>
				</select>
				<button onClick={handleAddTask}>
					{editId !== null ? "Update Task" : "Add Task"}
				</button>
			</div>
			<ul className="todo-list">
				{tasks?.map((task) => (
					<li key={task?.id}>
						<span>{task?.task}</span>
						<span>Priority: {task?.priority}</span>
						<span>Status: {task?.status}</span>
						<button
							onClick={() =>
								handleEditTask(task?.id, task?.priority, task?.status)
							}
						>
							Edit
						</button>
						<button onClick={() => handleDeleteTask(task.id)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Todo;
