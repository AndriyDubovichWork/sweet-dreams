import { useState } from 'react';
import style from './DropDown.module.scss';
import { dropDown } from '@/app/features/dreams/types/components/shared/DropDown';

export default function DropDown({ thumbnail, content }: dropDown) {
  const [show, setShow] = useState(false);
  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={style.dropDown}
    >
      <div>{thumbnail}</div>
      {show && (
        <div onClick={() => setShow(false)} className={style.content}>
          {content}
        </div>
      )}
    </div>
  );
}
