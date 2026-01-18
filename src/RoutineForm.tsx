import { Routine, Language } from "./types";
import { getTranslation } from "./translations";

type Props = {
  language: Language;
  onGenerate: (routine: Routine) => void;
};

export default function RoutineForm({ language, onGenerate }: Props) {
  const t = getTranslation(language);

  const handleGenerate = () => {
    const routine: Routine = {
      morning: [{ name: t.steps.warmWater, duration: 2 }],
      evening: [{ name: t.steps.doubleCleanser, duration: 4 }],
      tips: [t.tips.hydration],
      shopping: [t.shopping.lemon],
    };

    onGenerate(routine);
  };

  return (
    <div style={{ border: "2px solid green", padding: 16, marginTop: 16 }}>
      <h2>{t.routineFormTitle}</h2>

      <label>
        {t.routineType}:
        <select>
          <option>{t.morning}</option>
          <option>{t.evening}</option>
        </select>
      </label>

      <br />
      <br />

      <button onClick={handleGenerate}>
        {t.generateRoutine}
      </button>
    </div>
  );
}

