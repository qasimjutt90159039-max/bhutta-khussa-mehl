# Bhutta Khussa Mehal — Full MERN Stack E-Commerce Store

A complete e-commerce store for **Bhutta Khussa Mehal** (Multan, Pakistan) built with
MongoDB, Express, React, and Node.js (MERN). Includes a customer-facing store and an
admin dashboard for managing products and orders.

- **Store:** 5CPQ+V97, Saddar Multan Cantt Commercial Area, Multan, Pakistan
- **Contact:** 0311-6633159

---

## Project Structure

```
bhutta-khussa-mehal/
├── client/     # React frontend
└── server/     # Node/Express backend + MongoDB models
```

---

## 1. Prerequisites

- Node.js 18+ installed
- A free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
- A free Vercel account: https://vercel.com
- (Optional) A Cloudinary account for image uploads: https://cloudinary.com

---

## 2. Backend Setup (Local)

```bash
cd server
npm install
cp .env.example .env
```

Open `.env` and fill in:
- `MONGO_URI` — from MongoDB Atlas (Database > Connect > Drivers)
- `JWT_SECRET` — any long random string
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for your admin login
- `CLIENT_ORIGIN` — `http://localhost:3000` for local dev

Seed the database with sample products and your admin account:

```bash
npm run seed
```

Start the backend:

```bash
npm run dev
```

The API will run at `http://localhost:5000/api`. Test it by visiting
`http://localhost:5000/api/health` in your browser.

---

## 3. Frontend Setup (Local)

```bash
cd client
npm install
cp .env.example .env
```

Make sure `.env` has:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm start
```

Visit `http://localhost:3000` — your store should be fully working locally:
browse products, add to cart, checkout, and place orders. Log in to
`/admin/login` with the admin credentials you set in the backend `.env` to
add, edit, and delete products, and manage orders.

---

## 4. Deploying to Vercel

You will deploy **two separate Vercel projects**: one for `server/`, one for `client/`.

### A. Deploy the Backend

1. Push this whole project to a GitHub repository.
2. Go to https://vercel.com/new and import your repo.
3. When asked for the **Root Directory**, select `server`.
4. Framework preset: "Other".
5. Add Environment Variables (same as your local `.env`):
   - `MONGO_URI`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `CLIENT_ORIGIN` (you'll update this after deploying the frontend, to its Vercel URL)
6. Deploy. Note the resulting URL, e.g. `https://bhutta-khussa-mehal-api.vercel.app`.
7. Run the seed script once against your production database (you can run
   `npm run seed` locally while `MONGO_URI` in your local `.env` points to
   the same Atlas database used in production).

### B. Deploy the Frontend

1. Go to https://vercel.com/new again and import the same repo a second time.
2. Root Directory: select `client`.
3. Framework preset: "Create React App" (auto-detected).
4. Add Environment Variable:
   - `REACT_APP_API_URL` = `https://bhutta-khussa-mehal-api.vercel.app/api` (your backend URL from step A)
5. Deploy. You'll get a live URL, e.g. `https://bhutta-khussa-mehal.vercel.app`.

### C. Final Connection Step

Go back to your **backend** Vercel project → Settings → Environment Variables,
and update `CLIENT_ORIGIN` to your live frontend URL (e.g.
`https://bhutta-khussa-mehal.vercel.app`), then redeploy the backend so CORS
allows requests from your live store.

---

## 5. Adding Products

Once deployed, log in at `yourstore.com/admin/login` with your admin
credentials and use the **Add Product** tab to add as many khussa items as you
like — name, price, sizes, colours, stock, and image links. Products appear
on the Shop page and Home page (if marked "Featured") immediately.

For images, upload photos to Cloudinary (or any image host) and paste the
resulting URLs into the "Image URLs" field, comma-separated for multiple photos.

---

## 6. Notes

- Cash on Delivery (COD) is enabled by default. To accept online payments,
  integrate a Pakistani payment gateway (e.g. JazzCash, Easypaisa, or
  Stripe if serving international customers) inside `Checkout.js` and
  `orderController.js`.
- The design uses a black + heritage-gold (brass) color palette with serif
  display type (Fraunces) and a clean sans body font (Work Sans), styled to
  suit a traditional handcrafted footwear brand rather than a generic template.
- All product and order data lives in MongoDB — nothing is hardcoded, so the
  store scales to as many products as you add.
