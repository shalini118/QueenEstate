/* eslint-disable react/prop-types */
import {Link} from 'react-router-dom'


function HotelCard({ listing }) {
  return (
    <Link to={`/listing/${listing._id}`}>
      <div className='rounded-xl shadow-md flex flex-col gap-2 max-w-72 md:h-full relative'>
          <img src={listing.imageUrl} alt="" className='rounded-xl h-[200px] object-cover' />
          <div className='p-3' >
              <h1 className='font-bold text-xl line-clamp-1'>{listing.name}</h1>
              <p className='text-sm line-clamp-2 inline mr-2 line-through'>₹{listing.regularPrice}</p>
              <p className='text-normal font-semibold inline line-clamp-2 '>₹{listing.discountPrice}</p>
              <div className='flex justify-between items-center'>
                  <p className='text-sm mt-2 w-4/5'><span className='font-bold text-2md'>Address: </span> {listing.address}</p>
                  {/* <button className='text-sm border p-1 rounded-lg'>Book Now</button> */}
              </div>
          </div>
      </div>
    </Link>
  )
}

export default HotelCard