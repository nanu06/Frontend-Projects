import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Fetch products from API
const fetchData = async (page, limit) => {
  const response = await fetch(
    `https://dummyjson.com/products?limit=${limit}&skip=${page * limit}`
  );
  const data = await response.json();
  return data;
};

const PaginationComponent = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchData(currentPage, itemsPerPage);
      setProducts(data.products);
      setTotalProducts(data.total);
      setLoading(false);
    };

    getProducts();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(totalProducts / itemsPerPage);
  const maxPageNumbersToShow = 5;
  const startPage = Math.max(
    0,
    currentPage - Math.floor(maxPageNumbersToShow / 2)
  );
  const endPage = Math.min(totalPages, startPage + maxPageNumbersToShow);
  const visiblePages = [...Array(endPage - startPage).keys()].map(
    (i) => startPage + i
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Pagination Component
      </h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-4 rounded shadow">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-48 object-cover mb-4 rounded"
                />
                <h3 className="text-lg font-bold">{product.title}</h3>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <p className="text-gray-800 font-bold mb-2">${product.price}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-2 mt-8">
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                currentPage === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </button>
            {visiblePages.map((page) => (
              <button
                key={page}
                className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                  currentPage === page ? "bg-blue-700" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page + 1}
              </button>
            ))}
            <button
              className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300 ${
                currentPage === totalPages - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next
            </button>
          </div>
          <div className=" bottom-0 left-0 w-full bg-white p-4 border-t text-center">
            <Link
              to="/"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Back to Home
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default PaginationComponent;
