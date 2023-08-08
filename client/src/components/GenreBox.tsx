import React from "react";
import { GenreItemType } from "../types";

type GenreBoxProps = {
  genre : GenreItemType
}

const GenreBox: React.FC<GenreBoxProps> = ({ genre }) => {
	return <div>
    <img src={genre.icons[0].url} alt="" />
    {genre.name}</div>;
};

export default GenreBox;
