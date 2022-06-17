import React,{memo} from 'react'
import './label.scss'
import Label from './Label'
import {AiOutlineBars } from 'react-icons/ai'

const items=[
  {
    img:'https://www.hoka.com/dw/image/v2/BDJD_PRD/on/demandware.static/-/Sites-HOKA-US-master/default/dwa8219b60/images/transparent/1110519-BFBG_1.jpg?sw=414&sfrm=png&q=0&bgcolor=F7F7F9',
    name:'shoes'
  },
  {
    img:'https://cdn.shopify.com/s/files/1/2987/0758/products/Como_LIGHT_Reg_Suit_Pants-Pants-LDM510040-303303-Raven_600x.jpg?v=1642603104',
    name:'pants'
  },
  {
    img:'https://images.ctfassets.net/40akseett7bn/4r0ezqb0H8BwHoNNCUDQvB/aa1710a1e0c6d6e444b0046d0f2a848d/dad_hat_bubble.jpeg',
    name:'hats'
  },
  {
    img:'https://image.uniqlo.com/UQ/ST3/AsianCommon/imagesgoods/441596/item/goods_09_441596.jpg?width=1008&impolicy=quality_75',
    name:'shirts'
  },
  {
    img:'https://cf.shopee.vn/file/7971053d6c5db79f83079c7a3d7e6408_xhdpi',
    name:'salse'
  },
]

const Labels = () => {
  return (
    <section className='label__products'>
      <h1><AiOutlineBars className='icon_ctg'/>category</h1>
      <div className='label__container'>
        {
          items.map((item,index)=>(
            <Label key={index} img={item.img} name={item.name}/>
          ))
        }

      </div>
    </section>
  )
}

export default memo(Labels)