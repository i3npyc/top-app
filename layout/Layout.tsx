import React, { FC, KeyboardEvent, useRef, useState } from 'react';
import cn from 'classnames';

import { AppContextProvider, IAppContext } from '../context/app.context';

import { Header, Sidebar, Footer } from '.';
import { Up } from '../components';
import { LayoutProps } from './LayoutProps';

import styles from './Layout.module.css';

const Layout = ({ children }: LayoutProps): JSX.Element => {
  const [isSkipLink, setiIsSkipLink] = useState<boolean>(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  const openSkipLink = () => {
    setiIsSkipLink(true);
  };

  const skipContentAction = (key: KeyboardEvent) => {
    if (key.code === 'Space' || key.code === 'Enter') {
      key.preventDefault();
      bodyRef.current?.focus();
    }
    setiIsSkipLink(false);
  };

  return (
    <div className={styles.wrapper}>
      <a
        onFocus={openSkipLink}
        tabIndex={1}
        className={cn(styles.skipLink, {
          [styles.displayed]: isSkipLink
        })}
        onKeyDown={skipContentAction}
      >
        Сразу к содержанию
      </a>
      <Header className={styles.header} />
      <Sidebar className={styles.sidebar} />
      <div className={styles.body} ref={bodyRef} tabIndex={0}>
        {children}
      </div>
      <Footer className={styles.footer} />
      <Up />
    </div>
  );
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
  Component: FC<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AppContextProvider menu={props.menu} firstCategory={props.firstCategory}>
        <Layout>
          <Component {...props} />
        </Layout>
      </AppContextProvider>
    );
  };
};
