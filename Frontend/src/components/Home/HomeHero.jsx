import homeBg from '../../assets/homeBg.webp'
import { Link } from 'react-router-dom'

export default function HomeHero() {
    return (
        <div className="bg-cover bg-no-repeat py-20" style={{ backgroundImage: `url(${homeBg})` }}>
            <div className='flex justify-around'>
                <div className='text-4xl font-bold text-center'>Unlock the power of data</div>
                <div className='flex flex-col'>
                    <div className='text-lg plainText'>
                        Welcome to our <span className='font-bold'>decentralized data marketplace</span> where you can buy and <br /> sell data effortlessly.
                    </div>
                    <div className='my-8'>
                        <Link to={`/list`}>
                            <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full mr-4'>list data</button>
                        </Link>
                        <Link to={`/buy`}>
                            <button className='border border-orange-600 text-orange-700 font-bold py-2 px-4 rounded-full hover:border-orange-500 hover:text-orange-500'>Buy data</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='text-4xl text-center my-8'>Powered by <span className='font-bold'>Plurality</span></div>
        </div>
    )
}