import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import tableContext from './TableContext';

function Provider({ children }) {
  const [data, setData] = useState({
    count: 0,
    next: '',
    previous: null,
    results: [],
  });

  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState({
    filters: {
      filterByName: {
        name: '',
      },
      filterByNumericValues: [],
      order: {
        column: 'name',
        sort: 'ASC',
      },
    },
  });

  const handleFilterByName = (newName) => {
    const { filters: { filterByName, filterByNumericValues, order } } = filter;
    setFilter({
      ...filter,
      filters:
      { filterByName:
        { ...filterByName, name: newName },
      filterByNumericValues: [...filterByNumericValues],
      order: { ...order },
      },
    });
  };

  const handleFilterByNumericValues = (column, comparison, value) => {
    const { filters: { filterByName, filterByNumericValues, order } } = filter;
    setFilter({
      ...filter,
      filters:
      { filterByName:
        { ...filterByName },
      filterByNumericValues:
    [...filterByNumericValues, { column, comparison, value }],
      order: { ...order },
      } });
  };

  const handleRemoveFilter = (removeFilterColumn) => {
    const { filters: { filterByName, filterByNumericValues, order } } = filter;
    const removedFilter = filterByNumericValues
      .filter(({ column }) => removeFilterColumn !== column);
    setFilter({
      ...filter,
      filters:
        { filterByName:
          { ...filterByName },
        filterByNumericValues:
      [...removedFilter],
        order: { ...order },
        } });
  };

  const handleSortPlanets = (column, sort) => {
    const { filters: { filterByName, filterByNumericValues } } = filter;
    setFilter({
      ...filter,
      filters:
      { filterByName:
        { ...filterByName },
      filterByNumericValues:
    [...filterByNumericValues],
      order: { column, sort } },
    });
  };

  useEffect(() => {
    const fetchPlanets = async () => {
      setLoading(true);
      const url = 'https://swapi-trybe.herokuapp.com/api/planets/';
      const response = await (await fetch(url)).json();
      response.results.forEach(async (planet) => {
        delete planet.residents;
        delete planet.created;
        delete planet.edited;
        delete planet.url;
        // const results = await Promise.all(planet.films.map((filmUrl) => {
        //   const r = fetch(filmUrl).then((res) => res.json());
        //   return r;
        // }));
        // planet.films = results;
      });
      setLoading(false);
      setData({ ...response, results: response.results });
    };

    fetchPlanets();
  }, []);

  const context = {
    data,
    loading,
    handleFilterByName,
    filter,
    handleFilterByNumericValues,
    handleRemoveFilter,
    handleSortPlanets,
  };

  return (
    <tableContext.Provider value={ context }>
      {children}
    </tableContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node,
}.isRequired;

export default Provider;
