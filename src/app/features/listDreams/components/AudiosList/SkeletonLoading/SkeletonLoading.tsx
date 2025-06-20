import React from 'react';
import style from './SkeletonLoading.module.scss';
import useStylesProvider from '@/app/common/hooks/useStylesProvider';

const SkeletonLoading = ({ role }: { role: string }) => {
  const styles = useStylesProvider();

  return (
    <table className={style.table} style={styles.audioListElement.header}>
      <tr>
        <th>name</th>
        <th>audio</th>
        <th>file size</th>
        <th>date</th>
        {role === 'admin' && (
          <>
            <th className={style.minWidth}>edit</th>
            <th className={style.minWidth}>delete</th>
          </>
        )}

        <th className={style.minWidth}>download</th>
      </tr>

      <tbody>
        {[...Array(10)].map((_, index) => (
          <tr key={index} className={style.skeletonRow}>
            <td>
              <div className={style.skeletonText} style={{ width: '35%' }} />
            </td>
            <td>
              <div className={style.skeletonText} style={{ width: '350%' }} />
            </td>
            <td>
              <div className={style.skeletonText} style={{ width: '50%' }} />
            </td>
            <td>
              <div className={style.skeletonText} style={{ width: '60%' }} />
            </td>
            {role === 'admin' && (
              <>
                <td>
                  <div className={style.skeletonButton} />
                </td>
                <td>
                  <div className={style.skeletonButton} />
                </td>
              </>
            )}
            <td>
              <div className={style.skeletonButton} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SkeletonLoading;
