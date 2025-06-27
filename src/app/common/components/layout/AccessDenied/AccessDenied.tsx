import Centered from '@/app/common/hocs/Centered/Centered';
import style from './AccessDenied.module.scss';

export default function AccessDenied() {
  return <Centered>
    <h1 className={style.accessDenied}>Access Denied</h1>
  </Centered>;
}
