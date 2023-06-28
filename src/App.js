import { Fragment, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

import { OnlyHeader } from '@/layouts';
import NotFound from './components/common/NotFound';

function App() {
    return (
       
        <Router>
            <div className="App">
            
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;
                        let Layout = DefaultLayout;
                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            
                            <Route
                                key={index}
                                path={route.path}
                                element={
                                    <Layout >
                                        <Page />
                                    </Layout>
                                }
                            />
                            
                        );
                    })}
                    <Route
                        path="*"
                        element={
                            <OnlyHeader>
                                <NotFound />
                            </OnlyHeader>
                        }
                    />
                </Routes>
                
            </div>
        </Router>
    );
    
}

export default App;
