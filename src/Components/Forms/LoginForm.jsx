import { useDispatch } from 'react-redux';
import { setUserEmail } from '../../Store/UserSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState } from 'react';

export default function LoginForm() {
    const [formData, setFormData] = useState({ userName: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            if (!formData.userName || !formData.password) {
                toast.warning("All fields are required");
                setLoading(false);
            } else if (formData.userName !== "user@gmail.com" || formData.password !== "pass@123") {
                toast.error("Enter correct credentials");
                setLoading(false);
            } else {
                toast.success('Login Successful !!');
                dispatch(setUserEmail(formData.userName));
                setLoading(false);
                navigate('/home');
            }
        }, 1500);
    };


    return (
        <div className='w-full flex justify-center items-center h-screen bg-gray-100'>
            <form onSubmit={handleSubmit} className="bg-white p-5 md:p-8 w-[90%] max-w-md rounded-lg shadow-lg">
                <h2 className="text-3xl font-semibold text-center mb-2 text-blue-600">Login</h2>
                <p className="text-sm text-gray-500 text-center mb-6">
                    Test ID: <span className="font-semibold">user@gmail.com</span> | Password: <span className="font-semibold">pass@123</span>
                </p>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Enter your username"
                        id="userName"
                        value={formData.userName}
                        onChange={handleFormChange}
                        className="border border-gray-300 rounded-lg w-full p-3 focus:border-blue-500 focus:outline-none"
                    />
                </div>

                <div className="mb-6 flex items-center border border-gray-300 rounded-lg p-3 focus-within:border-blue-500">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        id="password"
                        value={formData.password}
                        onChange={handleFormChange}
                        className="w-full focus:outline-none"
                    />
                    <span
                        className="text-xl cursor-pointer ml-2"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? '🫣' : '😌'}
                    </span>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-150"
                >

                    {loading ? (
                        <div className='flex gap-2 items-center justify-center font-semibold text-lg'>
                            <span>Loading</span>
                            <span
                                className={"loader"}></span>
                        </div>

                    ) : (
                        <span className='text-center font-semibold text-lg'>Login</span>
                    )}

                </button>

            </form>
        </div>
    );
}
