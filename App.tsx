import { useState } from 'react';
import { FormData, Routine, Language } from './types';
import { generateRoutine } from './routineGenerator';
import { getTranslation } from './translations';
import RoutineForm from './RoutineForm';
import RoutineDisplay from './components/RoutineDisplay';
import { Sparkles, Globe } from 'lucide-react';

function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [routine, setRoutine] = useState<Routine | null>(null);
  const t = getTranslation(language);

  const handleGenerate = (data: FormData) => {
    const generatedRoutine = generateRoutine(data, language);
    setRoutine(generatedRoutine);
  };

  const handleReset = () => {
    setRoutine(null);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'it' : 'en';
    setLanguage(newLanguage);
    if (routine) {
      setRoutine(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-center mb-8">
          <div className="flex justify-end mb-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all border-2 border-gray-200 hover:border-blue-300"
            >
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-semibold text-gray-700">
                {language === 'en' ? 'IT' : 'EN'}
              </span>
            </button>
          </div>
          <div className="flex items-center justify-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              {t.appTitle}
            </h1>
          </div>
          <p className="text-gray-600 text-lg">{t.appSubtitle}</p>
        </header>

        <main className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          {!routine ? (
            <RoutineForm language={language} onGenerate={handleGenerate} />
          ) : (
            <RoutineDisplay
              routine={routine}
              language={language}
              onReset={handleReset}
            />
          )}
        </main>

        <footer className="text-center mt-8 text-sm text-gray-500">
          <p>
            {language === 'en'
              ? 'Created for your wellness journey'
              : 'Creato per il tuo percorso di benessere'}
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
