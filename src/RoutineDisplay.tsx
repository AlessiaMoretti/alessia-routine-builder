import { useState } from 'react';
import { Routine, Language } from './types';
import { getTranslation } from './translations';
import { Sun, Moon, Lightbulb, ShoppingCart, Copy, RotateCcw, Check } from 'lucide-react';

interface RoutineDisplayProps {
  routine?: Routine | null;
  language: Language;
  onReset: () => void;
}

export default function RoutineDisplay({ routine, language, onReset }: RoutineDisplayProps) {
  const t = getTranslation(language);
  if (!routine) {
  return null; // или показвай текст: "Generate a routine first"
}
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());
  const [copied, setCopied] = useState(false);

  const toggleCheck = (index: number) => {
    setCheckedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const copyToClipboard = async () => {
    const morningText = `${t.morningRoutine}:\n${routine.morning
      .map((step, i) => `${i + 1}. ${step.name} (${step.duration} ${t.minutes})`)
      .join('\n')}`;

    const eveningText = `${t.eveningRoutine}:\n${routine.evening
      .map((step, i) => `${i + 1}. ${step.name} (${step.duration} ${t.minutes})`)
      .join('\n')}`;

    const tipsText = `${t.habitTips}:\n${routine.tips.map((tip, i) => `${i + 1}. ${tip}`).join('\n')}`;

    const shoppingText = `${t.shoppingList}:\n${routine.shopping.map((item, i) => `${i + 1}. ${item}`).join('\n')}`;

    const fullText = `${morningText}\n\n${eveningText}\n\n${tipsText}\n\n${shoppingText}`;

    try {
      await navigator.clipboard.writeText(fullText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const totalMorningTime = routine.morning.reduce((sum, step) => sum + step.duration, 0);
  const totalEveningTime = routine.evening.reduce((sum, step) => sum + step.duration, 0);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Sun className="w-6 h-6 text-orange-500" />
            <h2 className="text-xl font-bold text-gray-800">{t.morningRoutine}</h2>
          </div>
          <div className="space-y-3">
            {routine.morning.map((step, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm"
              >
                <span className="text-gray-700 font-medium">{step.name}</span>
                <span className="text-sm text-gray-500 font-semibold">
                  {step.duration} {t.minutes}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-orange-200">
            <p className="text-sm text-gray-600 font-semibold">
              Total: {totalMorningTime} {t.minutes}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 shadow-lg">
          <div className="flex items-center gap-2 mb-4">
            <Moon className="w-6 h-6 text-indigo-500" />
            <h2 className="text-xl font-bold text-gray-800">{t.eveningRoutine}</h2>
          </div>
          <div className="space-y-3">
            {routine.evening.map((step, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white rounded-lg p-3 shadow-sm"
              >
                <span className="text-gray-700 font-medium">{step.name}</span>
                <span className="text-sm text-gray-500 font-semibold">
                  {step.duration} {t.minutes}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-3 border-t border-indigo-200">
            <p className="text-sm text-gray-600 font-semibold">
              Total: {totalEveningTime} {t.minutes}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-6 h-6 text-green-600" />
          <h2 className="text-xl font-bold text-gray-800">{t.habitTips}</h2>
        </div>
        <ul className="space-y-2">
          {routine.tips.map((tip, index) => (
            <li key={index} className="flex items-start gap-2">
              <span className="text-green-600 font-bold mt-0.5">•</span>
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart className="w-6 h-6 text-pink-600" />
          <h2 className="text-xl font-bold text-gray-800">{t.shoppingList}</h2>
        </div>
        <ul className="space-y-2">
          {routine.shopping.map((item, index) => (
            <li key={index} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={checkedItems.has(index)}
                onChange={() => toggleCheck(index)}
                className="w-5 h-5 rounded border-gray-300 text-pink-600 focus:ring-pink-500 cursor-pointer"
              />
              <span
                className={`text-gray-700 ${
                  checkedItems.has(index) ? 'line-through text-gray-400' : ''
                }`}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={copyToClipboard}
          className="flex-1 flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold py-3 rounded-lg hover:bg-gray-900 transition-colors shadow-md"
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              {t.copied}
            </>
          ) : (
            <>
              <Copy className="w-5 h-5" />
              {t.copyToClipboard}
            </>
          )}
        </button>
        <button
          onClick={onReset}
          className="flex-1 flex items-center justify-center gap-2 bg-white text-gray-700 font-semibold py-3 rounded-lg border-2 border-gray-300 hover:border-gray-400 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          {t.reset}
        </button>
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-r-lg">
        <p className="text-sm text-yellow-800">{t.disclaimer}</p>
      </div>
    </div>
  );
}
