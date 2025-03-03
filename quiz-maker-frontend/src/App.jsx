import { BrowserRouter as Router, useRoutes } from 'react-router-dom';
import routes from './utils/Approutes';

function AppRoutes() {
  return useRoutes(routes);
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
