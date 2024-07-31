import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar } from "react-icons/fa";
import { SlBasket } from "react-icons/sl";
import Basket from './Basket';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [basket, setBasket] = useState([]);
  const [basketInfo, setBasketInfo] = useState(false);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL;
    axios.get(apiUrl)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, index) => (
      <FaStar key={index} className='text-yellow-400'/>
    ));
  };

  const handleBasketClick = (productId) => {
    if (basket.some(item => item.id === productId)) {
      setBasket(basket.filter(item => item.id !== productId));
    } else {
      const product = products.find(product => product.id === productId);
      if (product) {
        setBasket([...basket, product]);
      }
    }
  };

  return (
    <div className='flex flex-col justify-center items-center p-5 bg-gray-200 min-h-screen'>
      <div className="text-right">
        {basket.length >= 0 && (
          <div onClick={() => setBasketInfo(!basketInfo)} className="fixed cursor-pointer top-5 right-5 p-3 bg-white border border-gray-300 rounded-full shadow-md flex items-center justify-center space-x-2">
            <SlBasket className="text-2xl text-yellow-400" />
            <span className="font-bold text-gray-800">{basket.length === 0 ? "" : basket.length}</span>
          </div>
        )}
        {basketInfo && <Basket basket={basket} setBasket={setBasket} setBasketInfo={setBasketInfo} />}
      </div>
      <h1 className='text-red-500 font-extrabold text-3xl mb-5'>Product List</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {products.map(product => (
          <div className='bg-white border border-gray-300 px-4 py-6 rounded-md flex flex-col justify-between shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer' key={product.id}>
            <div className='flex justify-between items-center'>
              <button 
                className={`font-bold border p-3 items-center justify-center flex rounded-full hover:shadow-md ${basket.some(item => item.id === product.id) ? 'bg-yellow-400 font-bold text-xl' : 'text-red-400 font-bold text-xl'}`} 
                onClick={() => handleBasketClick(product.id)}
              >
                <SlBasket />
              </button>
              <div className="flex">
                {renderStars(product.rating)}
              </div>
            </div>
            <img className='w-full h-48 object-cover mb-4 rounded-md' src={product.images[0]} alt={product.title} />
            <h1 className='font-bold text-center text-lg mb-2'>{product.title}</h1>
            <div className="text-sm mb-4">{product.description}</div>
            <div className="flex flex-col gap-2 text-left w-full">
              <div className=""><b>Price: </b>{product.price}$</div>
              <div className=""><b>Brand: </b>{product.brand}</div>
              <div className=""><b>Category: </b>{product.category}</div>
              <div className=""><b>Stock:</b> {product.stock}</div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {product.tags.map((tag, index) => (
                <div key={index} className="border border-gray-300 bg-gray-100 p-1 rounded-md text-sm">
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
