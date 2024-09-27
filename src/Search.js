import invoice from './data/invoice.json';
import './App.css';
import { useState, useEffect } from 'react';

function Search() {
  const [data, setData] = useState(invoice.invoices);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState(invoice.invoices);
  const [filteredData, setFilteredData] = useState('all');
  const [debounce, setDebounce] = useState('');

  useEffect(() => {

    setData(invoice.invoices);
    setSearchData(invoice.invoices);
  }, []);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setDebounce(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  useEffect(() => {

    let filterResult = [];

    if (filteredData === 'all') {
      filterResult = searchData.filter(
        (item) =>
          item.vendor_name.toLowerCase().includes(debounce.toLowerCase()) ||
          item.action.toLowerCase().includes(debounce.toLowerCase()) ||
          item.invoice_id.toLowerCase().includes(debounce.toLowerCase()) 
      );
    } else if (filteredData === 'vendor_name') {
      filterResult = searchData.filter((item) =>
        item.vendor_name.toLowerCase().includes(debounce.toLowerCase())
      );
    } else if (filteredData === 'invoice_id') {
      filterResult = searchData.filter((item) =>
        item.invoice_id.toLowerCase().includes(debounce.toLowerCase())
      );
    } else if (filteredData === 'action') {
      filterResult = searchData.filter((item) =>
        item.action.toLowerCase().includes(debounce.toLowerCase())
      );
    }
    setData(filterResult.length > 0 ? filterResult : []);
  }, [debounce, filteredData, searchData]);

  return (
    <div>
        <div class = "search-1">
      <div class = "search-container">
        <input
          type="text"
          placeholder="Search data"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div class = "filter-container">
        <select
          value={filteredData}
          onChange={(e) => setFilteredData(e.target.value)}
          className="filter"
        >
          <option value="all">All fields</option>
          <option value="invoice_id">Invoice ID</option>
          <option value="vendor_name">Vendor Name</option>
          <option value="action">Action</option>
        </select>
      </div>
      </div>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Invoice ID</th>
            <th>Vendor Name</th>
            <th>Service Type</th>
            <th>Invoice Date</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.invoice_id}</td>
                <td>{item.vendor_name}</td>
                <td>{item.service_type}</td>
                <td>{item.invoice_date}</td>
                <td>{item.due_date}</td>
                <td>{item.amount}</td>
                <td>{item.action}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No Data</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Search;
