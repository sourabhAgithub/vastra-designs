"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function OrderPage() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    quantity: 1,
    notes: "",
  });

  const [errors, setErrors] = useState<any>({});

  // const validateForm = () => {
  //   const newErrors: any = {};

  //   // Name Validations
  // if(!form)};

  const submitOrder = async () => {
    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({
        product,
        ...form,
      }),
    });

    alert("Order submitted!");
  };

  return (
    <div>
      <h1>Place Your Order</h1>
      <p>Product: {product}</p>

      <form style={{ display: "grid", gap: "15px", maxWidth: "400px" }}>
        <input
          placeholder="Full Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Phone Number"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <textarea
          placeholder="Address"
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          type="number"
          min="1"
          value={form.quantity}
          onChange={(e) =>
            setForm({ ...form, quantity: Number(e.target.value) })
          }
        />

        <textarea
          placeholder="Notes (optional)"
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
        />

        <button type="button" onClick={submitOrder}>
          Submit Order
        </button>
      </form>
    </div>
  );
}
