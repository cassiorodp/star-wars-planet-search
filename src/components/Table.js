import React, { useContext } from 'react';
import TableContext from '../context/TableContext';
import FilterForm from './FilterForm';
import SelectedFilters from './SelectedFilters';
import TableContent from './TableContent';

function Table() {
  const {
    data: { results },
    loading,
  } = useContext(TableContext);

  return (
    <div>
      {loading && <h1>Loading...</h1>}
      {results[0] && (
        <>
          <FilterForm />
          <SelectedFilters />
          <TableContent />
        </>
      )}
    </div>
  );
}

export default Table;
