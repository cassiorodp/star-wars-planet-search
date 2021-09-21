import React, { useContext, useEffect, useState } from 'react';
import TableContext from '../context/TableContext';

import '../styles/tableContent.css';

function TableContent() {
  const { data: { results }, filter } = useContext(TableContext);

  const [planets, setPlanets] = useState([]);

  // Filter Planets by Name
  const filterPlanetsByName = () => {
    const { filters: { filterByName: { name: filterName } } } = filter;
    const planetsFilterByName = results
      .filter(({ name }) => name.toLowerCase().includes(filterName));
    return planetsFilterByName;
  };

  // Filter Planets by Numeric Value
  const filterPlanetsByNumericValue = (planetsByName) => {
    const { filters: { filterByNumericValues } } = filter;
    let filteredPlanets = [];
    if (filterByNumericValues.length) {
      filterByNumericValues.forEach(({ comparison, column, value }) => {
        if (comparison === 'bigger then') {
          filteredPlanets = planetsByName
            .filter((planet) => parseInt(planet[column], 10) > parseInt(value, 10));
        }
        if (comparison === 'less then') {
          filteredPlanets = planetsByName
            .filter((planet) => parseInt(planet[column], 10) < parseInt(value, 10));
        }
        if (comparison === 'equal to') {
          filteredPlanets = planetsByName
            .filter((planet) => parseInt(planet[column], 10) === parseInt(value, 10));
        }
      });
      return filteredPlanets;
    }
    filteredPlanets = planetsByName;
    return filteredPlanets;
  };

  const orderPlanets = (filteredPlanets) => {
    const { filters: { order: { column, sort } } } = filter;
    // Source: Murilo Rainho repository
    const sortedPlanets = filteredPlanets.sort((a, b) => {
      let columnA = a[column];
      let columnB = b[column];
      if (!Number.isNaN(Number(columnA))) columnA = Number(columnA);
      if (!Number.isNaN(Number(columnB))) columnB = Number(columnB);
      if (columnA > columnB) {
        return sort === 'ASC' ? 1 : Number('-1');
      } if (columnB > columnA) {
        return sort === 'ASC' ? Number('-1') : 1;
      }
      return 0;
    });
    return sortedPlanets;
  };

  // useEffect(orderPlanets, [filter.filters.order]);

  // Order filters
  const orderFilters = () => {
    const filteredByName = filterPlanetsByName();
    const filteredByNumericValue = filterPlanetsByNumericValue(filteredByName);
    const orderedPlanets = orderPlanets(filteredByNumericValue);
    setPlanets(orderedPlanets);
  };

  useEffect(orderFilters, [filter]);

  const renderPlanetRow = () => planets.map((planet) => {
    const plantetInfos = Object.values(planet);
    return (
      <tr key={ planet.name }>
        {plantetInfos.map((info) => <td key={ info }>{info}</td>)}
      </tr>);
  });

  return (
    <table className="planets-table">
      <thead>
        <tr>
          {Object.keys(results[0]).map((info) => <th key={ info }>{info}</th>)}
        </tr>
      </thead>
      <tbody>
        {renderPlanetRow()}
      </tbody>
    </table>
  );
}

export default TableContent;
