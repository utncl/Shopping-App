import React from "react";

const Basket = ({ basket, setBasket, setBasketInfo }) => {
  const totalPrice = basket.reduce((total, item) => total + item.price, 0);

  const handleRemoveItem = (id) => {
    setBasket(basket.filter((item) => item.id !== id));
  };

  const handleClearBasket = () => {
    setBasket([]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={() => setBasketInfo(false)}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Basket</h2>
        {basket.length > 0 ? (
          <>
            <ul className="overflow-auto max-h-[200px] px-2">
              {basket.map((item) => (
                <li
                  key={item.id}
                  className="border-b py-2 flex justify-between"
                >
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                  <span>{item.title}</span>
                  <span>{item.price}$</span>
                </li>
              ))}
            </ul>
            <div className="border-t mt-4 pt-2 text-right font-bold">
              Total Price: ${totalPrice}
            </div>
          </>
        ) : (
          <p className="text-center">Your basket is empty.</p>
        )}
        <div className="mt-4 flex justify-between">
          {basket.length > 0 ? (
            <button
              onClick={handleClearBasket}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
            >
              Clear Basket
            </button>
          ) : (
            ""
          )}
          <button
            onClick={() => setBasketInfo(false)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;
