import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function AuthPage() {
  const { login, signup } = useAuth();
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const submit = async (e) => { e.preventDefault(); isSignup ? await signup(form.name, form.email, form.password) : await login(form.email, form.password); };
  return <div className='min-h-screen grid place-items-center text-white'>
    <form onSubmit={submit} className='bg-slate-800 p-6 rounded w-80 space-y-3'>
      <h1 className='font-bold text-xl'>Community Connect</h1>
      {isSignup && <input className='w-full p-2 bg-slate-700 rounded' placeholder='Name' onChange={(e)=>setForm({...form,name:e.target.value})}/>}
      <input className='w-full p-2 bg-slate-700 rounded' placeholder='Email' onChange={(e)=>setForm({...form,email:e.target.value})}/>
      <input className='w-full p-2 bg-slate-700 rounded' type='password' placeholder='Password' onChange={(e)=>setForm({...form,password:e.target.value})}/>
      <button className='w-full bg-indigo-600 p-2 rounded'>{isSignup?'Sign up':'Login'}</button>
      <button type='button' onClick={()=>setIsSignup(!isSignup)} className='text-indigo-300 text-sm'>{isSignup?'Have an account? Login':'No account? Sign up'}</button>
    </form>
  </div>;
}
