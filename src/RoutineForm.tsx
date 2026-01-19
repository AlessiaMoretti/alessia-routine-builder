import { useState } from "react";
import { FormData, Language, Routine } from "./types";
import { getTranslation } from "./translations";
import { generateRoutine } from "./routineGenerator";

type Props = {
  language: Language;
  onGenerate: (routine: Routine) => void;
};

export default function RoutineForm({ language, onGenerate }: Props) {
  const t = getTranslation(language);

  const [formData, setFormData] = useState<FormData>({
    goals: [],
    timeAvailable: 10,
    skinType: "normal",
    stressLevel: 3,
  });

  const [error, setError] = useState<string | null>(null);

  const toggleGoal = (goal: FormData["goals"][number]) => {
    setFormData((prev) => {
      const exists = prev.goals.includes(goal);
      return {
        ...prev,
        goals: exists ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
      };
    });
  };

  const handleGenerate = () => {
    if (formData.goals.length === 0) {
      setError(t.selectAtLeastOneGoal);
      return;
    }
    setError(null);

    const routine = generateRoutine(formData, language);
    onGenerate(routine);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">{t.selectGoals}</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {(["energy", "sleep", "skin", "focus", "stress"] as const).map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => toggleGoal(g)}
            className={`border rounded-lg py-3 px-4 text-left ${
              formData.goals.includes(g) ? "border-blue-500 bg-blue-50" : "border-gray-200"
            }`}
          >
            {t.goals[g]}
          </button>
        ))}
      </div>

      {error && <div className="text-red-600 font-medium">{error}</div>}

      <div className="space-y-2">
        <label className="font-medium">{t.timeAvailable}</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={formData.timeAvailable}
          onChange={(e) => setFormData({ ...formData, timeAvailable: Number(e.target.value) })}
        >
          {[5, 10, 15, 20, 30].map((m) => (
            <option key={m} value={m}>
              {m} {t.minutes}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-medium">{t.skinType}</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={formData.skinType}
          onChange={(e) => setFormData({ ...formData, skinType: e.target.value as any })}
        >
          {(["normal", "dry", "oily", "combination", "sensitive"] as const).map((s) => (
            <option key={s} value={s}>
              {t.skinTypes[s]}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="font-medium">{t.stressLevel}</label>
        <input
          className="w-full"
          type="range"
          min={1}
          max={5}
          value={formData.stressLevel}
          onChange={(e) => setFormData({ ...formData, stressLevel: Number(e.target.value) })}
        />
      </div>

      <button
        type="button"
        onClick={handleGenerate}
        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700"
      >
        {t.generate}
      </button>
    </div>
  );
}
