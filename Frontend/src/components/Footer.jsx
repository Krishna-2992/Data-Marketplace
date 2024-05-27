export default function Footer() {
    return (
        <div className='py-32'>
            <div className='text-4xl font-bold text-center'>Explore our data marketplace</div>
            <div className='text-center'>
                <input type="text" className='border border-gray-300 rounded-full py-2 px-4 w-96 mt-8 bg-[#181818]' placeholder='Enter your email' />
                <button className='border border-orange-500 text-orange-600 font-bold py-2 px-4 rounded-full ml-4'>Contact Us</button>
                <div className='mt-8 flex justify-center gap-8'>
                    <div className='plainText'>https://example.com/privacy</div>
                    <div className='plainText'>https://example.com/terms</div>
                    <div className='plainText'>https://example.com/cookies</div>
                </div>
                <div className='plainText mt-8'>
                    © 2023 Data Marketplace. All rights reserved.
                </div>
            </div>
        </div>
    )
}