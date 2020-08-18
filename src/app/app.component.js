import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ReactiveBase } from '@appbaseio/reactivesearch';
import Navbar from 'components/navbar';
import styles from './app.style.scss';

const FaqPage = lazy(() => import('components/pages/faq'));
const CollectionsPage = lazy(() => import('components/pages/collections'));
const SearchPage = lazy(() => import('components/pages/search'));

export default class App extends React.Component {
  render () {
    return (
      <div className={styles.app}>
        <ReactiveBase app="tweets" url="https://public-key:mfpzsrhddvm7f54ctotnjbhqczu0z35t@thorin-us-east-1.searchly.com">
          <BrowserRouter>
            <Navbar/>
            <Suspense fallback={<div/>}>
              <Switch>
                <Route path="/faq" component={FaqPage}/>
                <Route path="/collections" component={CollectionsPage}/>
                <Route component={SearchPage}/>
              </Switch>
            </Suspense>
          </BrowserRouter>
        </ReactiveBase>
      </div>
    );
  }
}
