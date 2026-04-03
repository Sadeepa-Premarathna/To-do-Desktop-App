import { useState } from 'react';
import { TaskCard } from '../components/TaskCard';

interface TasksPageProps {
  tasks: Task[];
  onToggleTask: (id: number) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: number) => void;
  onOpenNewModal: () => void;
}

export function TasksPage({ tasks, onToggleTask, onEditTask, onDeleteTask, onOpenNewModal }: TasksPageProps) {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const filteredTasks = tasks.filter(t => {
    if (filter !== 'all' && t.category !== filter) return false;
    if (search && !t.title.toLowerCase().includes(search.toLowerCase()) &&
        !(t.description && t.description.toLowerCase().includes(search.toLowerCase()))) return false;
    return true;
  });

  const categories = ['all', 'Personal', 'Work', 'Health', 'Shopping', 'Education'];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1.75rem', flexShrink: 0 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
            My Tasks
          </h1>
          <p style={{ margin: '0.3rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {tasks.length} task{tasks.length !== 1 ? 's' : ''} total
          </p>
        </div>
        <button className="btn-accent" onClick={onOpenNewModal}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Task
        </button>
      </div>

      {/* Search + Filters */}
      <div style={{ display: 'flex', gap: '0.9rem', marginBottom: '1.25rem', flexShrink: 0, flexWrap: 'wrap' }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1 1 220px', minWidth: 0 }}>
          <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            style={{ position: 'absolute', left: '0.9rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none' }}>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="ui-input"
            style={{ paddingLeft: '2.4rem', borderRadius: 12 }}
            placeholder="Search tasks..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Category pills */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                padding: '0.45rem 1rem',
                borderRadius: 999,
                border: '1px solid',
                fontSize: '0.8rem', fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.18s ease',
                fontFamily: 'inherit',
                background: filter === cat ? 'var(--accent)' : 'var(--bg-card)',
                borderColor: filter === cat ? 'var(--accent)' : 'var(--border-color)',
                color: filter === cat ? '#fff' : 'var(--text-secondary)',
                boxShadow: filter === cat ? '0 4px 12px rgba(99,102,241,0.25)' : 'none',
              }}
            >
              {cat === 'all' ? 'All' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Task list */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {filteredTasks.length === 0 ? (
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
              <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: 'var(--accent)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <p style={{ margin: 0, fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>No tasks found</p>
            <p style={{ margin: 0, fontSize: '0.875rem' }}>
              {search || filter !== 'all' ? 'Try adjusting your filters.' : "You're all caught up!"}
            </p>
            {!(search || filter !== 'all') && (
              <button className="btn-accent" onClick={onOpenNewModal}>
                Create your first task
              </button>
            )}
          </div>
        ) : (
          filteredTasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={onToggleTask}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
            />
          ))
        )}
      </div>
    </div>
  );
}
