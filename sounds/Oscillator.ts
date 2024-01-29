const TRIANGLE: number[] = Array.from({ length: 8192 }, (_, n) =>
  n === 0 ? 0 : (8 * Math.sin((n * Math.PI) / 2)) / Math.pow(Math.PI * n, 2),
);

export async function error(): Promise<void> {
  const context = new AudioContext();
  const oscillator = context.createOscillator();
  oscillator.connect(context.destination);
  oscillator.setPeriodicWave(
    context.createPeriodicWave(
      Float32Array.from(TRIANGLE),
      Float32Array.from(TRIANGLE.map(() => 0)),
    ),
  );
  oscillator.frequency.value = 64.22;
  oscillator.start();
  await new Promise((resolve) => setTimeout(resolve, 100));
  oscillator.frequency.value = 100;
  await new Promise((resolve) => setTimeout(resolve, 100));
  oscillator.stop();
}
