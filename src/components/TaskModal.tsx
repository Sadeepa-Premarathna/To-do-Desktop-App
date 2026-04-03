import { useState, useEffect } from 'react';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: any) => void;
  task?: Task | null;
}

const Label = ({ children }: { children: React.ReactNode }) => (
  <label style={{
    display: 'block', fontSize: '0.75rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    color: 'var(--text-secondary)', marginBottom: '0.45rem',
  }}>
    {children}
  </label>
);

export function TaskModal({ isOpen, onClose, onSave, task }: TaskModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');
  const [category, setCategory] = useState('Personal');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || '');
      setPriority(task.priority);
      setCategory(task.category);
      setDueDate(task.due_date || '');
    } else {
      setTitle(''); setDescription('');
      setPriority('medium'); setCategory('Personal'); setDueDate('');
    }
  }, [task, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave({ id: task?.id, title, description, priority, category, due_date: dueDate || null });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--accent-soft)', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--accent)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={task ? "M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" : "M12 4v16m8-8H4"} />
              </svg>
            </div>
            <h2 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {task ? 'Edit Task' : 'New Task'}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              border: 'none', background: 'var(--bg-input)', borderRadius: 8,
              width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: 'var(--text-muted)',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-primary)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
          >
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <hr className="divider" style={{ marginBottom: '1.4rem' }} />

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <Label>Task Title <span style={{ color: '#ef4444' }}>*</span></Label>
            <input
              autoFocus
              className="ui-input"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Description</Label>
            <textarea
              className="ui-input"
              placeholder="Add details... (optional)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              style={{ height: '100px', resize: 'none', lineHeight: 1.6 }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.9rem' }}>
            <div>
              <Label>Priority</Label>
              <select className="ui-input" value={priority} onChange={e => setPriority(e.target.value as Priority)}
                style={{ cursor: 'pointer' }}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <Label>Category</Label>
              <select className="ui-input" value={category} onChange={e => setCategory(e.target.value)}
                style={{ cursor: 'pointer' }}>
                <option>Personal</option>
                <option>Work</option>
                <option>Health</option>
                <option>Shopping</option>
                <option>Education</option>
              </select>
            </div>
          </div>

          <div>
            <Label>Due Date</Label>
            <input type="date" className="ui-input" value={dueDate} onChange={e => setDueDate(e.target.value)} />
          </div>

          <hr className="divider" style={{ marginTop: '0.3rem' }} />

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button type="button" onClick={onClose} className="btn-ghost" style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
            <button type="submit" disabled={!title.trim()} className="btn-accent"
              style={{ flex: 2, justifyContent: 'center', opacity: title.trim() ? 1 : 0.5 }}>
              {task ? 'Update Task' : 'Save Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
