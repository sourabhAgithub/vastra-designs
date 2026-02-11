import Link from "next/link";
import { products } from "../lib/products";

export default function Products() {
  return (
    <div>
      <h1>Our Collection</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              border: "1px solid #eee",
              padding: "20px",
            }}
          >
            <img src={product.image} width="100%" />
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>

            <Link href={`/products/${product.id}`}>View Details →</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
