import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { privateRoutes, publicRoutes } from './routes';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {publicRoutes.map((route, index) => {
            const Page = route.component;
            return <Route key={index} path={route.path} element={<Page />} />;
          })}
          {privateRoutes.map((route, index) => {
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <ProtectedRoute>
                    <Page />
                  </ProtectedRoute>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
