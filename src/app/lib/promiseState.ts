export default function promiseState(p: Promise<unknown>) {
  const t = {};
  return Promise.race([p, t]).then(
    (v) => (v === t ? 'pending' : 'fulfilled'),
    () => 'rejected'
  );
}
