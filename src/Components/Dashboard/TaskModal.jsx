import React from 'react';

const TaskModal = ({ selectedRow, setSelectedRow, onSave, onClose, onDelete }) => {
    const handleChange = (e) => {
        setSelectedRow({
            ...selectedRow,
            [e.target.name]: e.target.value,
        });
    };

    const handleStatusChange = () => {
        setSelectedRow((prev) => ({ ...prev, status: "Completed" }));
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-3 md:p-6 rounded-lg shadow-lg w-full mx-2 md:mx-0 max-w-md">
                <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={selectedRow.title}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Assignee</label>
                        <input
                            type="text"
                            name="assignee"
                            value={selectedRow.assignee}
                            onChange={handleChange}
                            className="mt-1 p-2 w-full border rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Status</label>
                        <input
                            type="text"
                            name="status"
                            value={selectedRow.status}
                            readOnly
                            className="mt-1 p-2 w-full border rounded bg-gray-100"
                        />
                    </div>
                    <button
                        onClick={handleStatusChange}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Mark as Completed
                    </button>
                </div>

                <div className="mt-4 flex justify-between md:justify-end">
                    <button
                        onClick={onSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
                    >
                        Save Changes
                    </button>
                    <button
                        onClick={onDelete}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
                    >
                        Delete Task
                    </button>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
