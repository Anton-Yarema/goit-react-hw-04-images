import { useState } from 'react';
import css from './SearchBar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PropTypes from 'prop-types';
import { ImSearch } from 'react-icons/im';

const SearchBar = ({ onSubmit }) => {
  const [imagesName, setImagesName] = useState('');

  const handleChange = event => {
    setImagesName(event.currentTarget.value.toLowerCase());
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (imagesName.trim() === '') {
      toast.warn('Введите слово в поиск ', {
        theme: 'colored',
      });
      return;
    }
    onSubmit(imagesName);
    setImagesName('');
  };

  return (
    <header className={css.Searchbar}>
      <form onSubmit={handleSubmit} className={css.SearchForm}>
        <button type="submit" className={css.SearchFormButton}>
          <ImSearch />
        </button>

        <div className={css.SearchFormInputContainer}>
          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imagesName}
            onChange={handleChange}
          />
        </div>
      </form>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;
