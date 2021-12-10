import React from 'react';
import PropTypes from 'prop-types';

const ItemsList = ({ items, categories, setEdit }) => {
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
          <th>
            Category
          </th>
        </tr>
        {items.map(item => (
          <tr onClick={() => setEdit(item.id)}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              {
                categories.find(
                  category =>
                    category.id === item.category
                )?.name
                  || ''
              }
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

ItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setEdit: PropTypes.func.isRequired,
};

export default ItemsList;