import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './components/cartContext/cartContext.js'; // Updated path to CartProvider
import LandingPage from './pages/landingPage/landingPage.js'; // Updated path
import CollectionTitlePage from './pages/galleryPage/collectionTitlePage.js'; // Ensure this path is correct
import CollectionPage from './components/collectionPage/collectionPage.js';
import AllArtPage from './pages/galleryPage/allArt.js'; 
// import StorePage from './pages/storePage/storePage.js'; // Ensure this path is correct
import ProductPage from './components/productPage/productPage.js'; // Ensure this path is correct
import CartIcon from './components/cartIcon/cartIcon.js'; // Import the CartIcon component
import CartPage from './pages/cartPage/cartPage.js'; // Import the CartPage component
import Contact from './pages/contact/contact.js';

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <CartProvider>
        <CartIcon /> {/* Add the CartIcon component */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/gallery" element={<CollectionTitlePage />} />
          <Route path="/collection/:name" element={<CollectionPage />} />
          <Route path="/all-art" element={<AllArtPage />} />
          {/* <Route path="/store" element={<StorePage />} /> */}
          <Route path="/product/:id" element={<ProductPage />} /> {/* Add this route */}
          <Route path="/cart" element={<CartPage />} /> {/* Add the route for the cart page */}
          <Route path="/contact" element={<Contact />} /> 
        </Routes>
      </CartProvider>
    </Router>
  );
}

export default App;


//you momo 2 un highlight the" import  storepage "  uptop  an in the app function. 