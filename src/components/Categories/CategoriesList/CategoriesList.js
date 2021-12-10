import React from 'react';
import PropTypes from 'prop-types';

const CategoriesList = ({ categories, setEdit }) => {
  return (
    <div>
      <table className="list-table">
        <tr>
          <th>
            ID
          </th>
          <th>
            Name
          </th>
        </tr>
        {categories.map(category => (
          <tr onClick={() => setEdit(category.id)}>
            <td>{category.id}</td>
            <td>{category.name}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};

CategoriesList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default CategoriesList;
