import { NavLink } from "react-router-dom"

function Navbar() {
    return (
        <div className="continer max-[640px]:px-3 relative">
            <div className="flex items-center justify-between h-20 border-b-2 border-gray-400 px-4 mb-4">
                <div className="logo text-3xl cursor-pointer font-semibold">
                    Login Oyna
                </div>
                <div>
                    <nav className="flex items-center justify-between gap-8 text-2xl font-normal ">
                        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-500'} to={'/'}>Home</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-500'} to={'/login'}>Login</NavLink>
                        <NavLink className={({ isActive }) => isActive ? 'text-blue-500 font-bold' : 'text-gray-500'} to={'/register'}>Register</NavLink>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Navbar