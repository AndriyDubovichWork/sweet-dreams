import { centeredProps } from '@/app/types/HOCs/Sared/Centered';
import style from './Centered.module.scss';

export default function Centered({
  children,
  className,
  absolute = true,
  verticaly = true,
  horizzontaly = true,
  content = false,
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
  if (content) {
    centered = `${centered} ${style.content}`;
  }
  return <div className={`${centered} ${className}`}>{children}</div>;
}
