import React from "react";
import { useParams } from "react-router-dom";
import Header from "../../components/navigation/Header";

const ProfilePage: React.FC = () => {
	const { username } = useParams();
	return (
		<div>
			<Header>{username}</Header>
		</div>
	);
};

export default ProfilePage;
