export const CalculateVat = (amount: any, vatRate: number) => {
  const totalAmount = parseInt(amount, 10);
  const baseAmount = (totalAmount / (1 + vatRate)) * vatRate;
  return baseAmount;
};
