import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CreateTaskModal = ({ onSave, onClose }) => {
    const [newTaskData, setNewTaskData] = useState({
        title: "",
        assignee: "",
        status: "Open",
        timeSpent: "",
        tags: [],
        dueDate: "",
        createdAt: new Date().toISOString().split('T')[0],
    });

    const [newTag, setNewTag] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewTaskData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !newTaskData.tags.includes(newTag)) {
            setNewTaskData((prevData) => ({
                ...prevData,
                tags: [...prevData.tags, newTag.trim()],
            }));
            setNewTag("");
        }
    };

    const handleCreate = () => {
        const { title, assignee, dueDate, timeSpent } = newTaskData;
        if (!title || !assignee || !dueDate || timeSpent === "") {
            toast.warning("All fields are required!");
            return;
        }
        onSave(newTaskData);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-2 md:mx-0">
                <h2 className="text-lg font-bold mb-4">Create New Task</h2>

                <input
                    type="text"
                    name="title"
                    value={newTaskData.title}
                    onChange={handleInputChange}
                    placeholder="Title"
                    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md"
                />

                <input
                    type="text"
                    name="assignee"
                    value={newTaskData.assignee}
                    onChange={handleInputChange}
                    placeholder="Assignee"
                    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md"
                />

                <input
                    type="date"
                    name="dueDate"
                    value={newTaskData.dueDate}
                    onChange={handleInputChange}
                    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md"
                />

                <select
                    name="status"
                    value={newTaskData.status}
                    onChange={handleInputChange}
                    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md"
                >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                </select>

                <input
                    type="number"
                    name="timeSpent"
                    value={newTaskData.timeSpent}
                    onChange={handleInputChange}
                    placeholder="Time Spent (hrs)"
                    className="w-full mb-3 px-3 py-2 border border-gray-300 rounded-md"
                />

                <div className="mb-3">
                    <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add tag"
                        className="w-full mb-2 px-3 py-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleAddTag}
                        className="px-3 py-1 bg-blue-500 text-white rounded-md"
                    >
                        Add Tag
                    </button>

                    <div className="flex gap-2 mt-2">
                        {newTaskData.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-md"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="px-4 py-2 mr-2 bg-gray-300 rounded-md">
                        Cancel
                    </button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Create Task
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateTaskModal;
