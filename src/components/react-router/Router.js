import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../../pages/homepage';
import TextAnalysis from '../../pages/text-analysis';
import NewsAnalysis from '../../pages/news-analysis';
import Map from '../../pages/map';
import NoMatch from '../../pages/no-match';
import Navigation from './Navigation';

//Simple header of the page
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Navigation/> }>
                    <Route path='/' element={ <Homepage/> }/>
                    <Route path='/TextAnalysis' element={ <TextAnalysis/> }/>
                    <Route path='/NewsAnalysis' element={ <NewsAnalysis/> }/>
                    <Route path='/Map' element={ <Map/> }/>
                    <Route path='*' element={ <NoMatch/> }/>
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;