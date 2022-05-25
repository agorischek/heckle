export function exit(message: string) {
  const outcome = JSON.parse(message);
  if (outcome?.errors?.length > 0) {
    throw new Error(
      `Some results were rejected by App Insights: ${message}`
    );
  }
  process.exit();
},
