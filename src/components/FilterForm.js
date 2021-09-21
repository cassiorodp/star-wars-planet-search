import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';
import { columnFilter, columnSort } from '../helpers';
import pixelGif from '../images/pixel-gif.gif';

import '../styles/filterForm.css';

function FilterForm() {
  const {
    handleFilterByName,
    handleFilterByNumericValues,
    handleSortPlanets,
    filter: { filters: { filterByNumericValues } } } = useContext(TableContext);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('bigger then');
  const [value, setValue] = useState('0');
  const [sortColumn, setSortColumn] = useState('name');
  const [order, setOrder] = useState('ASC');
  const [columnOptions, setColumnOptions] = useState(columnFilter);
  const [columnSortOptions, setColumnSortOptions] = useState(columnSort);

  const filteredColumn = () => {
    const numericValuesColumns = filterByNumericValues
      .map((filter) => filter.column);
    setColumnOptions(columnFilter
      .filter((option) => !numericValuesColumns.includes(option)));
    setColumnSortOptions(columnSort
      .filter((option) => !numericValuesColumns.includes(option)));
  };
  useEffect(filteredColumn, [filterByNumericValues]);

  return (
    <section className="main-container">
      <img src={ pixelGif } alt="millenium falcon gif" />
      <p><i>Lets go, Chewie</i></p>
      <form className="form-container">
        <label htmlFor="planet-name">
          Name:
          <input
            data-testid="name-filter"
            onChange={ (e) => handleFilterByName(e.target.value) }
            type="text"
            id="planet-name"
            placeholder="Eg: Tatooine"
          />
        </label>
        <div>
          <label htmlFor="column-filter">
            Filter by column:
            <select
              id="column-filter"
              value={ column }
              data-testid="column-filter"
              onChange={ (e) => setColumn(e.target.value) }
            >
              {columnOptions
                .map((colum) => <option value={ colum } key={ colum }>{colum}</option>)}
            </select>
          </label>
          <select
            value={ comparison }
            data-testid="comparison-filter"
            onChange={ (e) => setComparison(e.target.value) }
          >
            <option value="bigger then">bigger then</option>
            <option value="less then">less then</option>
            <option value="equal to">equal to</option>
          </select>
          <input
            type="number"
            required
            data-testid="value-filter"
            onChange={ (e) => setValue(e.target.value) }
          />
          <button
            onClick={ () => handleFilterByNumericValues(column, comparison, value) }
            type="button"
            data-testid="button-filter"
          >
            Filter!
          </button>
        </div>
        <div>
          <label htmlFor="column-sort">
            Sort by column:
            <select
              data-testid="column-sort"
              onChange={ (e) => setSortColumn(e.target.value) }
            >
              {columnSortOptions
                .map((colum) => <option value={ colum } key={ colum }>{colum}</option>)}
            </select>
          </label>
          <label htmlFor="upward">
            Upward:
            <input
              data-testid="column-sort-input-asc"
              id="upward"
              type="radio"
              name="order"
              value="ASC"
              defaultChecked
              onClick={ (e) => setOrder(e.target.value) }
            />
          </label>
          <label htmlFor="downward">
            Downward:
            <input
              data-testid="column-sort-input-desc"
              id="downward"
              type="radio"
              name="order"
              value="DESC"
              onClick={ (e) => setOrder(e.target.value) }
            />
          </label>
          <button
            onClick={ () => handleSortPlanets(sortColumn, order) }
            data-testid="column-sort-button"
            type="button"
          >
            Sort!
          </button>
        </div>
      </form>
    </section>
  );
}

export default FilterForm;
