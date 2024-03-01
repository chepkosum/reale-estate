import { Link, useNavigate} from 'react-router-dom'
import  { useState } from 'react'



const Signin = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
    

  const navigate = useNavigate() 
    
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
         setIsLoading(false);
        setError(data.message);
        return;
      }
      setIsLoading(false);
      setError(null)
      navigate('/')
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
    }
  };





  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold
      my-7'>Sign In</h1>
           {error && <p className='text-red-500 m-5'>{error}</p>}
      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input type="email" placeholder='Email' className='border p-3 rounded-lg '
          id='email' onChange={handleChange} />
        <input type="password" placeholder='Password' className='border p-3 rounded-lg '
          id='password' onChange={handleChange} />
        <button disabled={isLoading} className='bg-slate-700 text-white p-3
          rounded-lg uppercase hover:opacity-95
          disabled:opacity-80'>{isLoading ? 'Loading...' : 'Sign in'}
          </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account?</p>
        <Link to='/signup'>
          <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
    </div>
  );
}

export default Signin