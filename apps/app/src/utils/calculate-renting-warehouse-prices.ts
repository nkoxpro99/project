export function calculateRentingWarehousePrices(price: number, duration: number) {
  const total = price * duration;
  const deposit = price * 0.5;
  const confirm = total - deposit;

  return { total, deposit, confirm };
}
