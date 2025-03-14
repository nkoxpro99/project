export function formatPrice(price?: number): string {
  if (price) {
    price *= 1000;
    return price.toLocaleString('vi-VN');
  } else return '0';
}
