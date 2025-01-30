import React, { useState } from "react";

const Cart = () => {
  // Dummy cart data, you can fetch this from your backend or context
  const initialCart = [
    { id: 1, name: "Beef", price: 100, quantity: 2 },
    { id: 2, name: "Chicken Biriyani", price: 150, quantity: 1 },
    { id: 3, name: "Porotta Beef", price: 180, quantity: 1 },
  ];

  const [cartItems, setCartItems] = useState(initialCart);

  // Calculate total price
  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  // Update quantity
  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Cart</h1>
      <div className="overflow-x-auto">
        <table className="table w-full table-auto">
          <thead>
            <tr>
              <th className="text-sm sm:text-base">Item</th>
              <th className="text-sm sm:text-base">Price</th>
              <th className="text-sm sm:text-base">Quantity</th>
              <th className="text-sm sm:text-base">Total</th>
              <th className="text-sm sm:text-base">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center text-xl font-semibold">
                  Your cart is empty
                </td>
              </tr>
            ) : (
              cartItems.map((item) => (
                <tr key={item.id}>
                  <td className="text-sm sm:text-base">{item.name}</td>
                  <td className="text-sm sm:text-base">₹{item.price}</td>
                  <td className="text-sm sm:text-base">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      className="input input-bordered w-16"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
                  <td className="text-sm sm:text-base">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning text-white btn-sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
        <span className="text-xl font-semibold">Total: ₹{getTotalPrice()}</span>
        <button className="btn btn-warning text-white mt-4 sm:mt-0">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
