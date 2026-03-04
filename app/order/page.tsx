"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { products } from "../lib/products";
import styles from "./page.module.css";

type OrderForm = {
  name: string;
  phone: string;
  email: string;
  address: string;
  quantity: string;
  notes: string;
};

type FieldName = keyof OrderForm;
type FormErrors = Partial<Record<FieldName, string>>;
type TouchedState = Partial<Record<FieldName, boolean>>;

const initialForm: OrderForm = {
  name: "",
  phone: "",
  email: "",
  address: "",
  quantity: "1",
  notes: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const namePattern = /^[a-zA-Z\s.'-]+$/;

function validateField(field: FieldName, value: string): string {
  const trimmed = value.trim();

  if (field === "name") {
    if (!trimmed) return "Full name is required.";
    if (trimmed.length < 2) return "Name should be at least 2 characters.";
    if (!namePattern.test(trimmed)) return "Use letters and basic punctuation only.";
    return "";
  }

  if (field === "phone") {
    if (!trimmed) return "Phone number is required.";
    const digits = trimmed.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      return "Enter a valid phone number (10-15 digits).";
    }
    return "";
  }

  if (field === "email") {
    if (!trimmed) return "Email is required.";
    if (!emailPattern.test(trimmed)) return "Enter a valid email address.";
    return "";
  }

  if (field === "address") {
    if (!trimmed) return "Address is required.";
    if (trimmed.length < 12) return "Address should be at least 12 characters.";
    return "";
  }

  if (field === "quantity") {
    if (!trimmed) return "Quantity is required.";
    const quantity = Number(trimmed);
    if (!Number.isInteger(quantity)) return "Quantity must be a whole number.";
    if (quantity < 1 || quantity > 25) return "Quantity should be between 1 and 25.";
    return "";
  }

  if (field === "notes") {
    if (trimmed.length > 500) return "Notes should be 500 characters or fewer.";
    return "";
  }

  return "";
}

function validateForm(form: OrderForm): FormErrors {
  const nextErrors: FormErrors = {};

  (Object.keys(form) as FieldName[]).forEach((field) => {
    const error = validateField(field, form[field]);
    if (error) nextErrors[field] = error;
  });

  return nextErrors;
}

export default function OrderPage() {
  const searchParams = useSearchParams();
  const product = searchParams.get("product");

  const selectedProduct = products.find((item) => item.id === product);
  const selectedProductLabel = selectedProduct?.name ?? "Custom Order Request";

  const [form, setForm] = useState<OrderForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedState>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string>("");
  const [submitError, setSubmitError] = useState<string>("");

  const handleChange = (field: FieldName, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));

    if (touched[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    }
  };

  const handleBlur = (field: FieldName) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({
      ...prev,
      [field]: validateField(field, form[field]),
    }));
  };

  const submitOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage("");
    setSubmitError("");

    const newErrors = validateForm(form);
    setErrors(newErrors);

    setTouched({
      name: true,
      phone: true,
      email: true,
      address: true,
      quantity: true,
      notes: true,
    });

    if (Object.values(newErrors).some(Boolean)) {
      setSubmitError("Please fix the highlighted fields before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: selectedProduct?.id ?? product ?? "custom-request",
          productName: selectedProductLabel,
          name: form.name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim().toLowerCase(),
          address: form.address.trim(),
          quantity: Number(form.quantity),
          notes: form.notes.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Could not submit your order.");
      }

      setSubmitMessage("Order submitted successfully. We will contact you soon.");
      setForm(initialForm);
      setErrors({});
      setTouched({});
    } catch {
      setSubmitError("Something went wrong while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.orderPage}>
      <header className={styles.orderHeader}>
        <p className={styles.orderEyebrow}>Vastra Checkout</p>
        <h1 className={styles.orderTitle}>Place Your Order</h1>
        <p className={styles.orderSubtitle}>
          Fill in your details and we will confirm sizing, delivery timeline, and
          order details with you.
        </p>
      </header>

      <div className={styles.orderLayout}>
        <form className={styles.orderForm} onSubmit={submitOrder} noValidate>
          <div className={styles.fieldGroup}>
            <label htmlFor="name" className={styles.label}>
              Full Name *
            </label>
            <input
              id="name"
              name="name"
              className={`${styles.input}${errors.name ? ` ${styles.inputError}` : ""}`}
              placeholder="Enter your full name"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name ? (
              <p id="name-error" className={styles.errorText}>
                {errors.name}
              </p>
            ) : null}
          </div>

          <div className={styles.twoColumn}>
            <div className={styles.fieldGroup}>
              <label htmlFor="phone" className={styles.label}>
                Phone Number *
              </label>
              <input
                id="phone"
                name="phone"
                inputMode="tel"
                className={`${styles.input}${errors.phone ? ` ${styles.inputError}` : ""}`}
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "phone-error" : undefined}
              />
              {errors.phone ? (
                <p id="phone-error" className={styles.errorText}>
                  {errors.phone}
                </p>
              ) : null}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="email" className={styles.label}>
                Email Address *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className={`${styles.input}${errors.email ? ` ${styles.inputError}` : ""}`}
                placeholder="Enter your email address"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                onBlur={() => handleBlur("email")}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email ? (
                <p id="email-error" className={styles.errorText}>
                  {errors.email}
                </p>
              ) : null}
            </div>
          </div>

          <div className={styles.fieldGroup}>
            <label htmlFor="address" className={styles.label}>
              Delivery Address *
            </label>
            <textarea
              id="address"
              name="address"
              className={`${styles.textarea}${errors.address ? ` ${styles.inputError}` : ""}`}
              placeholder="House no, street, area, city, state, pincode"
              value={form.address}
              onChange={(e) => handleChange("address", e.target.value)}
              onBlur={() => handleBlur("address")}
              aria-invalid={Boolean(errors.address)}
              aria-describedby={errors.address ? "address-error" : undefined}
              rows={4}
            />
            {errors.address ? (
              <p id="address-error" className={styles.errorText}>
                {errors.address}
              </p>
            ) : null}
          </div>

          <div className={styles.twoColumn}>
            <div className={styles.fieldGroup}>
              <label htmlFor="quantity" className={styles.label}>
                Quantity *
              </label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                min={1}
                max={25}
                className={`${styles.input}${errors.quantity ? ` ${styles.inputError}` : ""}`}
                value={form.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                onBlur={() => handleBlur("quantity")}
                aria-invalid={Boolean(errors.quantity)}
                aria-describedby={errors.quantity ? "quantity-error" : undefined}
              />
              {errors.quantity ? (
                <p id="quantity-error" className={styles.errorText}>
                  {errors.quantity}
                </p>
              ) : null}
            </div>

            <div className={styles.fieldGroup}>
              <label htmlFor="notes" className={styles.label}>
                Notes (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                className={`${styles.textarea}${errors.notes ? ` ${styles.inputError}` : ""}`}
                placeholder="Any custom sizing, color, or stitch preferences"
                value={form.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                onBlur={() => handleBlur("notes")}
                aria-invalid={Boolean(errors.notes)}
                aria-describedby={errors.notes ? "notes-error" : undefined}
                rows={2}
              />
              {errors.notes ? (
                <p id="notes-error" className={styles.errorText}>
                  {errors.notes}
                </p>
              ) : null}
            </div>
          </div>

          {submitError ? <p className={styles.submitError}>{submitError}</p> : null}
          {submitMessage ? <p className={styles.submitSuccess}>{submitMessage}</p> : null}

          <button className={styles.submitButton} type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Order"}
          </button>
        </form>

        <aside className={styles.orderSummary}>
          <div className={styles.summaryCard}>
            <p className={styles.summaryLabel}>Selected Product</p>
            <h2 className={styles.summaryTitle}>{selectedProductLabel}</h2>
            <p className={styles.summaryMeta}>
              Product ID: {selectedProduct?.id ?? "custom-request"}
            </p>
          </div>

          <div className={styles.summaryCard}>
            <p className={styles.summaryLabel}>What Happens Next</p>
            <ul className={styles.steps}>
              <li>We verify your order details and contact information.</li>
              <li>Our team confirms stitching and delivery timeline.</li>
              <li>Your order is processed after final confirmation.</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
