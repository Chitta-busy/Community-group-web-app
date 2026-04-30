import { useEffect, useMemo, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../lib/api';
import Sidebar from '../components/Sidebar';
import ChatPanel from '../components/ChatPanel';
import { useAuth } from '../context/AuthContext';

const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000');

export default function Dashboard() {
  const { user } = useAuth();
  const [communities, setCommunities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [posts, setPosts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [query, setQuery] = useState('');
  const [typing, setTypingState] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => { load(); socket.emit('register-user', user?._id); socket.on('new-message', (m)=>setMessages((p)=>[...p,m])); socket.on('typing', ()=>setTypingState(true)); return ()=>socket.off(); }, []);
  const load = async () => { const [c, p] = await Promise.all([api.get('/communities'), api.get('/posts')]); setCommunities(c.data); setPosts(p.data); };
  const openCommunity = async (c) => { setSelected(c); socket.emit('join-community', c._id); const { data } = await api.get('/messages', { params: { communityId: c._id } }); setMessages(data); };
  const sendMessage = (content) => socket.emit('send-message', { sender: user._id, community: selected._id, content, createdAt: new Date().toISOString(), tempId: crypto.randomUUID() });
  const setTyping = () => socket.emit('typing', { room: `community:${selected._id}` });
  const filteredPosts = useMemo(()=>posts.filter((p)=>p.title.toLowerCase().includes(query.toLowerCase())), [posts, query]);

  return <div className={`${darkMode?'dark':''} min-h-screen text-white flex bg-slate-900`}>
    <Sidebar communities={communities} onSelect={openCommunity} darkMode={darkMode} setDarkMode={setDarkMode} />
    <main className='flex-1 p-4 space-y-4'>
      <input placeholder='Search posts/messages...' value={query} onChange={(e)=>setQuery(e.target.value)} className='w-full bg-slate-800 p-2 rounded'/>
      <section className='grid md:grid-cols-2 gap-4'>
        <div className='bg-slate-800 p-3 rounded'><h2 className='font-semibold mb-2'>Discussions</h2>{filteredPosts.map(p=><div key={p._id} className='border-b border-slate-700 py-2'><p className='font-medium'>{p.title}</p><p className='text-sm text-slate-300'>{p.content}</p></div>)}</div>
        {selected ? <ChatPanel messages={messages} sendMessage={sendMessage} typing={typing} setTyping={setTyping} /> : <div className='bg-slate-800 p-4 rounded'>Pick a community to open chat</div>}
      </section>
    </main>
  </div>;
}
