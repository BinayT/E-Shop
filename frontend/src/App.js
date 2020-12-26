import { Container } from 'react-bootstrap';
import { Route } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';

function App() {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <h1>Welcome to E-Shop</h1>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/product/:id' exact component={ProductScreen} />
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
