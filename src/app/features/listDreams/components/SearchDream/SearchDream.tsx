import style from "./SearchDream.module.scss";
import { RxCross2 } from "react-icons/rx";
import Button from "@/app/common/components/ui/Button/Button";
import { useSearchStore } from "../../store/useSearchStore";
import useUpdateDreams from "@/app/common/hooks/useUpdateDreams";
import InputWithIcon from "@/app/common/components/ui/InputWithIcon/InputWithIcon";

export default function SearchDream() {
	const { search, setSearch } = useSearchStore();
	const updateDreams = useUpdateDreams();

	return (
		<div className={style.searchDream}>
			<InputWithIcon
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						updateDreams();
					}
				}}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				placeholder="dream name"
			>
				{search && (
					<RxCross2
						onClick={() => {
							setSearch("");
							updateDreams({ NoSearch: true });
						}}
					/>
				)}
			</InputWithIcon>
			<Button isPrimary onClick={() => updateDreams()} disabled={!search}>
				search
			</Button>
		</div>
	);
}
