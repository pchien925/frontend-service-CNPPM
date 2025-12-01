import { useSelector } from 'react-redux';
import AppLoading from './components/AppLoading';
import AppRoutes from './routes';
import { selectAuthLoading } from './store/selectors/authSelector';

function App() {
  const loading = useSelector(selectAuthLoading

  );
  return (
    <>
      {loading && <AppLoading />}
      <AppRoutes /> 
    </>
  );
}

export default App;
