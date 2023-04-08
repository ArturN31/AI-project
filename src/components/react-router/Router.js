import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from '../../pages/homepage';
import TextAnalysis from '../../pages/text-analysis';
import NewsAnalysisTheme from '../../pages/news-analysis-theme';
import NewsAnalysisDate from '../../pages/news-analysis-date';
import Map from '../../pages/map';
import NoMatch from '../../pages/no-match';
import Navigation from './Navigation';

//Simple header of the page
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={ <Navigation/> }>
                    <Route path='/' element={ <Homepage/> }/> {/* SENTIMENT ANALYSIS INFORMATION */}
                    <Route path='/TextAnalysis' element={ <TextAnalysis/> }/> {/* SENTIMENT ANALYSIS OF TEXT ENTERED BY USER */}
                    <Route path='/NewsAnalysisTheme' element={ <NewsAnalysisTheme/> }/> {/* SENTIMENT ANALYSIS OF NEWS BASED ON THEME AND COUNT */}
                    <Route path='/NewsAnalysisDate' element={ <NewsAnalysisDate/> }/> {/* SENTIMENT ANALYSIS OF NEWS BASED ON DATE AND COUNT */}
                    <Route path='/Map' element={ <Map/> }/> {/* SENTIMENT ANALYSIS OF NEWS BASED ON DATE AND COUNT - DISPLAYED ON A MAP AS PINS */}
                    <Route path='*' element={ <NoMatch/> }/> {/* 404 */}
                </Route>
            </Routes>
        </BrowserRouter>
    )
};

export default Router;