export function exit(message: unknown) {
  console.error(message);
  console.log();
  process.exit(1);
}
