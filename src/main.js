"use strict"
import React from 'react';
import { render } from 'react-dom';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {  createStore , applyMiddleware } from 'redux';
import reducers from './reducers/index';

// STEP 1 create the store
const createStoreWithMiddleware = applyMiddleware(thunk,logger)(createStore);
const store = createStoreWithMiddleware(reducers ,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({serialize: true}) );


// const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__({serialize: true}));
import  BooksList from './components/pages/booksList';

render(
    <Provider store={store}>
        <BooksList />
    </Provider>,
    document.getElementById('app')
);















// import { postEvents, uploadEvents, deleteEvents } from './actions/booksActions';
// import {addToCart} from './actions/cartActions';



// store.dispatch(postEvents(
//     [{
// 		date: "2017-09-30" ,
//         time: '05:00:00' ,
//         venue: 'Mumbai',
//         description: 'Capgemini drive' ,
//         no_of_people_involved: 15 
//     }]
// ));

// store.dispatch(uploadEvents(
//     {
//         description: 'Capgemini drive',
//         no_of_people_involved: 15
//     }
// ));

// store.dispatch(deleteEvents({date: "2017-08-30" }));

