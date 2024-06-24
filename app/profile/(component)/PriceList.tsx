'use client';

import { useState } from 'react';

export default function PriceList() {
  const [priceList, setPriceList] = useState<any>([
    {
      times: 1,
      price: 1000,
    },
  ]);

  function handleAddRow(e: any) {
    e.preventDefault();

    setPriceList([
      ...priceList,
      {
        times: 1,
        price: 1000,
      },
    ]);
  }

  return (
    <div className="">
      {priceList.map((item: any, index: number) => (
        <>
          <div className="border-gray-300 mb-2 flex items-center justify-between rounded-md border p-2">
            <div className="flex items-center">
              <input
                type="number"
                value={item.times}
                className="border-gray-300 mr-2 h-10 w-10 rounded-md border text-center"
                readOnly
              />
              <span className="mr-4">堂</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">NT$</span>
              <input
                type="number"
                value={item.price}
                className="border-gray-300 mr-2 h-10 w-20 rounded-md border text-center"
                readOnly
              />
              <span>元</span>
            </div>
            <button
              onClick={() => {
                setPriceList(
                  [...priceList].filter((item: any, idx: number) => {
                    return idx != index;
                  }),
                );
              }}
              className="ml-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="text-gray-600 h-6 w-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </>
      ))}
      <button onClick={handleAddRow} className="text-gray-500 mt-4 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="mr-1 h-6 w-6"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
        新增價格
      </button>
    </div>
  );
}
