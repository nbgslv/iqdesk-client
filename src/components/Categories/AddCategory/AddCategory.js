import React from 'react';
import PropTypes from 'prop-types';

const AddCategory = ({ addCategory, message, categoryEdit, saveCategory, removeCategory }) => {
  const [name, setName] = React.useState('');
  const [edit, setEdit] = React.useState('');

  React.useEffect(() => {
    if (Object.keys(categoryEdit).length) {
      setName(categoryEdit.name);
      setEdit(true);
    }
  }, [categoryEdit]);

  const handleSubmit = e => {
    e.preventDefault();
    if (edit) {
      saveCategory({ name });
      setEdit(false);
    } else {
      addCategory({ name });
    }
    setName('');
  }

  const handleRemoveCategory = () => {
    removeCategory();
    setName('');
    setEdit(false);
  }

  return (
    <div className="add-item">
      <h4>Add Category</h4>
        <form onSubmit={e => handleSubmit(e)}>
          <div className="item-field">
            <label htmlFor="category-name">Name: </label>
            <input
              type="text"
              name="category-name"
              id="category-name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <button type="submit" disabled={!name}>{edit ? 'Save' : 'Add'}</button>
          {edit ? <button type="button" onClick={() => handleRemoveCategory()}>Remove</button> : null}
        </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

AddCategory.propTypes = {
  addCategory: PropTypes.func.isRequired,
  message: PropTypes.string,
};

AddCategory.defaultProps = {
  message: '',
};

export default AddCategory;