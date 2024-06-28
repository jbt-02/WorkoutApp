import { useState } from 'react';

function SearchBar({query, setQuery}) {
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    return (
        <div className="input-group mb-3">
            <input 
            type="text" 
            className='form-control'
            value={query} 
            onChange={handleInputChange}
            placeholder='Search'/>
        </div>
    );
  }
  
  export default SearchBar;