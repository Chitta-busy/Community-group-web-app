import { useState } from 'react';
export default function ChatPanel({ messages, sendMessage, typing, setTyping }) {
  const [content, setContent] = useState('');
  return <div className='h-80 bg-slate-800 p-3 rounded'>
    <div className='h-56 overflow-y-auto space-y-2'>{messages.map((m)=><div key={m._id||m.tempId} className='text-sm'><span className='text-slate-400'>{new Date(m.createdAt||Date.now()).toLocaleTimeString()}:</span> {m.content}</div>)}</div>
    {typing && <p className='text-xs text-indigo-300'>Someone is typing...</p>}
    <form onSubmit={(e)=>{e.preventDefault();sendMessage(content);setContent('');}} className='flex gap-2 mt-2'>
      <input value={content} onChange={(e)=>{setContent(e.target.value);setTyping();}} className='flex-1 p-2 rounded bg-slate-700' placeholder='Type message'/>
      <button className='bg-indigo-600 px-3 rounded'>Send</button>
    </form>
  </div>;
}
