export const generateCoachResponse = async ({
  message,
  user,
}) => {
  const text = message.toLowerCase();

  if (text.includes("sleep")) {
    return `Hi ${user.name}. For better sleep, start with a consistent sleep and wake schedule, reduce caffeine later in the day, and create a short wind-down routine.`;
  }

  if (
    text.includes("exercise") ||
    text.includes("workout")
  ) {
    return `A sustainable approach is usually better than trying to change everything at once. Consider starting with a realistic weekly movement goal and increasing it gradually.`;
  }

  if (
    text.includes("food") ||
    text.includes("nutrition")
  ) {
    return `Try focusing on consistent meals built around foods you enjoy, with vegetables or fruit, a protein source, carbohydrates, and adequate hydration.`;
  }

  return `Thanks for sharing that, ${user.name}. A useful next step is to choose one small, measurable action you can realistically repeat this week.`;
};