import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import MainSection from "./components/MainSection";

function App() {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <MainSection />
    </div>
  );
}

export default App;
