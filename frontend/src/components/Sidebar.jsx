export default function Sidebar({ communities, onSelect, darkMode, setDarkMode }) {
  return <aside className='w-64 bg-slate-800 p-4 border-r border-slate-700'>
    <div className='flex justify-between'><h2 className='font-bold text-lg'>Communities</h2><button onClick={()=>setDarkMode(!darkMode)} className='text-xs bg-slate-700 px-2 rounded'>{darkMode?'Light':'Dark'}</button></div>
    <div className='mt-3 space-y-2'>{communities.map(c=><button key={c._id} onClick={()=>onSelect(c)} className='w-full text-left p-2 rounded bg-slate-700 hover:bg-slate-600'>{c.name}</button>)}</div>
  </aside>;
}
