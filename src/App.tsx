export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Health & Beauty Routine Builder</h1>

      <div style={{ background: "#fffae6", padding: 12, margin: "12px 0" }}>
        APP UPDATED ✅ (marker)
      </div>

      <RoutineForm />

      <div style={{ marginTop: 24 }}>
        <RoutineDisplay />
      </div>
    </div>
  );
}
