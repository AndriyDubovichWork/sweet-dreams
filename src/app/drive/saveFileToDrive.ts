import React from 'react';
import { drive } from '@googleapis/drive';
export default function saveFileToDrive(path: string | null) {
  drive({ version: 'v3' });

  return path;
}
