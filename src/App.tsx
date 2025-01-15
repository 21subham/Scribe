import Header from "./components/Header";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="flex flex-col p-4 max-w-[1000px] mx-auto w-full">
      <section className="min-h-screen flex flex-col">
        <Header />
        <Homepage />
      </section>
      <h1>Chai</h1>
      <footer></footer>
    </div>
  );
}

export default App;
