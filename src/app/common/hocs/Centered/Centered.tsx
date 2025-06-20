import { centeredProps } from '@/app/common/hocs/types/Centered';
import style from './Centered.module.scss';

export default function Centered({
  children,
  className,
  absolute = true,
  vertically = true,
  horizontally = true,
  content = false,
}: centeredProps) {
  let centered = style.absoluteVH;

  if (absolute) {
    if (vertically && horizontally) {
      centered = style.absoluteVH;
    } else {
      if (vertically) {
        centered = style.absoluteV;
      } else {
        centered = style.absoluteH;
      }
    }
  } else {
    if (vertically && horizontally) {
      centered = style.flexVH;
    } else {
      if (vertically) {
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
