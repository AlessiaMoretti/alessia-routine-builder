import { FormData, Routine, RoutineStep, Language } from './types';
import { getTranslation } from './translations';

export const generateRoutine = (data: FormData, language: Language): Routine => {
  const t = getTranslation(language);
  const { goals, timeAvailable, skinType, stressLevel } = data;

  const morningSteps: RoutineStep[] = [];
  const eveningSteps: RoutineStep[] = [];
  const tips: string[] = [];
  const shopping: string[] = [];

  let morningTime = 0;
  let eveningTime = 0;

  if (goals.includes('energy')) {
    if (morningTime + 2 <= timeAvailable) {
      morningSteps.push({ name: t.steps.warmWater, duration: 2 });
      morningTime += 2;
      shopping.push(t.shopping.lemon);
    }
    if (morningTime + 5 <= timeAvailable) {
      morningSteps.push({ name: t.steps.lightStretch, duration: 5 });
      morningTime += 5;
    }
    if (morningTime + 3 <= timeAvailable) {
      morningSteps.push({ name: t.steps.coldSplash, duration: 1 });
      morningTime += 1;
    }
    tips.push(t.tips.hydration);
    tips.push(t.tips.exercise);
  }

  if (goals.includes('sleep')) {
    if (eveningTime + 10 <= timeAvailable) {
      eveningSteps.push({ name: t.steps.chamomileTea, duration: 2 });
      eveningTime += 2;
      shopping.push(t.shopping.chamomileTea);
    }
    if (eveningTime + 5 <= timeAvailable && stressLevel >= 3) {
      eveningSteps.push({ name: t.steps.bathSoak, duration: 15 });
      eveningTime += 15;
      shopping.push(t.shopping.bathSalts);
    }
    if (eveningTime + 5 <= timeAvailable) {
      eveningSteps.push({ name: t.steps.screenOff, duration: 1 });
      eveningTime += 1;
    }
    if (eveningTime + 5 <= timeAvailable) {
      eveningSteps.push({ name: t.steps.readBook, duration: 10 });
      eveningTime += 10;
    }
    tips.push(t.tips.sleep);
    tips.push(t.tips.screens);
  }

  if (goals.includes('skin')) {
    if (morningTime + 3 <= timeAvailable) {
      morningSteps.push({ name: t.steps.gentleCleanser, duration: 2 });
      morningTime += 2;
      shopping.push(t.shopping.cleanser);
    }

    if (skinType === 'dry') {
      if (morningTime + 2 <= timeAvailable) {
        morningSteps.push({ name: t.steps.hyaluronicAcid, duration: 1 });
        morningTime += 1;
        shopping.push(t.shopping.hyaluronicAcid);
      }
      if (eveningTime + 2 <= timeAvailable) {
        eveningSteps.push({ name: t.steps.faceOil, duration: 2 });
        eveningTime += 2;
        shopping.push(t.shopping.faceOil);
      }
    } else if (skinType === 'oily') {
      if (morningTime + 2 <= timeAvailable) {
        morningSteps.push({ name: t.steps.niacinamide, duration: 1 });
        morningTime += 1;
        shopping.push(t.shopping.niacinamide);
      }
      if (eveningTime + 3 <= timeAvailable && timeAvailable >= 10) {
        eveningSteps.push({ name: t.steps.exfoliate, duration: 3 });
        eveningTime += 3;
        shopping.push(t.shopping.exfoliator);
      }
    } else if (skinType === 'sensitive') {
      if (morningTime + 2 <= timeAvailable) {
        morningSteps.push({ name: t.steps.toner, duration: 1 });
        morningTime += 1;
        shopping.push(t.shopping.toner);
      }
    } else {
      if (morningTime + 2 <= timeAvailable) {
        morningSteps.push({ name: t.steps.vitaminC, duration: 1 });
        morningTime += 1;
        shopping.push(t.shopping.vitaminC);
      }
    }

    if (morningTime + 2 <= timeAvailable) {
      morningSteps.push({ name: t.steps.moisturizer, duration: 2 });
      morningTime += 2;
      shopping.push(t.shopping.spfMoisturizer);
    }

    if (eveningTime + 3 <= timeAvailable) {
      eveningSteps.push({ name: t.steps.doubleCleanser, duration: 3 });
      eveningTime += 3;
    }
    if (eveningTime + 2 <= timeAvailable) {
      eveningSteps.push({ name: t.steps.serum, duration: 1 });
      eveningTime += 1;
      shopping.push(t.shopping.nightSerum);
    }
    if (eveningTime + 2 <= timeAvailable) {
      eveningSteps.push({ name: t.steps.nightCream, duration: 2 });
      eveningTime += 2;
      shopping.push(t.shopping.nightCream);
    }

    tips.push(t.tips.sunscreen);
    tips.push(t.tips.cleanPillowcase);
    tips.push(t.tips.touchFace);
  }

  if (goals.includes('focus')) {
    if (morningTime + 5 <= timeAvailable) {
      morningSteps.push({ name: t.steps.meditation, duration: 5 });
      morningTime += 5;
    }
    if (morningTime + 3 <= timeAvailable) {
      morningSteps.push({ name: t.steps.journaling, duration: 5 });
      morningTime += 5;
      shopping.push(t.shopping.journal);
    }
    if (morningTime + 2 <= timeAvailable) {
      morningSteps.push({ name: t.steps.supplements, duration: 1 });
      morningTime += 1;
      shopping.push(t.shopping.supplements);
    }
    tips.push(t.tips.nutrition);
    tips.push(t.tips.consistency);
  }

  if (goals.includes('stress')) {
    if (morningTime + 5 <= timeAvailable && stressLevel >= 3) {
      morningSteps.push({ name: t.steps.deepBreathing, duration: 5 });
      morningTime += 5;
    }
    if (morningTime + 10 <= timeAvailable && timeAvailable >= 20) {
      morningSteps.push({ name: t.steps.yoga, duration: 10 });
      morningTime += 10;
      shopping.push(t.shopping.yogaMat);
    }
    if (eveningTime + 5 <= timeAvailable) {
      eveningSteps.push({ name: t.steps.eveningStretch, duration: 5 });
      eveningTime += 5;
    }
    if (eveningTime + 5 <= timeAvailable && stressLevel >= 4) {
      eveningSteps.push({ name: t.steps.progressiveMuscle, duration: 10 });
      eveningTime += 10;
    }
    tips.push(t.tips.stress);
  }

  if (morningSteps.length === 0) {
    morningSteps.push({ name: t.steps.warmWater, duration: 2 });
    morningSteps.push({ name: t.steps.lightStretch, duration: 5 });
    shopping.push(t.shopping.lemon);
  }

  if (eveningSteps.length === 0) {
    eveningSteps.push({ name: t.steps.gentleCleanser, duration: 2 });
    eveningSteps.push({ name: t.steps.moisturizer, duration: 2 });
    shopping.push(t.shopping.cleanser);
    shopping.push(t.shopping.spfMoisturizer);
  }

  if (tips.length === 0) {
    tips.push(t.tips.hydration);
    tips.push(t.tips.sleep);
    tips.push(t.tips.consistency);
  }

  const uniqueTips = Array.from(new Set(tips)).slice(0, 3);
  const uniqueShopping = Array.from(new Set(shopping));

  return {
    morning: morningSteps,
    evening: eveningSteps,
    tips: uniqueTips,
    shopping: uniqueShopping,
  };
};
