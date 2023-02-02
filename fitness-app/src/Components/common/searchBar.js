import { useState } from 'react';

function SearchBar(props) {
  
    return (
        <div className="input-group mb-3">
            <input type="text" className='form-control' placeholder='Search'/>
        </div>
    );
  }
  
  export default SearchBar;