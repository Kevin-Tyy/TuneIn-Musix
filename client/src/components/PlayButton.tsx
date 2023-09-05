import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
    <button className='p-4 w-12 sm:w-14 h-12 sm:h-14 flex items-center justify-center bg-green-700 rounded-full transition hover:scale-110'>
        <FaPlay size={20} className="font-5xl text-black"/>
    </button>
    )
}

export default PlayButton