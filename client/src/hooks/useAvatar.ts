const useAvatar = (name : string) => {
    const firstLetter = [...name][0];
    return firstLetter.toUpperCase()
}
export default useAvatar
