const DEVELOPMENT_START_DATE = new Date(2021, 8, 10);

function getExperienceYears(asOf: Date = new Date()): number {
  let years = asOf.getFullYear() - DEVELOPMENT_START_DATE.getFullYear();

  const anniversaryNotReached =
    asOf.getMonth() < DEVELOPMENT_START_DATE.getMonth() ||
    (asOf.getMonth() === DEVELOPMENT_START_DATE.getMonth() &&
      asOf.getDate() < DEVELOPMENT_START_DATE.getDate());

  if (anniversaryNotReached) {
    years -= 1;
  }

  return Math.max(0, years);
}

export const experienceYears = getExperienceYears();
