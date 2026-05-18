import 'isomorphic-fetch';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { createContext } from 'react';
import { useCart } from '../hooks/useCart';
import { Header } from '../components/Header';
import './styles.css';

export const CartContext = createContext<any>(null);

function CustomApp({ Component, pageProps }: AppProps) {
  const cart = useCart();

  return (
    <CartContext.Provider value={{ cart }}>
      <Head>
        <title>Kramp Webshop</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Header />
      <main className="app">
        <Component {...pageProps} />
      </main>
    </CartContext.Provider>
  );
}

export default CustomApp;
