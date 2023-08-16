import { NavLink } from "react-router-dom";
import { sidenav } from "../../../utils/constants";

const SideNav = () => {
	return (
		<div className="w-[350px] h-[89vh] hidden md:flex full rounded-xl bg-neutral-950 flex-col gap-10 sticky top-[12px]">
			{/* <Logo /> */}
			<div className="flex flex-col justify-center h-full mb-48 gap-3 p-4">
				{sidenav.map((item) => (
					<NavLink
						key={item.title}
						to={item.link!}
						className={({
							isActive,
						}) => `flex gap-5 items-center text-white rounded-md ring-1 ring-inset ring-neutral-800/50 p-[13px] transition "
							${isActive && "ring-1  ring-neutral-700 bg-primary-400"}
						`}>
						{<item.icon size={23} />}
						<p className="">{item.title}</p>
					</NavLink>
				))}
			</div>
		</div>
	);
};

export default SideNav;
