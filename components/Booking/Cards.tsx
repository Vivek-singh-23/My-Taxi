import CardsList from '@/data/CardsList'
import Image from 'next/image'
import React, { useState } from 'react'

function Cards() {
    const [activeIndex, setActiveIndex] = useState<any>()
  return (
    <div>
        <h2 className='text-[14px] font-medium'>Payment Methods</h2>
        <div className='grid grid-cols-5 mt-2'>
            {CardsList.map((item,index)=>(
                <div onClick={()=>setActiveIndex(index)} className={`w-[50px] border-[1px] flex items-center justify-center rounded-md cursor-pointer hover:scale-110 hover:border-yellow-400 transition-all
                ${activeIndex==index?'border-yellow-400 border-[2px]':null}`}>
                    <Image src={item.image} alt={item.name} width={30} height={50}/>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Cards