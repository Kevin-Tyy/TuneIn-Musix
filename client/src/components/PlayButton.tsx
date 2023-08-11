import { FaPlay } from 'react-icons/fa'

const PlayButton = () => {
  return (
    <button className='p-4 w-12 h-12 flex items-center justify-center bg-green-700 rounded-full'>
        <FaPlay size={15} className="font-5xl text-black"/>
    </button>
    )
}

export default PlayButton