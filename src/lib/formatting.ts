export { formatCurrency } from "./money";
import { formatNumber } from "./money";
export function formatQuantity(quantityHundredths: number): string {
  const quantity = quantityHundredths / 100;
  return formatNumber(quantity, quantity % 1 === 0 ? 0 : 2);
}
