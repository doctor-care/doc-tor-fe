import { Fragment } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '@/routes';
import { DefaultLayout } from '@/layouts';

import { OnlyHeader } from '@/layouts';
import NotFound from './components/common/NotFound';
import { UserContext } from './UserContext';



function App() {
    const user = "user1";
    return (
        <UserContext.Provider value={user}>
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
                                    <Layout>
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
        </UserContext.Provider>
    );
    
}

export default App;
