import { useState } from "react";
import RoutineForm from "./RoutineForm";
import RoutineDisplay from "./RoutineDisplay";
import { Routine, Language } from "./types";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [routine, setRoutine] = useState<Routine | null>(null);

  const handleReset = () => setRoutine(null);

  return (
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Health & Beauty Routine Builder</h1>

      <RoutineForm language={language} onGenerate={setRoutine} />

      <div style={{ marginTop: 16 }}>
        <label>
          Language:{" "}
          <select value={language} onChange={(e) => setLanguage(e.target.value as Language)}>
            <option value="en">English</option>
            <option value="it">Italiano</option>
          </select>
        </label>
      </div>

      {routine ? (
        <div style={{ marginTop: 24 }}>
          <RoutineDisplay routine={routine} language={language} onReset={handleReset} />
        </div>
      ) : null}
    </div>
  );
}
