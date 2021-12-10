import React from 'react';
import ItemsList from '../components/Items/ItemsList/ItemsList';
import AddItem from '../components/Items/AddItem/AddItem';
import config from '../config';
import './Items.css';

const Items = ({ categories }) => {
  const [items, setItems] = React.useState([]);
  const [message, setMessage] = React.useState('');
  const [itemEdit, setItemEdit] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [refetch, setRefetch] = React.useState(false);

  React.useEffect(() => {
    fetch(config.apiUrl + '/items')
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          let itemsToSet = res.data;
          if (categoryFilter) {
            itemsToSet = itemsToSet.filter(item => item.category === categoryFilter);
          }
          setItems(itemsToSet);
        }
        else setMessage(res.data.error.message);
      })
      .catch(e => console.log(e));

    return () => setRefetch(false);
  }, [categoryFilter, refetch]);

  const handleAddItem = ({ name, category }) => {
    fetch(config.apiUrl + '/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        category,
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setMessage('Added item');
          setItems([
            ...items,
            res.data,
          ]);
        }
        else setMessage(res.data.error.message);
      })
      .catch(e => console.log(e));
  }

  const handleRemoveItem = () => {
    fetch(config.apiUrl + '/items', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: itemEdit.id,
      })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setMessage('Item removed');
          const updatedItems = items.filter(item => item.id !== itemEdit.id);
          setItems(updatedItems);
          setItemEdit('');
        }
        else setMessage(res.data.error.message);
      })
      .catch(e => console.log(e));
  }

  const handleSaveItem = ({ name, category }) => {
    fetch(config.apiUrl + '/items', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: itemEdit.id,
        name,
        category,
      })
    })
    .then(res => res.json())
    .then(res => {
      if (res.success) {
        setMessage('Item saved');
        const updatedItems = items;
        const itemIndex = items.findIndex(item => item.id === res.data.id);
        updatedItems.splice(itemIndex, 1, res.data);
        setItems(updatedItems);
      }
      else setMessage(res.data.error.message);
      setItemEdit('');
    })
    .catch(e => console.log(e));
  }

  const handleSetEdit = id => setItemEdit(items.find(item => item.id === id) || '');

  return (
    <div className="items-container">
      <div>
        <div className="item-field">
          <label htmlFor="category-filter">Filter by category:</label>
          <select
            id="category-filter"
            name="category-filter"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            disabled={!categories.length}
          >
            <option value=""></option>
            {categories.map(category => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
        </div>
      </div>
      {
        items.length ?
          <ItemsList
            items={items}
            categories={categories}
            setEdit={id => handleSetEdit(id)}
          />
        : 'No items found'
      }
      <hr className="divider" />
      <AddItem
        message={message}
        categories={categories}
        addItem={item => handleAddItem(item)}
        itemEdit={itemEdit}
        saveItem={item => handleSaveItem(item)}
        removeItem={() => handleRemoveItem()}
      />
    </div>
  );
};

export default Items;
