import {useEffect, useState} from 'react';

// Types
export interface Product {
    id: number;
    title: string;
    price: number;
    category: string;
    description: string;
    image: string;
    inventory: number;
    rating: number;
    reviews: number;
}

// Backward-compatibility alias (was iProduct)
export type iProduct = Product;

// External API payload types (extracted to remove `any` and document input)
type ApiRating = number | { rate?: number };

interface ApiProduct {
    id?: number | string;
    title?: string;
    price?: number | string;
    category?: string;
    description?: string;
    image?: string;
    images?: string[];
    inventory?: number | string;
    stock?: number | string;
    rating?: ApiRating;
    reviews?: number | string;
    reviewsCount?: number | string;
}

// Constants
const API_PRODUCTS_URL = 'https://dummyjson.com/products' as const;

// In-memory store (kept for compatibility with existing callers)
export const PRODUCTS: Product[] = [];

/**
 * Map raw API payload to the Product domain model.
 * Isolated for testability and readability.
 */
function normalizeProduct(p: ApiProduct): Product {
    const ratingValue =
        typeof p?.rating === 'number'
            ? p.rating
            : typeof (p?.rating as { rate?: number } | undefined)?.rate === 'number'
                ? (p.rating as { rate?: number }).rate!
                : 0;

    const imageValue =
        Array.isArray(p?.images) && p.images.length > 0 ? p.images[0] : p?.image ?? '';

    return {
        id: Number(p?.id) || 0,
        title: String(p?.title ?? ''),
        price: Number(p?.price) || 0,
        category: String(p?.category ?? ''),
        description: String(p?.description ?? ''),
        image: String(imageValue),
        inventory: Number(p?.inventory ?? p?.stock ?? 0),
        rating: Number(ratingValue) || 0,
        reviews: Number(p?.reviews ?? p?.reviewsCount ?? 0) || 0,
    };
}

/**
 * New, clearer API for fetching products.
 * - Returns the normalized Product[]
 * - Updates the shared PRODUCTS array in-place for compatibility
 */
export async function loadProducts(): Promise<Product[]> {
    console.log('Fetching products...');
    const res = await fetch(API_PRODUCTS_URL);
    if (!res.ok) {
        const text = await res.text().catch(() => '');
        throw new Error(
            `Failed to fetch products: ${res.status} ${res.statusText}${text ? ' - ' + text : ''}`
        );
    }
    const json = (await res.json()) as { products?: unknown[] };
    const items = Array.isArray(json.products) ? json.products.map(p => normalizeProduct(p as ApiProduct)) : [];
    // Refresh shared store atomically
    PRODUCTS.length = 0;
    PRODUCTS.push(...items);
    return PRODUCTS;
}

/**
 * Backward-compatible wrapper (previously named fetchProducts with side effects only).
 * Callers that ignore the return value can keep using this.
 */
export function fetchProducts(): Promise<Product[]> {
    return loadProducts();
}

function ProductCard({product}: { product: Product }) {
    return (
        <div className="card" key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <img src={product.image} alt={product.title}/>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Reviews: {product.reviews}</p>
            <p>Inventory: {product.inventory}</p>
        </div>
    );
}

function ProductList() {
    // Initialize from legacy store for compatibility, then hydrate from API
    const [items, setItems] = useState<Product[]>(PRODUCTS.slice());

    useEffect(() => {
        let active = true;
        loadProducts()
            .then(products => {
                if (active) setItems(products);
            })
            .catch(() => {
                // Optionally handle error UI; keep initial PRODUCTS as fallback
            });
        return () => {
            active = false;
        };
    }, []);

    return (
        <div>
            {items.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </div>
    );
}

export default function Products() {
    return <ProductList/>;
}