import RoutineForm from "./RoutineForm";
import RoutineDisplay from "./RoutineDisplay";

export default function App() {
  const routine = null; // временно - докато свържем данните

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Health & Beauty Routine Builder</h1>

      <RoutineForm />

      <div style={{ marginTop: 24 }}>
        {/* Важно: подаваме routine като prop, но засега е null */}
        <RoutineDisplay routine={routine} />
      </div>
    </div>
  );
}
