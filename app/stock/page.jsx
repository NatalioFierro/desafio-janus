import Navbar from "../components/nav/NavBar";
import StockComp from "../components/stock/StockComp";
export default function Stock() {
  return (
    <main>
      <Navbar />
      <div className="janus">Listado de Stock</div>
      <StockComp />
    </main>
  );
}
