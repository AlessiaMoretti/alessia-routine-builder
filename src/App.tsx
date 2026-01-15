import RoutineForm from "./RoutineForm";
import RoutineDisplay from "./RoutineDisplay";

export default function App() {
  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Health & Beauty Routine Builder</h1>

      <RoutineForm />

      <div style={{ marginTop: 24 }}>
        <RoutineDisplay />
      </div>
    </div>
  );
}
