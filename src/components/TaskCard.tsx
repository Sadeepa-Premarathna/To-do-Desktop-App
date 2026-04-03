interface TaskCardProps {
  task: Task;
  onToggle: (id: number) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

export function TaskCard({ task, onToggle, onEdit, onDelete }: TaskCardProps) {
  const isCompleted = task.completed === 1;
  const p = task.priority;

  const priorityClass = p === 'high' ? 'badge-high' : p === 'medium' ? 'badge-medium' : 'badge-low';
  const dotColor = p === 'high' ? '#ef4444' : p === 'medium' ? '#f59e0b' : '#10b981';

  const dueLabel = task.due_date
    ? new Date(task.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : null;

  return (
    <div className="ui-card animate-scale-in group" style={{
      padding: '1.1rem 1.25rem',
      display: 'flex', alignItems: 'flex-start', gap: '1rem',
      opacity: isCompleted ? 0.55 : 1,
      position: 'relative',
    }}>
      {/* Priority line left */}
      <div style={{
        position: 'absolute', left: 0, top: '1rem', bottom: '1rem',
        width: 3, borderRadius: '0 3px 3px 0',
        background: dotColor,
      }} />

      {/* Checkbox */}
      <div style={{ paddingTop: '1px', paddingLeft: '4px' }}>
        <input
          type="checkbox"
          className="custom-checkbox"
          checked={isCompleted}
          onChange={() => onToggle(task.id)}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{
          margin: '0 0 0.25rem',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
          textDecoration: isCompleted ? 'line-through' : 'none',
          whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
        }}>
          {task.title}
        </h3>

        {task.description && (
          <p style={{
            margin: '0 0 0.65rem',
            fontSize: '0.825rem',
            color: 'var(--text-muted)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}>
            {task.description}
          </p>
        )}

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
          <span className={`badge ${priorityClass}`}>{p}</span>

          <span style={{
            fontSize: '0.75rem', fontWeight: 600,
            padding: '0.2rem 0.65rem',
            borderRadius: 999,
            background: 'var(--bg-input)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
          }}>
            {task.category}
          </span>

          {dueLabel && (
            <span style={{
              marginLeft: 'auto',
              fontSize: '0.75rem', fontWeight: 600,
              padding: '0.2rem 0.65rem',
              borderRadius: 999,
              background: 'var(--accent-soft)',
              color: 'var(--accent-text)',
              display: 'flex', alignItems: 'center', gap: '0.3rem',
            }}>
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {dueLabel}
            </span>
          )}
        </div>
      </div>

      {/* Actions (hover) */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: '0.25rem',
        opacity: 0, transition: 'opacity 0.2s',
      }}
        className="group-hover:opacity-100"
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0')}
      >
        <button
          onClick={() => onEdit(task)}
          title="Edit"
          style={{
            padding: '0.4rem', border: 'none', background: 'var(--bg-input)',
            borderRadius: 8, cursor: 'pointer', color: 'var(--text-muted)',
            transition: 'background 0.2s, color 0.2s',
            display: 'flex',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--accent)'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task.id)}
          title="Delete"
          style={{
            padding: '0.4rem', border: 'none', background: 'var(--bg-input)',
            borderRadius: 8, cursor: 'pointer', color: 'var(--text-muted)',
            transition: 'background 0.2s, color 0.2s',
            display: 'flex',
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = '#ef4444'; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--text-muted)'; }}
        >
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
