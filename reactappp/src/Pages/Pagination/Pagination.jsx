import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Pagination/Pagination.css';


const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get(`https://dummyjson.com/products?limit=${productsPerPage}&skip=${(currentPage - 1) * productsPerPage}`);
      setProducts(response.data.products);
      setTotalPages(Math.ceil(response.data.total / productsPerPage));
    };

    fetchProducts();
  }, [currentPage, productsPerPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="pagination-container">
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <h2>{product.title}</h2>
            {/* <p>{product.description}</p>
            <p>Price: ${product.price}</p> */}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Prev
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;