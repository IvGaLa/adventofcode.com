const myfunc = (line) => {
  // --- Utilidades BigInt ---
  const BI = (x) => BigInt(x);

  const ceilDiv = (a, b) => {
    // ceil(a / b) para BigInt
    if (a % b === 0n) return a / b;
    return a / b + 1n;
  };

  const floorDiv = (a, b) => {
    // floor(a / b) para BigInt
    return a / b;
  };

  // --- Parsear los rangos ---
  const ranges = line.split(',').map((r) => {
    const [a, b] = r.split('-').map((n) => BI(n));
    return { start: a, end: b };
  });

  // Encontrar el valor máximo
  let maxEnd = 0n;
  for (const r of ranges) {
    if (r.end > maxEnd) maxEnd = r.end;
  }

  // Nº de dígitos del maxEnd
  const digitsMax = maxEnd.toString().length;

  // Mayor longitud de bloque posible
  const maxBlockLength = Math.floor(digitsMax / 2);

  let totalSum = 0n;

  // Procesar por longitud de bloque
  for (let blockLength = 1; blockLength <= maxBlockLength; blockLength++) {
    const power10 = BI(10) ** BI(blockLength);
    const factor = power10 + 1n;

    const blockMinValue = BI(10) ** BI(blockLength - 1);
    const blockMaxValue = BI(10) ** BI(blockLength) - 1n;

    for (const { start, end } of ranges) {
      // Divisiones enteras seguras
      const blockMinFromRange = ceilDiv(start, factor);
      const blockMaxFromRange = floorDiv(end, factor);

      // Intersección de dominio
      const blockFinalMin =
        blockMinFromRange > blockMinValue ? blockMinFromRange : blockMinValue;
      const blockFinalMax =
        blockMaxFromRange < blockMaxValue ? blockMaxFromRange : blockMaxValue;

      if (blockFinalMin <= blockFinalMax) {
        const count = blockFinalMax - blockFinalMin + 1n;
        const sumBlocks = ((blockFinalMin + blockFinalMax) * count) / 2n;
        const sumRange = sumBlocks * factor;
        totalSum += sumRange;
      }
    }
  }

  return totalSum.toString();
};

// -----------------------------
// Ejemplo del enunciado
// -----------------------------
const line =
  '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';

console.log(myfunc(line)); // ➜ debería imprimir 1227775554
