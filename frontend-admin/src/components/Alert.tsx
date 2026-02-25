import { useState, useEffect } from 'react';
import { CheckCircle, X, Info, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ── Toast system ──────────────────────────────────────
interface ToastItem { id:string; type:'success'|'error'|'info'; message:string; }
type Listener = (t:ToastItem)=>void;
let listeners: Listener[] = [];

export function showToast(type:ToastItem['type'], message:string) {
  const item: ToastItem = { id: Date.now().toString()+Math.random(), type, message };
  listeners.forEach(fn=>fn(item));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(()=>{
    const fn:Listener = (t)=>{
      setToasts(p=>[...p,t]);
      setTimeout(()=>setToasts(p=>p.filter(x=>x.id!==t.id)), 4000);
    };
    listeners.push(fn);
    return ()=>{ listeners=listeners.filter(f=>f!==fn); };
  },[]);

  const colors = {
    success:'border-green-500/40 bg-green-500/10',
    error:  'border-red-500/40 bg-red-500/10',
    info:   'border-blue-500/40 bg-blue-500/10',
  };
  const icons = {
    success:<CheckCircle size={15} className="text-green-400 flex-shrink-0"/>,
    error:  <X size={15} className="text-red-400 flex-shrink-0"/>,
    info:   <Info size={15} className="text-blue-400 flex-shrink-0"/>,
  };

  return (
    <div className="fixed bottom-5 right-5 z-[200] flex flex-col gap-2 pointer-events-none max-w-sm">
      <AnimatePresence>
        {toasts.map(t=>(
          <motion.div key={t.id}
            initial={{opacity:0,x:60,scale:0.95}} animate={{opacity:1,x:0,scale:1}} exit={{opacity:0,x:60,scale:0.95}}
            className={`pointer-events-auto glass-card px-4 py-3 flex items-center gap-3 border ${colors[t.type]}`}>
            {icons[t.type]}
            <p className="text-sm text-white">{t.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ── Alert / Confirm dialog ─────────────────────────────
interface AlertModalProps {
  open:boolean; onClose:()=>void;
  title:string; description?:string;
  confirmLabel?:string; cancelLabel?:string;
  variant?:'danger'|'warning'|'info';
  onConfirm?:()=>void;
}

export function AlertModal({open,onClose,title,description,confirmLabel='Confirmer',cancelLabel='Annuler',variant='danger',onConfirm}:AlertModalProps) {
  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{ if(e.key==='Escape') onClose(); };
    if(open) document.addEventListener('keydown',h);
    return ()=>document.removeEventListener('keydown',h);
  },[open,onClose]);

  if(!open) return null;

  const btnColors={danger:'bg-red-500 hover:bg-red-400',warning:'bg-orange-500 hover:bg-orange-400',info:'bg-blue-500 hover:bg-blue-400'};

  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}>
      <motion.div initial={{scale:0.9,opacity:0}} animate={{scale:1,opacity:1}} exit={{scale:0.9,opacity:0}}
        onClick={e=>e.stopPropagation()} className="glass-card p-6 w-full max-w-md mx-4">
        <div className="flex items-start gap-3 mb-5">
          <AlertTriangle size={20} className="text-orange-400 flex-shrink-0 mt-0.5"/>
          <div>
            <h3 className="font-semibold text-white">{title}</h3>
            {description && <p className="text-sm text-white/60 mt-1">{description}</p>}
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="btn-secondary">{cancelLabel}</button>
          <button onClick={()=>{onConfirm?.();onClose();}} className={`px-4 py-2 rounded-xl text-sm font-semibold text-white transition ${btnColors[variant]}`}>{confirmLabel}</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
