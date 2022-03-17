import React, { KeyboardEvent, useState } from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { SearchProps } from './Search.props';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';

import SearchIcon from './search.svg';
import styles from './Search.module.css';

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const router = useRouter();

  const callSearch = () => {
    router.push({
      pathname: '/search',
      query: {
        q: search
      }
    });
  };

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') callSearch();
  };

  return (
    <form className={cn(className, styles.search)} {...props} role="search">
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKey}
      />
      <Button
        appearance="primary"
        className={styles.button}
        onClick={callSearch}
        aria-label="Искать по сайту"
      >
        <SearchIcon />
      </Button>
    </form>
  );
};
