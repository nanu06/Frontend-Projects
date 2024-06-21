import  { useState, useEffect } from 'react';

// Fetch products from API
const fetchProducts = async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products;
};

const Ecommerce = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await fetchProducts();
      setProducts(products);
    };

    getProducts();
  }, []);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateCartItem = (productId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: quantity } : item
      )
    );
  };

  const removeCartItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">E-commerce Shopping Cart</h1>
      <button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mb-6 rounded transition duration-300"
        onClick={() => window.location.href = '/'}
      >
        Back to Home
      </button>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow">
                <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover mb-4 rounded" />
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-800 font-bold mb-2">${product.price}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full md:w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Cart</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            <div>
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded shadow mb-4">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
                  <div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-gray-800">${item.price}</p>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="border-gray-300 border rounded p-2 w-16 mr-2"
                      value={item.quantity}
                      onChange={(e) => updateCartItem(item.id, parseInt(e.target.value))}
                      min="1"
                    />
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
                      onClick={() => removeCartItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="mt-4">
                <h3 className="text-xl font-bold">Total: ${calculateTotal()}</h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ecommerce;
