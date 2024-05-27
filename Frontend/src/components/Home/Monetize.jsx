import { Link } from 'react-router-dom'

export default function Monetize() {
    return (
        <div className='mt-20 flex flex-col items-center'>
            <div className='text-4xl font-bold pt-4 text-center'>Monetize Your Data</div>
            <div className='text-center my-4 plainText'>
                Join our data marketplace and start earning by listing your data based on followers.
            </div>
            <div className='flex'>
                <Link to={`/list`}>
                    <button className='bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded-full mr-4'>List your data now</button>
                </Link>
                <Link to={`/buy`}>
                    <button className='border border-orange-600 text-orange-700 font-bold py-2 px-4 rounded-full hover:border-orange-500 hover:text-orange-500'>Buy Grouped data</button>
                </Link>
            </div>
        </div>
    )
}