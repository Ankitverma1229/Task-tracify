import React, { useState } from 'react'
import { useReactTable, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel } from '@tanstack/react-table';
import { ArrowUpDown, Captions, ChartSpline, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Hourglass, Plus, Search, Tag, TrendingDown, TrendingUp, User, UserCheckIcon } from 'lucide-react';
import mockData from "../../Assets/Data.json";
import TaskModal from './TaskModal';
import { toast } from 'react-toastify';
import CreateTaskModal from './CreateTaskModal';

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("id", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className='flex items-center'>
        <User className='mr-2' size={16} /> ID
      </span>
    ),
  }),
  columnHelper.accessor("assignee", {
    cell: (info) => info.getValue(),
    header: () => (
      <span className='flex items-center'>
        <UserCheckIcon className='mr-2' size={16} /> Assignee
      </span>
    ),
  }),

  columnHelper.accessor("title", {
    cell: (info) => {
      const title = info.getValue();
      return title.length > 20 ? `${title.slice(0, 20)}…` : title;
    },
    header: () => (
      <span className='flex items-center'>
        <Captions className='mr-2 ml-10' size={16} /> Title
      </span>
    ),
  }),

  columnHelper.accessor("createdAt", {
    cell: (info) => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString();
    },
    header: () => (
      <span className='flex items-center'>
        <TrendingUp className='mr-2' size={16} /> CreatedAt
      </span>
    ),
  }),

  columnHelper.accessor("dueDate", {
    cell: (info) => {
      const date = new Date(info.getValue());
      return date.toLocaleDateString();
    },
    header: () => (
      <span className='flex items-center'>
        <TrendingDown className='mr-2' size={16} /> DueDate
      </span>
    ),
  }),


  columnHelper.accessor("status", {
    cell: (info) => {
      const status = info.getValue();
      const statusColor = {
        "Open": "text-green-500",
        "Completed": "text-red-500",
        "In Progress": "text-orange-500"
      }[status] || "text-gray-500";

      return <span className={statusColor}>{status}</span>;
    },
    header: () => (
      <span className='flex items-center'>
        <ChartSpline className='mr-2' size={16} /> Status
      </span>
    ),
  }),


  columnHelper.accessor("timeSpent", {
    cell: (info) => {
      const timeSpent = info.getValue();
      return <span> {timeSpent} hrs</span>
    },
    header: () => (
      <span className='flex items-center'>
        <Hourglass className='mr-2' size={16} /> TimeSpent
      </span>
    ),
  }),

  columnHelper.accessor("tags", {
    cell: (info) => {
      const tags = info.getValue() || [];
      return (
        <div className="flex gap-2 max-w-[100%] overflow-x-auto no-scrollbar">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium text-white bg-blue-500 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      );
    },
    header: () => (
      <span className='flex items-center'>
        <Tag className='mr-2' size={16} /> Tags
      </span>
    ),
  }),

]

const TaskTableUI = () => {
  const [data, setData] = useState(mockData);
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const table = useReactTable({
    data,
    columns,
    state: { sorting, globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    initialState: { pagination: { pageSize: 5 } },
  });


  const handleRowClick = (row) => {
    setSelectedRow({ ...row.original });
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    setData((prevData) => prevData.map((item) => item.id === selectedRow.id ? selectedRow : item));
    setIsModalOpen(false);
    toast.success("Task updated successfully")
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = data.filter(task => task.id !== taskId);
    const reIndexedTasks = updatedTasks.map((task, index) => ({
      ...task,
      id: index + 1
    }));
    setData(reIndexedTasks);
    setIsModalOpen(false);
    toast.success("Task deleted successfully")
  };

  const createTask = (newTask) => {
    const newId = data.length > 0 ? Math.max(...data.map(task => task.id)) + 1 : 1;
    const newTaskData = {
      ...newTask,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    setData((prevData) => [...prevData, newTaskData]);
    setIsCreateModalOpen(false);
    toast.success("New task created successfully!");
  };

  return (
    <div className='flex flex-col min-h-screen min-w-[90%] mx-auto py-2 md:py-12  '>
      <div className=' relative'>
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder='Search...'
          className='w-full pl-10 pr-4 py-2 border border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
        />
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400' size={20} />

      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center w-fit my-3"
        onClick={() => setIsCreateModalOpen(true)}
      >
        <Plus className="mr-2" size={18} /> Create Task
      </button>
      <div className='overflow-x-auto no-scrollbar bg-white shadow-md rounded-lg'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            {
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className='px-4 py-3 text-xs text-center font-medium text-gray-500 uppercase tracking-wider'>
                      <div
                        {...{
                          className: header.column.getCanSort()
                            ? "cursor-pointer select-none flex items-center justify-center"
                            : "",
                          onClick: header.column.getToggleSortingHandler(),
                        }}>
                        {
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )
                        }
                        <ArrowUpDown className='ml-2' size={14} />
                      </div>
                    </th>
                  ))}

                </tr>
              ))
            }
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {
              table.getRowModel().rows.map((row) => (

                <tr key={row.id} className='hover:bg-gray-50 cursor-pointer' onClick={() => handleRowClick(row)}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            }
          </tbody>

        </table>

      </div>

      <div className='flex flex-col sm:flex-row justify-between items-center mt-10 md:mt-4 text-sm text-gray-700'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <span className='mr-2'>Items per page</span>
          <select
            className='border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2'
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[5, 10, 20, 30].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>

            ))}

          </select>
        </div>
        <div className='flex items-center space-x-2'>
          <button className='p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50'
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={20} />
          </button>

          <button className='p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={20} />
          </button>

          <span className='flex items-center'>
            <input
              min={1}
              max={table.getPageCount()}
              type='number'
              value={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className='w-16 p-2 rounded-md border border-gray-300 text-center'
            />
            <span className='ml-1'>of {table.getPageCount()}</span>

          </span>
          <button className='p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={20} />
          </button>

          <button className='p-2 rounded-md bg-gray-200 text-gray-600 hover:bg-gray-300 disabled:opacity-50'
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>

      {isModalOpen && selectedRow && (
        <TaskModal
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
          onSave={handleSaveChanges}
          onDelete={() => handleDeleteTask(selectedRow.id)}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isCreateModalOpen && (
        <CreateTaskModal
          onSave={createTask}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}
    </div>
  )
}

export default TaskTableUI