import { GoHome } from "react-icons/go";
import { FiSearch } from "react-icons/fi";
import { IconType } from "react-icons";
import { LuLibrary } from "react-icons/lu";
import { AiOutlineHeart } from "react-icons/ai";
import { LuBell, LuFlag, LuSettings, LuVerified } from "react-icons/lu";
import { MdOutlineExplore } from "react-icons/md";

export const sidenav: sidenavOptions[] = [
	{
		icon: GoHome,
		title: "Home",
		link: "/",
	},
	{
		icon: FiSearch,
		title: "Search",
		link: "/search",
	},
	{
		icon: LuLibrary,
		title: "Playlist",
		link: "/playlists",
	},
	{
		icon: AiOutlineHeart,
		title: "Liked Songs",
		link: "/saved",
	},
	{
		icon: MdOutlineExplore,
		title: "Explore",
		link: "/explore",
	},
];
interface sidenavOptions {
	icon: IconType;
	title?: string;
	link?: string;
}

export const settings: sidenavOptions[] = [
	{
		icon: LuVerified,
		title: "Get verified",
	},
	{
		icon: LuFlag,
		title: "Flags",
	},
	{
		icon: LuSettings,
		title: "Settings",
	},
	{
		icon: LuBell,
		title: "Notifications",
	},
];

export const searchTabs = [
	{
		title: "all",
		filter: "all",
	},
	{
		title: "albums",
		filter: "albums",
	},
	{
		title: "artists",
		filter: "artist",
	},
	{
		title: "songs",
		filter: "track ",
	},
];
