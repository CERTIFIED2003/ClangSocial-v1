import Link from 'next/link';
import React from 'react';
import { footerList1, footerList2, footerList3 } from '../utils/constants';

const footerList = [
  {
    name: 'Terms',
    link: 'terms'
  },
  {
    name: 'Privacy',
    link: 'privacy-policy'
  }
];

const List = ({ items, mt }: any) => (

  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`} >
    {items.map((item: any) => (
      <Link href={`/${item.link}`} key={item.link} >
        <p key={item} className="text-gray-400 text-sm hover:underline cursor-pointer">
          {item.name}
        </p>
      </Link>
    ))}
  </div>
)

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center border-gray-200 pb-10">
      {/* <div className="mt-6 hidden xl:block"> */}
      <div className="mt-6 hidden xl:block">
        <List items={footerList} mt={false} />
      </div>
      {/* <List items={footerList1} mt={false} />
        <List items={footerList2} mt />
        <List items={footerList3} mt /> */}
      <p className="border-b-2 border-gray-200 pb-5 text-gray-400 hidden md:block xl:block text-sm mt-5">Ⓒ 2022 Casuals4Fun</p>
    </div>
  )
}

export default Footer