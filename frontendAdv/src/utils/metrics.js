export function calcularCrescimentoPercentual(atual, anterior) {
  if (anterior === 0 && atual === 0) return 0;
  if (anterior === 0) return 100;
  return ((atual - anterior) / anterior) * 100;
}
