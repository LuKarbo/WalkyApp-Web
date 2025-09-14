const WalkData = ({ records }) => {
  return (
    <div className="bg-foreground rounded-2xl shadow-md p-4 border border-border text-black flex-grow overflow-y-auto">
      <h3 className="font-bold mb-2">Seguimiento del paseo</h3>
      {records.length === 0 ? (
        <p>No hay registros todavía.</p>
      ) : (
        <ul className="space-y-2 max-h-50 overflow-y-auto">
          {[...records]
            .sort((a, b) => new Date(b.timeFull) - new Date(a.timeFull))  // orden descendente por fecha
            .map((r, i) => (
              <li key={i} className="border-b pb-2">
                <p className="text-sm text-gray-700">{r.time}</p>
                <p className="text-base">{r.address}</p>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default WalkData;