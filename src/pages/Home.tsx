import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()
  return (
    <div>
      <h1 className="text-center pt-20 text-4xl text-gray-400">Ana qo'shdim</h1>
      <div className="w-full flex items-center justify-center mt-10 gap-10">
        <button onClick={() => navigate('/login')}  className="border px-10 py-5 hover:bg-blue-400 hover:text-white text-2xl rounded-lg">
          Login
        </button>
        <button onClick={() => navigate('/register')} className="border px-10 py-5 hover:bg-blue-400 hover:text-white text-2xl rounded-lg">
          Register
        </button>
      </div>
    </div>
  )
}

export default Home