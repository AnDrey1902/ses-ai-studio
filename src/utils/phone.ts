import React from 'react';

export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '');

  if (digits.length === 0) return '';
  if (digits.length <= 3) return `+${digits}`;
  if (digits.length <= 5) return `+${digits.slice(0, 3)} (${digits.slice(3)}`;
  if (digits.length <= 8) return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5)}`;
  if (digits.length <= 10) return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8)}`;
  return `+${digits.slice(0, 3)} (${digits.slice(3, 5)}) ${digits.slice(5, 8)}-${digits.slice(8, 10)}-${digits.slice(10, 12)}`;
}

export function handlePhoneInput(
  e: React.ChangeEvent<HTMLInputElement>,
  setter: (value: string) => void
): void {
  const raw = e.target.value.replace(/\D/g, '');
  const limited = raw.slice(0, 12);
  setter(formatPhone(limited));
}
