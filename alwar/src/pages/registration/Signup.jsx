import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";

const Signup = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        role: "user"
    });

    /**========================================================================
     *                          User Signup Function 
    *========================================================================**/
    const userSignupFunction = async () => {
        // validation 
        if (userSignup.name === "" || userSignup.email === "" || userSignup.password === "") {
            toast.error("All Fields are required");
            return;
        }

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            };

            // create user reference
            const userReference = collection(fireDB, "user");

            // Add User Detail
            await addDoc(userReference, user);

            setUserSignup({
                name: "",
                email: "",
                password: ""
            });

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setLoading(false);
            toast.error("Error occurred during signup");
        }
    };

    return (
        <div className='flex justify-center items-center h-screen bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300'>
            {loading && <Loader />}

            {/* Signup Form */}
            <div className="login_Form bg-white p-8 rounded-xl shadow-xl max-w-sm w-full">
                {/* Top Heading */}
                <div className="mb-5 text-center">
                    <h2 className='text-3xl font-bold text-teal-500'>
                        Sign Up
                    </h2>
                </div>

                {/* Input Fields */}
                <div className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <input
                            type="text"
                            placeholder='Full Name'
                            value={userSignup.name}
                            onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
                            className='bg-teal-50 border border-teal-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500'
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <input
                            type="email"
                            placeholder='Email Address'
                            value={userSignup.email}
                            onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
                            className='bg-teal-50 border border-teal-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500'
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <input
                            type="password"
                            placeholder='Password'
                            value={userSignup.password}
                            onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
                            className='bg-teal-50 border border-teal-300 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder:text-gray-500'
                        />
                    </div>

                    {/* Signup Button */}
                    <div>
                        <button
                            type='button'
                            onClick={userSignupFunction}
                            className='w-full bg-teal-500 hover:bg-teal-600 text-white py-2 font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500'
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Already have an account? Login Link */}
                <div className="mt-4 text-center">
                    <p className='text-gray-700'>
                        Already have an account? 
                        <Link to="/login" className='text-teal-500 font-semibold'> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;
