import RoutineForm from "./RoutineForm";
import RoutineDisplay from "./RoutineDisplay";

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Health & Beauty Routine Builder</h1>

      <div style={{ background: "#fffae6", padding: 12, margin: "12px 0" }}>
        APP UPDATED ✅ — if you see this, App.tsx is the new one
      </div>

      <RoutineForm />

      <div style={{ marginTop: 24 }}>
        <RoutineDisplay />
      </div>
    </div>
  );
}
