import React from 'react';
import PropTypes from 'prop-types';

const AddItem = ({ categories, addItem, message, itemEdit, saveItem, removeItem }) => {
  const [name, setName] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [edit, setEdit] = React.useState(false);

  React.useEffect(() => {
    if (Object.keys(itemEdit).length) {
      setName(itemEdit.name);
      setCategory(itemEdit.category);
      setEdit(true);
    }
  }, [itemEdit])

  const handleSubmit = e => {
    e.preventDefault();
    if (edit) {
      saveItem({ name, category });
      setEdit(false);
    }
    else {
      addItem({ name, category });
    }
    setName('');
    setCategory('');
  }

  const handleRemoveItem = () => {
    removeItem();
    setName('');
    setCategory('');
    setEdit(false);
  }

  return (
    <div className="add-item">
      <h4>Add Item</h4>
      <form onSubmit={e => handleSubmit(e)}>
        <div className="item-field">
          <label htmlFor="item-name">Name</label>
          <input
            type="text"
            id="item-name"
            name="itemName"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="item-field">
          <label htmlFor="category-id">Category</label>
          <select
            id="category-id"
            name="categoryId"
            value={category}
            onChange={e => setCategory(e.target.value)}
            disabled={!categories.length}
          >
            {categories.map(category => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
        <div>
          <button type="submit" disabled={!name}>{edit ? 'Save' : 'Add'}</button>
          {edit ? <button type="button" onClick={() => handleRemoveItem()}>Remove</button> : null}
        </div>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

AddItem.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  addItem: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default AddItem;
