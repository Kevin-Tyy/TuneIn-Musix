import { Listbox, Transition } from "@headlessui/react";
import clsx from "clsx";
interface SearchFilterProps {
	searchFilter: string;
	setSearchFilter: (value: string) => void;
	isSearchFilterOpen: boolean;
	setIsSearchFilterOpen: (value: boolean) => void;
}
import { Fragment } from "react";
import { LuSettings2 } from "react-icons/lu";
const filterOptions: string[] = [
	"album",
	"artist",
	"track",
];
const SearchFilter: React.FC<SearchFilterProps> = ({
	searchFilter,
	setIsSearchFilterOpen,
	setSearchFilter,
}) => {
	return (
		<Listbox value={searchFilter} onChange={setSearchFilter}>
			<div className="relative">
				<Listbox.Button
					className="flex space-x-2 items-center text-gray-400 cursor-pointer hover:bg-gray-700/50 p-2 rounded-md"
					onClick={() => setIsSearchFilterOpen(true)}>
					<LuSettings2 />
					<p className="capitalize">{searchFilter}</p>
				</Listbox.Button>
				<Transition
					as={Fragment}
					enter="transition ease-in duration-200"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0">
					<Listbox.Options className="absolute right-0 md:-right-32">
						{filterOptions.map((option) => (
							<Listbox.Option key={option} value={option} as={Fragment}>
								{({ active, selected }) => (
									<li
										className={clsx(
											"flex items-start relative cursor-pointer select-none py-2 px-3 w-[200px] text-white ",
											active ? "bg-neutral-500" : "bg-neutral-800",
											selected && "bg-primary-500"
										)}>
										{option}
									</li>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
};

export default SearchFilter;
