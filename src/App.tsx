import { useState } from "react";
import RoutineForm from "./RoutineForm";
import RoutineDisplay from "./RoutineDisplay";
import { Routine, Language } from "./types";

export default function App() {
  const [language, setLanguage] = useState<Language>("en");
  const [routine, setRoutine] = useState<Routine | null>(null);

  const handleReset = () => setRoutine(null);

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold">Health & Beauty Routine Builder</h1>

        {/* Language selector */}
        <div className="flex items-center gap-3">
          <label className="font-medium">Language:</label>
          <select
            className="border rounded px-3 py-2"
            value={language}
            onChange={(e) => setLanguage(e.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="it">Italiano</option>
          </select>
        </div>

        {/* IMPORTANT: render Display only when routine exists */}
        {routine ? (
          <RoutineDisplay routine={routine} language={language} onReset={handleReset} />
        ) : (
          <RoutineForm language={language} onGenerate={setRoutine} />
        )}
      </div>
    </div>
  );
}
