import Link from "next/link";
import { products } from "../../lib/products";

export default async function ProductDetail({ params }: any) {
  const product = products.find((p) => p.id === params.id);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <img src={product.image} width="400" />
      <p style={{ fontSize: "18px" }}>₹{product.price}</p>
      <p>{product.description}</p>

      <br />

      <Link href={`/order?product=${product.id}`}>Order Now →</Link>
    </div>
  );
}
