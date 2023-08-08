import { NavLink } from "react-router-dom";
import { sidenav } from "../../../utils/constants";

const SideNav = () => {
	return (
		<div className="w-full max-w-[320px] h-full bg-neutral-900 rounded-3xl flex flex-col gap-10">
			{/* <Logo /> */}
			<div className="flex flex-col justify-center h-full mb-48 gap-3 p-4">
				{sidenav.map((item) => (
					<NavLink
						key={item.title}
						to={item.link}
						className={({
							isActive,
						}) => `flex gap-5 items-center text-white rounded-full ring-1 ring-inset ring-neutral-800 p-5 transition duration-500 "
							${
								isActive
									? "ring-2  ring-neutral-700"
									: "bg-gradient-to-b from-neutral-900 to-neutral-800"
							}
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
