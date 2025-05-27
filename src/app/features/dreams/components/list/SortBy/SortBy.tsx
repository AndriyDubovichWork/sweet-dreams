import useUpdateDreams from '../../../hooks/useUpdateDreams';
import { useSavedDreamsStore } from '../../../store/list/useSavedDreamsStore';
import { AiOutlineSync } from 'react-icons/ai';
import style from './SortBy.module.scss';
import SortByElement from '../SortByElement/SortByElement';
import useStylesProvider from "@/app/features/dreams/hooks/useStylesProvider";

export default function SortBy() {
  const {
    sortBy,
    sortById,
    setSortById,
    isSortByReversed,
    setIsSortByReversed,
  } = useSavedDreamsStore();
  const updateDreams = useUpdateDreams();
const providedStyles = useStylesProvider()
  return (
      <div className={style.sortBy} style={providedStyles.sortBy}>
      <SortByElement
        onClick={() => {
          setIsSortByReversed(!isSortByReversed);
          updateDreams({ isReversed: !isSortByReversed });
        }}
        disabled={isSortByReversed}
      >
        <AiOutlineSync  />

      </SortByElement>
        {sortBy.map(({ name, value }, id) => {
          return (
            <SortByElement
              key={value}
              disabled={id === sortById}
              onClick={() => {
                setSortById(id);
                updateDreams({ id });
              }}
            >
              {name}
            </SortByElement>
          );
        })}
    </div>
  );
}
