import React from 'react';
import style from './Centered.module.scss';
import { centeredProps } from '@/app/types/HOCs/Sared/Centered';

export default function Centered({
  children,
  absolute = true,
  verticaly = true,
  horizzontaly = true,
}: centeredProps) {
  let centered = style.absoluteVH;

  if (absolute) {
    if (verticaly && horizzontaly) {
      centered = style.absoluteVH;
    } else {
      if (verticaly) {
        centered = style.absoluteV;
      } else {
        centered = style.absoluteH;
      }
    }
  } else {
    if (verticaly && horizzontaly) {
      centered = style.flexVH;
    } else {
      if (verticaly) {
        centered = style.flexV;
      } else {
        centered = style.flexH;
      }
    }
  }

  return <div className={centered}>{children}</div>;
}
