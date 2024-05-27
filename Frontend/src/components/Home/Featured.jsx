import featured1 from '../../assets/featured1.jpg'
import featured2 from '../../assets/featured2.jpg'
import featured3 from '../../assets/featured3.jpg'
import datalisting from '../../assets/datalisting.jpg'
import anonymous from '../../assets/anonymous.jpg'

export default function Featured() {
    return (
        <div>
            <div className='mt-20'>
                <div className='text-4xl font-bold pt-4 text-center'>Featured Data sets</div>
                <div className='text-center my-4 plainText'>
                    Explore our curated collection of high-quality data sets from top contributors.
                </div>
                <div className='flex justify-around mb-4'>
                    <img src={featured1} alt="" className='w-[30%] aspect-video rounded-md' />
                    <img src={featured2} alt="" className='w-[30%] aspect-video rounded-md' />
                    <img src={featured3} alt="" className='w-[30%] aspect-video rounded-md' />
                </div>
            </div>

            <div className='mx-20 mt-24'>
                <div className='flex justify-center p-8 items-center mb-8'>
                    <img src={datalisting} alt="" className='w-[45%] aspect-video h-auto rounded-lg' />
                    <div className='flex flex-col ml-12'>
                        <div className='my-4 plainText'>List your data based on followers</div>
                        <div className='text-2xl font-bold'>Data Listing</div>
                        <div className='my-4 plainText'>Easily showcase and sell your data to interested buyers by listing it based on the number of followers you have.</div>
                    </div>
                </div>
                <div className='flex justify-center p-8 items-center mb-8'>
                    <div className='flex flex-col mr-12'>
                        <div className='my-4 plainText'>Keep your Identity unrevealed</div>
                        <div className='text-2xl font-bold'>Anonymity</div>
                        <div className='my-4 plainText'>Sell your data anonymously without actually revealing your identity</div>
                    </div>
                    <img src={anonymous} alt="" className='w-[45%] aspect-video h-auto rounded-lg' />
                </div>
                <div className='flex justify-center p-8 items-center mb-8'>
                    <img src={datalisting} alt="" className='w-[45%] aspect-video h-auto rounded-lg' />
                    <div className='flex flex-col ml-12'>
                        <div className='my-4 plainText'>List your data based on followers</div>
                        <div className='text-2xl font-bold'>Data Listing</div>
                        <div className='my-4 plainText'>Easily showcase and sell your data to interested buyers by listing it based on the number of followers you have.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}