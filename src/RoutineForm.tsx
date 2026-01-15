import { useState } from 'react';
import { FormData, Goal, TimeAvailable, SkinType, Language } from './types';
import { getTranslation } from './translations';

interface RoutineFormProps {
  language: Language;
  onGenerate: (data: FormData) => void;
}

export default function RoutineForm({ language, onGenerate }: RoutineFormProps) {
  const t = getTranslation(language);
  const [selectedGoals, setSelectedGoals] = useState<Goal[]>([]);
  const [timeAvailable, setTimeAvailable] = useState<TimeAvailable>(10);
  const [skinType, setSkinType] = useState<SkinType>('normal');
  const [stressLevel, setStressLevel] = useState(3);
  const [error, setError] = useState('');

  const goals: { id: Goal; label: string }[] = [
    { id: 'energy', label: t.goals.energy },
    { id: 'sleep', label: t.goals.sleep },
    { id: 'skin', label: t.goals.skin },
    { id: 'focus', label: t.goals.focus },
    { id: 'stress', label: t.goals.stress },
  ];

  const toggleGoal = (goal: Goal) => {
    setError('');
    setSelectedGoals((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGoals.length === 0) {
      setError(t.selectAtLeastOneGoal);
      return;
    }
    onGenerate({
      goals: selectedGoals,
      timeAvailable,
      skinType,
      stressLevel,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {t.selectGoals}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {goals.map((goal) => (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={`px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedGoals.includes(goal.id)
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-blue-300'
              }`}
            >
              {goal.label}
            </button>
          ))}
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.timeAvailable}
        </label>
        <select
          value={timeAvailable}
          onChange={(e) => setTimeAvailable(Number(e.target.value) as TimeAvailable)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
        >
          <option value={5}>5 {t.minutes}</option>
          <option value={10}>10 {t.minutes}</option>
          <option value={20}>20 {t.minutes}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.skinType}
        </label>
        <select
          value={skinType}
          onChange={(e) => setSkinType(e.target.value as SkinType)}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
        >
          <option value="normal">{t.skinTypes.normal}</option>
          <option value="dry">{t.skinTypes.dry}</option>
          <option value="oily">{t.skinTypes.oily}</option>
          <option value="combination">{t.skinTypes.combination}</option>
          <option value="sensitive">{t.skinTypes.sensitive}</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          {t.stressLevel}
        </label>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">{t.stressLow}</span>
          <input
            type="range"
            min="1"
            max="5"
            value={stressLevel}
            onChange={(e) => setStressLevel(Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <span className="text-sm text-gray-600">{t.stressHigh}</span>
          <span className="w-8 text-center font-semibold text-blue-600">
            {stressLevel}
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-4 rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
      >
        {t.generate}
      </button>
    </form>
  );
}
