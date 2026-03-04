import Link from "next/link";
import { products } from "../../lib/products";
import styles from "./page.module.css";

type ProductDetailProps = {
  params: Promise<{ id: string }>;
};

type ProductExtras = {
  longDescription: string;
  highlights: string[];
  specs: {
    label: string;
    value: string;
  }[];
  customerLooks: {
    image: string;
    alt: string;
    name: string;
    occasion: string;
  }[];
};

const defaultExtras: ProductExtras = {
  longDescription:
    "This design is made with premium craftsmanship and finishing, balancing comfort with a polished festive look.",
  highlights: [
    "Tailored silhouette with clean finishing",
    "Breathable fabric choice for all-day wear",
    "Refined detailing suitable for events and celebrations",
  ],
  specs: [
    { label: "Fabric", value: "Premium blended fabric" },
    { label: "Work", value: "Fine handcrafted detailing" },
    { label: "Fit", value: "Comfort fit with custom-size option" },
    { label: "Delivery", value: "7-10 working days after confirmation" },
  ],
  customerLooks: [
    {
      image: "https://via.placeholder.com/640x760?text=Customer+Look+1",
      alt: "Customer wearing the design at a wedding function",
      name: "Ananya R.",
      occasion: "Wedding Reception",
    },
    {
      image: "https://via.placeholder.com/640x760?text=Customer+Look+2",
      alt: "Customer styling the outfit for a festive event",
      name: "Meera K.",
      occasion: "Navratri Celebration",
    },
    {
      image: "https://via.placeholder.com/640x760?text=Customer+Look+3",
      alt: "Customer wearing the outfit for a family event",
      name: "Lakshmi V.",
      occasion: "Family Engagement",
    },
  ],
};

const productExtrasById: Record<string, ProductExtras> = {
  "bridal-blouse-1": {
    longDescription:
      "The Royal Bridal Blouse is designed with intricate finishing and statement craftsmanship, made to pair with silk sarees and heirloom jewelry. It is structured to hold shape beautifully while remaining wearable for longer ceremonies.",
    highlights: [
      "Intricate handcrafted embroidery placement",
      "Neckline and sleeve finishing designed for bridal styling",
      "Structured silhouette to complement heavy saree drapes",
    ],
    specs: [
      { label: "Fabric", value: "Silk blend base with soft inner lining" },
      { label: "Work", value: "Hand embroidery with sequin accents" },
      { label: "Fit", value: "Semi-structured fit with margin for adjustments" },
      { label: "Delivery", value: "10-14 working days" },
    ],
    customerLooks: [
      {
        image: "https://via.placeholder.com/640x760?text=Bridal+Look+1",
        alt: "Bride wearing the royal bridal blouse for muhurtham",
        name: "Sanjana P.",
        occasion: "Muhurtham",
      },
      {
        image: "https://via.placeholder.com/640x760?text=Bridal+Look+2",
        alt: "Customer styling the bridal blouse for reception look",
        name: "Priya N.",
        occasion: "Reception Evening",
      },
      {
        image: "https://via.placeholder.com/640x760?text=Bridal+Look+3",
        alt: "Customer trying the blouse with temple jewelry",
        name: "Ritika S.",
        occasion: "Engagement Function",
      },
    ],
  },
  "churidar-1": {
    longDescription:
      "The Designer Churidar Set is tailored for movement and elegance, combining a flattering cut with practical comfort. It is an easy choice for festive gatherings, poojas, and celebratory family occasions.",
    highlights: [
      "Flow-friendly design with flattering vertical structure",
      "Soft fabric feel for day-to-evening wear",
      "Balanced festive detailing without heavy weight",
    ],
    specs: [
      { label: "Fabric", value: "Breathable viscose-cotton blend" },
      { label: "Work", value: "Thread detailing and neat edge finish" },
      { label: "Fit", value: "Comfort fit with optional custom measurements" },
      { label: "Delivery", value: "7-10 working days" },
    ],
    customerLooks: [
      {
        image: "https://via.placeholder.com/640x760?text=Churidar+Look+1",
        alt: "Customer in churidar set during festive celebration",
        name: "Divya M.",
        occasion: "Festive Pooja",
      },
      {
        image: "https://via.placeholder.com/640x760?text=Churidar+Look+2",
        alt: "Customer wearing churidar set for housewarming",
        name: "Keerthi A.",
        occasion: "Housewarming",
      },
      {
        image: "https://via.placeholder.com/640x760?text=Churidar+Look+3",
        alt: "Customer trying churidar set for evening function",
        name: "Nandita R.",
        occasion: "Evening Sangeet",
      },
    ],
  },
};

export default async function ProductDetail({ params }: ProductDetailProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  const extras = product ? productExtrasById[product.id] ?? defaultExtras : null;

  if (!product) return <div className={styles.notFound}>Product not found</div>;

  return (
    <article className={styles.pdpPage}>
      <Link href="/products" className={styles.backLink}>
        ← Back to Collection
      </Link>

      <section className={styles.heroSection}>
        <div className={styles.heroImageWrap}>
          <img
            src={product.image}
            alt={product.name}
            className={styles.heroImage}
            loading="eager"
          />
        </div>

        <div className={styles.heroContent}>
          <p className={styles.productTag}>Signature Design</p>
          <h1 className={styles.productTitle}>{product.name}</h1>
          <p className={styles.productPrice}>
            ₹{product.price.toLocaleString("en-IN")}
          </p>
          <p className={styles.shortDescription}>{product.description}</p>
          <p className={styles.longDescription}>{extras?.longDescription}</p>

          <ul className={styles.highlightsList}>
            {extras?.highlights.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>

          <div className={styles.actionRow}>
            <Link href={`/order?product=${product.id}`} className={styles.primaryAction}>
              Order This Design
            </Link>
            <Link href="/order" className={styles.secondaryAction}>
              Request Custom Design
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.specsSection}>
        <h2 className={styles.sectionTitle}>Product Details</h2>
        <div className={styles.specsGrid}>
          {extras?.specs.map((spec) => (
            <div key={spec.label} className={styles.specCard}>
              <p className={styles.specLabel}>{spec.label}</p>
              <p className={styles.specValue}>{spec.value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.customerSection}>
        <h2 className={styles.sectionTitle}>People Trying Our Product</h2>
        <p className={styles.customerIntro}>
          Real customer looks and trial moments to help you visualize fit and
          styling.
        </p>
        <div className={styles.customerGrid}>
          {extras?.customerLooks.map((look) => (
            <figure key={`${look.name}-${look.occasion}`} className={styles.customerCard}>
              <img
                src={look.image}
                alt={look.alt}
                className={styles.customerImage}
                loading="lazy"
              />
              <figcaption className={styles.customerCaption}>
                <span className={styles.customerName}>{look.name}</span>
                <span className={styles.customerOccasion}>{look.occasion}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </article>
  );
}
