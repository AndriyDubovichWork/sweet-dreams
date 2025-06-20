import { useState } from 'react';
import style from './DropDown.module.scss';
import { dropDown } from '@/app/common/components/types/DropDown';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';

export default function DropDown({ thumbnail, content }: dropDown) {
  const [show, setShow] = useState(false);

  const styles = useStylesProvider();

  return (
    <div
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
      className={style.dropDown}
    >
      <div>{thumbnail}</div>
      {show && (
        <div
          onClick={() => setShow(false)}
          className={style.content}
          style={styles.dropDown}
        >
          {content}
        </div>
      )}
    </div>
  );
}
