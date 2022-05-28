export function timer() {
  const start = Date.now();
  return function () {
    const duration = Math.round(Date.now() - start);
    return duration;
  };
}
