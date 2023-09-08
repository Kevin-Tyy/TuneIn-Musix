import { NavLink } from "react-router-dom";
import { sidenav } from "../../../utils/constants";
import { useState } from "react";
import Logo from "../../logo";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/slices/Authslice";
import useAvatar from "../../../hooks/useAvatar";
import { UserType } from "../../../types";
import clsx from "clsx";
import { userAccount } from "../../../redux/slices/Accountslice";
import { HiMenuAlt3 } from "react-icons/hi";
const SideNav = () => {
	const [isExpanded, setIsExpanded] = useState(false);
	const { user } = useSelector(loggedInUser) as { user: UserType };
	const { savedMusic } = useSelector(userAccount);
	let placeholderUrl;
	if (user) {
		placeholderUrl = useAvatar(user.username);
	}
	const handleToggle = () => {
		setIsExpanded((currentState) => !currentState);
	};

	return (
		<div
			className={clsx(
				" h-[90vh] z-50 hidden lg:flex full rounded-lg bg-neutral-950 flex-col gap-10 sticky top-3 p-3 transition-all duration-500",
				isExpanded ? "w-[350px]" : "w-20"
			)}>
			<div className="flex ml-4 mt-4 items-center justify-between">
				<Logo isExpanded={isExpanded} handleToggle={handleToggle} />
				<span className="text-white cursor-pointer" onClick={handleToggle}>
					{isExpanded && <HiMenuAlt3 size={23} />}
				</span>
			</div>
			<div className="flex flex-col justify-center h-full mb-48 gap-3 ">
				{sidenav.map((item, index) => (
					<NavLink
						key={item.title}
						to={item.link!}
						className={({
							isActive,
						}) => `group relative flex gap-4 items-center justify-start text-white rounded-md  transition-all duration-500 py-3
							${isActive && " !text-fuchsia-700"}
							${!isExpanded && 'gap-0'}
						`}>
						{<item.icon size={23} className="ml-4" />}
						<p
							className={`overflow-hidden whitespace-nowrap transition-[width] duration-300 ${
								isExpanded ? "w-full" : "w-0"
							}`}>
							{item.title}
						</p>
						{index === 3 && savedMusic.length !== 0 && (
							<p className="absolute bg-red-700 w-6 h-6 flex items-center justify-center rounded-full text-white text-xs -right-1 -top-1">
								{savedMusic.length >= 10 ? '10+' : savedMusic.length}
							</p>
						)}
						{!isExpanded && (
							<div className="absolute left-full z-[999] rounded-md px-5 py-3 ring-1 ring-inset ring-neutral-700 ml-6 whitespace-nowrap bg-neutral-800 invisible opacity-0 -translate-x-3 transition-all duration-500 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
								{item.title}
							</div>
						)}
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default SideNav;
