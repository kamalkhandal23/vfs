// Indian mobile validation (10 digits, starts with 6-9)
export const isValidIndianMobile = (mobile) => {
  if (!mobile) return false;

  const cleaned = mobile.replace(/\D/g, ""); // remove non-digits
  const regex = /^[6-9]\d{9}$/;

  return regex.test(cleaned);
};

export const sanitizeMobileInput = (value) => {
  return value.replace(/\D/g, "").slice(0, 10); // only digits, max 10
};
