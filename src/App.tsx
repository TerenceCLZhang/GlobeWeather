import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <div className="absolute -z-10 inset-0 bg-black/50"></div>
      <Header />
      <Main />
      <Footer />
    </>
  );
}

export default App;
