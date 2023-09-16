import { Product } from '@/types/Product';
import { revalidateTag } from 'next/cache';
import { json } from 'node:stream/consumers';
import React from 'react'

async function addProduct(formData: FormData) {
  'use server';
  const name = formData.get('name')?.toString();
  const price = formData.get('price')?.toString();
  
  if (!name || !price) {
    throw new Error('Required fields not provided');
  }

  const product: Product = {
    name: name,
    price: price,
  };

  await fetch('https://6505dd7cef808d3c66f09010.mockapi.io/products', {
    method: 'POST',
    body: JSON.stringify(product),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  revalidateTag('products');
}

export default function ProductForm() {
  return (
    <form action={addProduct} autoComplete="off" className='flex flex-col justify-center items-center gap-5'>
      <h3 className='text-2xl font-bold tracking-tighter text-gray-200'>Add product</h3>
      <div className='flex gap-5'>
        <label htmlFor='input-name' className='text-white w-24'>
          Name
        </label>
        <input id="input-name" type="text" name="name" />
      </div>
      <div className='flex gap-5'>
        <label htmlFor='input-price' className='text-white w-24'>
          Price
        </label>
        <input id="input-price" type="number" name="price" />
      </div>
      <button type="submit" className="text-gray-200 text-xl leading-6 hover:bg-gray-900 cursor-pointer px-4 py-2 border border-gray-100 rounded-lg">Save</button>
    </form>
  )
}
