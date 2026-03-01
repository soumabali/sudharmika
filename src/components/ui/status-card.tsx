export function StatusCard({ title, value, hint }: { title: string; value: string; hint?: string }) {
  return (
    <div className="card bg-base-100 shadow-md border border-base-300">
      <div className="card-body">
        <h3 className="card-title text-sm opacity-70">{title}</h3>
        <p className="text-xl font-semibold">{value}</p>
        {hint ? <p className="text-xs opacity-60">{hint}</p> : null}
      </div>
    </div>
  );
}
