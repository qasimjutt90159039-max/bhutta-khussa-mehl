import React, { useEffect, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  compareAtPrice: "",
  category: "Men",
  sizes: "",
  colors: "",
  images: "",
  stock: "",
  featured: false,
};

const AdminDashboard = () => {
  const { admin, logout } = useAuth();
  const [tab, setTab] = useState("products");

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [formMessage, setFormMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const loadProducts = () => {
    api.get("/products", { params: { limit: 100 } }).then(({ data }) => setProducts(data.products));
  };

  const loadOrders = () => {
    api.get("/orders").then(({ data }) => setOrders(data));
  };

  useEffect(() => {
    Promise.all([
      api.get("/products", { params: { limit: 100 } }),
      api.get("/orders"),
    ])
      .then(([prodRes, orderRes]) => {
        setProducts(prodRes.data.products);
        setOrders(orderRes.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const resetForm = () => {
    setForm(emptyProduct);
    setEditingId(null);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const buildPayload = () => ({
    name: form.name,
    description: form.description,
    price: Number(form.price),
    compareAtPrice: form.compareAtPrice ? Number(form.compareAtPrice) : null,
    category: form.category,
    sizes: form.sizes ? form.sizes.split(",").map((s) => Number(s.trim())).filter(Boolean) : [],
    colors: form.colors ? form.colors.split(",").map((c) => c.trim()).filter(Boolean) : [],
    images: form.images ? form.images.split(",").map((i) => i.trim()).filter(Boolean) : [],
    stock: Number(form.stock),
    featured: form.featured,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormMessage("");
    try {
      if (editingId) {
        await api.put(`/products/${editingId}`, buildPayload());
        setFormMessage("Product updated successfully.");
      } else {
        await api.post("/products", buildPayload());
        setFormMessage("Product added successfully. You can keep adding more.");
      }
      resetForm();
      loadProducts();
    } catch (err) {
      setFormMessage(err.response?.data?.message || "Something went wrong. Please check the fields.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      compareAtPrice: product.compareAtPrice || "",
      category: product.category,
      sizes: (product.sizes || []).join(", "),
      colors: (product.colors || []).join(", "),
      images: (product.images || []).join(", "),
      stock: product.stock,
      featured: product.featured,
    });
    setTab("add");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product permanently?")) return;
    await api.delete(`/products/${id}`);
    loadProducts();
  };

  const handleOrderStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    loadOrders();
  };

  if (loading) return <p className="text-stone text-center py-24">Loading dashboard...</p>;

  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl text-ivory">Admin Dashboard</h1>
          <p className="text-stone text-sm">Signed in as {admin?.email}</p>
        </div>
        <button onClick={logout} className="text-sm text-stone hover:text-maroon">
          Log Out
        </button>
      </div>

      <div className="flex gap-6 border-b border-brass/20 mb-10">
        {["products", "add", "orders"].map((t) => (
          <button
            key={t}
            onClick={() => {
              setTab(t);
              if (t !== "add") resetForm();
            }}
            className={`pb-3 text-sm capitalize ${
              tab === t ? "text-brass border-b-2 border-brass" : "text-stone"
            }`}
          >
            {t === "add" ? (editingId ? "Edit Product" : "Add Product") : t}
          </button>
        ))}
      </div>

      {tab === "products" && (
        <div className="flex flex-col divide-y divide-brass/10">
          {products.length === 0 && <p className="text-stone">No products yet. Add your first one.</p>}
          {products.map((p) => (
            <div key={p._id} className="flex items-center justify-between py-4 gap-4">
              <div>
                <p className="text-ivory text-sm">{p.name}</p>
                <p className="text-stone text-xs">
                  {p.category} &middot; Rs. {p.price.toLocaleString()} &middot; Stock: {p.stock}
                </p>
              </div>
              <div className="flex gap-3">
                <button onClick={() => handleEdit(p)} className="text-xs text-brass">
                  Edit
                </button>
                <button onClick={() => handleDelete(p._id)} className="text-xs text-maroon">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "add" && (
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 max-w-3xl">
          {formMessage && (
            <p className="md:col-span-2 text-sm text-brass">{formMessage}</p>
          )}
          <div className="md:col-span-2">
            <label className="text-sm text-ivory block mb-1">Product Name</label>
            <input
              required
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-ivory block mb-1">Description</label>
            <textarea
              required
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-ivory block mb-1">Price (Rs.)</label>
            <input
              required
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-ivory block mb-1">Compare-at Price (optional)</label>
            <input
              type="number"
              name="compareAtPrice"
              value={form.compareAtPrice}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-ivory block mb-1">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            >
              {["Men", "Women", "Kids", "Wedding", "Casual"].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm text-ivory block mb-1">Stock Quantity</label>
            <input
              required
              type="number"
              name="stock"
              value={form.stock}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-ivory block mb-1">Sizes (comma separated)</label>
            <input
              name="sizes"
              placeholder="39, 40, 41"
              value={form.sizes}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
          </div>

          <div>
            <label className="text-sm text-ivory block mb-1">Colours (comma separated)</label>
            <input
              name="colors"
              placeholder="Black, Brown"
              value={form.colors}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-ivory block mb-1">Image URLs (comma separated)</label>
            <input
              name="images"
              placeholder="https://.../image1.jpg, https://.../image2.jpg"
              value={form.images}
              onChange={handleChange}
              className="w-full bg-charcoal border border-brass/20 text-ivory px-4 py-3 text-sm focus:border-brass outline-none"
            />
            <p className="text-xs text-stone mt-1">
              Upload photos to any image host (Cloudinary, imgur, etc.) and paste the links here.
            </p>
          </div>

          <label className="flex items-center gap-2 text-sm text-ivory md:col-span-2">
            <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
            Feature this product on the homepage
          </label>

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="bg-brass text-ink px-7 py-3 text-sm hover:bg-ivory transition-colors disabled:opacity-50"
            >
              {submitting ? "Saving..." : editingId ? "Update Product" : "Add Product"}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="text-sm text-stone">
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      )}

      {tab === "orders" && (
        <div className="flex flex-col divide-y divide-brass/10">
          {orders.length === 0 && <p className="text-stone">No orders yet.</p>}
          {orders.map((o) => (
            <div key={o._id} className="py-5">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <div>
                  <p className="text-ivory text-sm">{o.customer.fullName} &middot; {o.customer.phone}</p>
                  <p className="text-stone text-xs">{o.customer.address}, {o.customer.city}</p>
                </div>
                <select
                  value={o.status}
                  onChange={(e) => handleOrderStatus(o._id, e.target.value)}
                  className="bg-charcoal border border-brass/20 text-ivory text-xs px-3 py-2"
                >
                  {["Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <p className="text-xs text-stone">
                {o.items.map((i) => `${i.name} x${i.quantity}`).join(", ")}
              </p>
              <p className="text-brass text-sm mt-1">Rs. {o.total.toLocaleString()} &middot; {o.paymentMethod}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
