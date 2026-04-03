import { TaskCard } from '../components/TaskCard';

interface CompletedPageProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onDeleteTask: (id: number) => void;
  onClearAll: () => void;
}

export function CompletedPage({ tasks, onToggleTask, onDeleteTask, onClearAll }: CompletedPageProps) {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
            Completed
          </h1>
          <p style={{ margin: '0.3rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} finished
          </p>
        </div>
        {tasks.length > 0 && (
          <button 
            onClick={onClearAll}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.4rem',
              padding: '0.55rem 1.25rem', borderRadius: 999,
              background: 'rgba(239,68,68,0.1)', color: '#ef4444',
              border: 'none', fontWeight: 600, fontSize: '0.85rem',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.15)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(239,68,68,0.1)'; }}
          >
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Clear History
          </button>
        )}
      </div>

      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {tasks.length === 0 ? (
          <div style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: '1rem',
            color: 'var(--text-muted)', textAlign: 'center', padding: '3rem',
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: '50%',
              background: 'var(--bg-card)', border: '1px solid var(--border-color)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'var(--shadow-card)',
            }}>
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#10b981' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>No completed tasks yet</p>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              Check off tasks to see them appear here.
            </p>
          </div>
        ) : (
          tasks.map(task => (
             <TaskCard 
              key={task.id} 
              task={task} 
              onToggle={onToggleTask}
              onEdit={() => {}} // Disabled for completed
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
