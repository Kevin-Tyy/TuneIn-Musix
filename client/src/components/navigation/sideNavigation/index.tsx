import { NavLink } from "react-router-dom";
import { sidenav } from "../../../utils/constants";
import { useState } from "react";
import Logo from "../../logo";
import { useSelector } from "react-redux";
import { loggedInUser } from "../../../redux/slices/Authslice";
import useAvatar from "../../../hooks/useAvatar";
import { UserType } from "../../../types";
import { FiMoreVertical } from "react-icons/fi";
import {
	TbLayoutSidebarRightExpand,
} from "react-icons/tb";
import clsx from "clsx";
const SideNav = () => {
	const [isExpanded, setIsExpanded] = useState(true);
	const { user } = useSelector(loggedInUser) as { user: UserType };
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
				" h-[89vh] z-50 hidden md:flex full rounded-xl bg-neutral-950 flex-col gap-10 sticky top-[12px] p-3 transition-all",
				isExpanded ? "w-[350px]" : "w-20"
			)}>
			<div className="flex justify-between">
				<Logo isExpanded={isExpanded} handleToggle={handleToggle} />
				<span className="text-white cursor-pointer" onClick={handleToggle}>
					{isExpanded && <TbLayoutSidebarRightExpand size={23} />}
				</span>
			</div>
			<div className="flex flex-col justify-center h-full mb-48 gap-3 ">
				{sidenav.map((item) => (
					<NavLink
						key={item.title}
						to={item.link!}
						className={({
							isActive,
						}) => `group flex gap-5 items-center justify-center text-white rounded-md ring-1 ring-inset ring-neutral-800/50  transition-all "
							${isActive && "ring-1  ring-neutral-700 bg-primary-400"}
							${isExpanded ? "p-[13px]" : "py-3 gap-0"}
						`}>
						{<item.icon size={23} />}
						<p
							className={`overflow-hidden whitespace-nowrap transition-all ${
								isExpanded ? "w-52" : "w-0"
							}`}>
							{item.title}
						</p>
						{!isExpanded && (
							<div className="absolute left-full z-[999] rounded-md px-5 py-3 ring-1 ring-inset ring-neutral-700 ml-6 whitespace-nowrap bg-neutral-800 invisible opacity-0 -translate-x-3 duration-300 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
								{item.title}
							</div>
						)}
					</NavLink>
				))}
			</div>
			{user && (
				<div className="border-t border-neutral-800 flex justify-center items-center py-3 ">
					{user?.avatar ? (
						<img src={user.avatar} className="w-10 rounded-full" />
					) : (
						<div className="bg-purple-400 hover:bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center text-xl">
							{placeholderUrl}
						</div>
					)}
					<div
						className={clsx(
							"flex justify-between items-center transition-all overflow-hidden",
							isExpanded ? "w-52 ml-3" : "w-0"
						)}>
						<div className="leading-8 text-white">
							<h1 className="font-semibold">{user.username}</h1>
							<p className="text-xs text-gray-500">{user.email}</p>
						</div>
						<FiMoreVertical
							size={25}
							className="text-white cursor-pointer active:bg-neutral-800 p-0.5 rounded-full"
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default SideNav;
