export interface UserType {
    username : string;
    email : string;
    authenticationmethod : "email_password" | "oauth"
    savedMusic : Array<any>;
    avatarUrl : string;
}
interface MusicType {
    
}
export interface GenreItemType {
    href : string
	icons : Array<genreIconsType>
	id : string
	name : string
}
export interface genreIconsType {
    height : number;
    url : string;
    width : number;
}