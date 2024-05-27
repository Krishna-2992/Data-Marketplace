import logo from '../assets/logo.svg'
import { Link } from 'react-router-dom'

export default function Navbar() {
    return (
        <div>
            <div className="flex justify-between items-center px-32 bg-black text-white">
                <div className='flex gap-8'>
                    <img src={logo} alt="" />
                    <Link to={"/"}>
                        <div className="text-2xl font-semibold cursor-pointer hover:text-orange-500 rounded-md">Home</div>
                    </Link>
                </div>
                <div className='my-8'>
                    <Link to={`/buy`}>
                        <button className='bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-full mr-4'>Go to Buy Data page</button>
                    </Link>
                    <Link to={`/list`}>
                        <button className='border border-orange-600 text-orange-700 font-bold py-2 px-4 rounded-full hover:border-orange-500 hover:text-orange-500'>Go to List Data page</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}