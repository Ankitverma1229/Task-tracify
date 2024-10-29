import React from 'react';
import TaskTableUI from '../Components/Dashboard/TaskTableUI';
import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <nav className='h-15 flex justify-between py-3 md:py-5 px-3 md:px-10 shadow-md items-center bg-blue-700'>
                <span className='font-semibold text-white font-mono text-2xl md:text-4xl cursor-pointer'>Task<i>T</i>rackify</span>
                <Link to='/' className='bg-red-700 text-white rounded px-3  md:px-5 py-2 text-xl font-medium hover:bg-red-800 transition duration-150 ease-in-out'>Logout</Link>
            </nav>
            <div className="p-4 md:p-8">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mt-5 ">Task/Bug List</h2>

                <TaskTableUI />
            </div>
        </div>
    );
};

export default Home;
