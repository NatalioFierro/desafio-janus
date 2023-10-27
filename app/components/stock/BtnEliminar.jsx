export default function BtnElimnar({ producto_id }) {
  const handleSubmit = async (id) => {
    const idProducto = {
      id,
    };
    const res = await fetch("http://127.0.0.1:3000/api/deleteProducto", {
      method: "DELETE",
      body: JSON.stringify(idProducto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  };
  return (
    <form
      onSubmit={() => {
        handleSubmit(producto_id);
      }}
    >
      <button type="submit">Eliminar</button>
    </form>
  );
}
