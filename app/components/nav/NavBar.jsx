import Link from "next/link";
import "../../globals.css";
const Navbar = () => {
  return (
    <nav className="nav">
      <div className="links">
        <Link href={"/"}>Inicio</Link>
        <Link href={"/producto"}>Cargar Producto</Link>
        <Link href={"/stock"}>Ver Stock</Link>
      </div>
    </nav>
  );
};

export default Navbar;
