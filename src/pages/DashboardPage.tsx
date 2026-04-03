interface DashboardPageProps {
  stats: Stats | null;
  recentTasks: Task[];
  setActivePage: (page: Page) => void;
}

function StatCard({ label, value, color }: { label: string; value: number; color?: string }) {
  return (
    <div className="stat-card">
      <p className="stat-label">{label}</p>
      <p className="stat-value" style={color ? { color } : undefined}>{value}</p>
    </div>
  );
}

export function DashboardPage({ stats, recentTasks, setActivePage }: DashboardPageProps) {
  if (!stats) return null;

  const progress = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;
  const isAllDone = stats.total > 0 && stats.total === stats.completed;

  return (
    <div className="animate-fade-in" style={{ maxWidth: 1100 }}>

      {/* Page header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ margin: 0, fontSize: '1.7rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.025em' }}>
          Dashboard
        </h1>
        <p style={{ margin: '0.3rem 0 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Welcome back! Here's your task overview.
        </p>
      </div>

      {/* Stat row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} color="#f59e0b" />
        <StatCard label="High Priority" value={stats.high} color="#ef4444" />
        <StatCard label="Completed" value={stats.completed} color="var(--accent)" />
      </div>

      {/* Progress card */}
      <div className="ui-card" style={{ padding: '1.75rem 2rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              {isAllDone ? '🎉 All tasks completed!' : 'Overall Progress'}
            </h2>
            <p style={{ margin: '0.25rem 0 0', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
              {isAllDone
                ? 'Great work — you\'re all caught up!'
                : `${stats.completed} of ${stats.total} tasks completed`}
            </p>
          </div>
          <div style={{
            width: 64, height: 64, position: 'relative',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="64" height="64" viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="32" cy="32" r="26" fill="none" stroke="var(--border-color)" strokeWidth="8" />
              <circle
                cx="32" cy="32" r="26" fill="none"
                stroke="var(--accent)" strokeWidth="8"
                strokeDasharray={`${2 * Math.PI * 26}`}
                strokeDashoffset={`${2 * Math.PI * 26 * (1 - progress / 100)}`}
                strokeLinecap="round"
                style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
              />
            </svg>
            <span style={{
              position: 'absolute', fontSize: '0.8rem', fontWeight: 800,
              color: 'var(--accent)',
            }}>{progress}%</span>
          </div>
        </div>

        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <p style={{ margin: '0.6rem 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {progress}% complete
        </p>
      </div>

      {/* Recent tasks */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          Recent Active Tasks
        </h3>
        <button
          onClick={() => setActivePage('tasks')}
          style={{
            fontSize: '0.825rem', fontWeight: 600, color: 'var(--accent)',
            background: 'var(--accent-soft)', border: 'none', borderRadius: 999,
            padding: '0.35rem 1rem', cursor: 'pointer', display: 'flex',
            alignItems: 'center', gap: '0.3rem', transition: 'background 0.2s',
          }}
        >
          View all
          <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {recentTasks.length === 0 ? (
        <div className="ui-card" style={{
          padding: '2.5rem', textAlign: 'center',
          border: '2px dashed var(--border-color)',
          background: 'transparent', boxShadow: 'none',
        }}>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>No active tasks right now.</p>
          <button className="btn-accent" onClick={() => setActivePage('tasks')}>
            Add a task
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.85rem' }}>
          {recentTasks.map(task => {
            const dotColor = task.priority === 'high' ? '#ef4444' : task.priority === 'medium' ? '#f59e0b' : '#10b981';
            return (
              <div
                key={task.id}
                className="ui-card"
                onClick={() => setActivePage('tasks')}
                style={{ padding: '1rem 1.25rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.85rem' }}
              >
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: dotColor, flexShrink: 0,
                  boxShadow: `0 0 8px ${dotColor}88`,
                }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    margin: 0, fontWeight: 600, fontSize: '0.9rem',
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                  }}>{task.title}</p>
                  <p style={{ margin: '0.15rem 0 0', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
                    {task.category}
                  </p>
                </div>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  style={{ color: 'var(--text-muted)', flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
