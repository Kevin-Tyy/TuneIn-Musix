const useAvatar = (name : string) => {
    const firstLetter = [...name][0];
    console.log(name)
    return firstLetter.toUpperCase()
}
export default useAvatar
