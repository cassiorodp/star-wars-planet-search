import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

import '../styles/selectedFilters.css';

function SelectedFilters() {
  const {
    filter:
    { filters: { filterByNumericValues } },
    handleRemoveFilter } = useContext(TableContext);

  const renderSelectedFilters = () => (
    <>
      {filterByNumericValues
        .map(({ comparison, column, value }) => (
          <div className="selected-filter" key={ column } data-testid="filter">
            <p>{`Column: ${column}`}</p>
            <p>{`Comparison: ${comparison}`}</p>
            <p>{`Value: ${value}`}</p>
            <button
              onClick={ () => handleRemoveFilter(column) }
              type="button"
            >
              X
            </button>
          </div>
        ))}
    </>
  );

  return (
    <div>
      {renderSelectedFilters()}
    </div>
  );
}

export default SelectedFilters;
