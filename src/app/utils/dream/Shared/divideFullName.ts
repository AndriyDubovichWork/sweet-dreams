import React from 'react';

export default function divideFullName(fullName: string) {
  const name = fullName.substring(0, fullName.length - 11);
  const date = fullName.replace(name, '');
  return { name, date };
}
