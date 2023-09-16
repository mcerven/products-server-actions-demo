import React from "react";
import { Product } from "../types/Product";
import ProductForm from "./ProductForm";

async function getProducts(): Promise<Product[] | undefined> {
  const response = await fetch('https://6505dd7cef808d3c66f09010.mockapi.io/products',
    {
      cache: "default",
      next: {
        tags: ["products"]
      }
    }
  )
  return response.json();
}

export default async function Home() {
  const products = await getProducts();

  return (
    <section className="w-full min-h-screen py-12 md:py-24 lg:py-32 xl:py-48 bg-black flex justify-center" >
      <div className="container px-4 md:px-6" >
        <div className="grid gap-6 items-center" >
          <div className="flex flex-col justify-center space-y-8 text-center" >
            <div className="space-y-2" >
              <h1
                className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
              >
                Discover Our Unique Products
              </h1>
              <p className="max-w-[600px] text-zinc-200 md:text-xl dark:text-zinc-100 mx-auto" >
                Our products are of the highest quality
              </p>
            </div>
            <ProductForm />
            <div className="w-full max-w-full space-y-4 mx-auto" >
              <div className="grid grid-cols-3 gap-8" >
                <React.Suspense fallback={"Loading..."}>
                  {products?.map(p => 
                    <div key={p.id} className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg" >
                      <div className="p-2 bg-black bg-opacity-50 rounded-full" >
                        <svg
                          className=" text-white h-6 w-6 mb-2 opacity-75"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          width="24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                          <path
                            d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                          />
                        </svg>
                      </div>
                      <h2 className="text-xl font-bold text-white" >
                        {p.name}
                      </h2>
                      <p className="text-zinc-200 dark:text-zinc-100" >
                        {p.price}
                      </p>
                    </div>
                  )}
                </React.Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
