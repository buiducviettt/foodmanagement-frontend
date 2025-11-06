/* eslint-disable react/prop-types */
import '../GlobalStyles/GlobalStyles.scss';
import { useEffect, useState } from 'react';
const SearchInput = ({ products }) => {
  const [searchInput, setSearchInput] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);
  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  useEffect(() => {
    setSearching(true);
    const debounce = setTimeout(() => {
      if (searchInput.length > 0) {
        const filteredProducts = products.filter((item) =>
          item.title.toLowerCase().includes(searchInput.toLowerCase()),
        );
        setSearchResult(filteredProducts);
      } else {
        setSearchResult([]); // Nếu không có giá trị trong ô tìm kiếm, đặt kết quả là rỗng
      }
      setSearching(false);
    }, 500);
    return () => {
      clearTimeout(debounce);
    };
  }, [products, searchInput]);
  return (
    <div className="hd_search">
      <div className="search-input">
        <input
          type="text"
          className="form_control"
          value={searchInput}
          onChange={handleSearchChange}
          placeholder="Search for products..."
        />
      </div>
      {searchInput && (
        <div className="search_result">
          {searching ? (
            <p>Searching....</p>
          ) : (
            <div>
              {searchResult.length > 0 ? (
                <table className="result_table">
                  <thead>
                    <tr>
                      <th>Food</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResult.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No results found</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
