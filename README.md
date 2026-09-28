# 🛍️ SHOPVERSE — Next-Gen Full-Stack E-Commerce Platform

[![Next.js](https://img.shields.io/badge/Next.js-16.3.6-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Ready-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Redis](https://img.shields.io/badge/Redis-Cache-DC382D?style=for-the-badge&logo=redis)](https://redis.io/)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://shopverse-app.vercel.app)

> **SHOPVERSE** is an ultra-fast, modern, full-stack lifestyle fashion and apparel e-commerce web platform built with **Next.js 16 (Turbopack)**, **React 19**, **Tailwind CSS v4**, and **Shadcn UI**. It features an end-to-end shopping experience, comprehensive multi-role authentication (Customer / Super Admin), real-time cart persistence, multi-currency checkout with Stripe, and an intuitive Admin Management Dashboard.

---

## 🌐 Live Demonstrations & Links

- **Production URL**: [https://shopverse-app.vercel.app](https://shopverse-app.vercel.app)
- **Alternate Mirror**: [https://shopverse-live.vercel.app](https://shopverse-live.vercel.app)
- **Source Code**: [https://github.com/Adnan4141/shopverse-ecommerce](https://github.com/Adnan4141/shopverse-ecommerce)

---

## ⚡ Quick Start Demo Credentials

For quick evaluation and testing without registering a new account:

| Role | Email | Password | Access Level |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@shopverse.com` | `admin123` | Full Store & Admin Dashboard Access |
| **Demo Customer** | Register or login with any custom email | `password123` | Storefront, Cart, Orders & Profile |

> 💡 **Tip:** On the `/login` page, simply click the **⚡ Admin Demo Login** card to auto-fill credentials in 1 click!

---

## ✨ Core Features

### 🛍️ Storefront & User Experience
- **Fluid Modern Layout**: Minimalist editorial aesthetic inspired by luxury fashion catalogs, with custom high-definition typography and branding.
- **Continuous Marquee Announcement**: Dynamic animated top notification ticker showcasing flash sales and free shipping offers.
- **Instant Search & Real-Time Filters**:
  - Live client-side keyword search across product names, categories, and tags.
  - Multi-attribute filtering (Category: Men, Women, Kids; Subcategory: Topwear, Bottomwear, Winterwear).
  - Price sorting: *Low to High*, *High to Low*, and *Relevant*.
- **Interactive Product Catalog**:
  - Multi-image gallery with interactive preview thumbnails.
  - Dynamic size selector (`S`, `M`, `L`, `XL`, `XXL`) with instant inventory validation.
  - Automatic Related Products carousel powered by category heuristics.
- **Cart & Checkout Architecture**:
  - Persistent shopping cart backed by local storage and state hydration.
  - Dynamic quantity controllers with immediate subtotal and delivery charge calculations.
  - Dual checkout methods:
    1. **Stripe Payment Gateway**: Secure hosted credit/debit card checkout.
    2. **Cash on Delivery (COD)**: Frictionless one-click order confirmation.
- **Customer Account Management**:
  - User profile dashboard displaying saved addresses, account details, and joined date.
  - Dedicated **My Orders** screen tracking shipment status (`Order Placed`, `Packing`, `Shipped`, `Out for delivery`, `Delivered`).

### 🛡️ Admin Dashboard & Management Suite
- **Secure Role-Based Routing**: Admin portal is protected and only accessible when authenticated as an administrator.
- **Live KPI Analytics Cards**: Instant visibility into Total Revenue, Total Orders count, Active Products count, and Order fulfillment statuses.
- **Product Management**:
  - Add new products with multi-image previews, categorization, pricing, sizes, and bestseller toggles.
  - Real-time catalog listing with instant delete action.
- **Order Pipeline & Status Control**:
  - Real-time order stream displaying customer information, items purchased, shipping address, and payment status.
  - Inline fulfillment status dropdown to update order lifecycle in real time.
- **Super Admin Data Seeding Tool**:
  - One-click initial catalog database seeder (`/admin/seed`) to reset and populate mock catalog data whenever required.

---

## 🏗️ Architecture & Tech Stack

```
                        ┌──────────────────────────────┐
                        │   Browser (Next.js Client)   │
                        │ React 19 + Tailwind CSS v4   │
                        └──────────────┬───────────────┘
                                       │
                         Next.js App Router (RSC + API)
                                       │
           ┌───────────────────────────┼───────────────────────────┐
           ▼                           ▼                           ▼
┌─────────────────────┐     ┌─────────────────────┐     ┌─────────────────────┐
│  Authentication     │     │  Product & Orders   │     │  Payments Engine    │
│  JWT / Secure Roles │     │  CRUD API Endpoints │     │  Stripe Gateway     │
└──────────┬──────────┘     └──────────┬──────────┘     └──────────┬──────────┘
           │                           │                           │
           └───────────────────────────┼───────────────────────────┘
                                       ▼
                    ┌─────────────────────────────────────┐
                    │ Enterprise Layer Ready:             │
                    │ • PostgreSQL / Prisma ORM           │
                    │ • Redis (Sessions & Caching)        │
                    │ • Cloudinary / S3 Image Storage     │
                    └─────────────────────────────────────┘
```

| Layer | Technologies |
| :--- | :--- |
| **Frontend Framework** | [Next.js 16.3.6](https://nextjs.org/) (App Router, Turbopack, React Server Components) |
| **UI Library** | [React 19.2.8](https://react.dev/), [Lucide React](https://lucide.dev/), [Shadcn UI](https://ui.shadcn.com/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) with PostCSS & `@tailwindcss/postcss` |
| **State Management** | React Context API (`ShopContext`) with client-side persistence |
| **Payment Gateway** | [Stripe](https://stripe.com/) (`@stripe/stripe-js`, `stripe` SDK) |
| **Database Architecture** | Structured for **PostgreSQL** (Prisma / Drizzle ORM) & **Redis** cache-aside caching |
| **Notifications** | [Sonner](https://sonner.emilkowal.ski/) toast system |
| **Deployment** | [Vercel](https://vercel.com/) with automated CI/CD and Edge Network CDN |

---

## 🔄 User & Admin Workflows

```mermaid
flowchart TD
    Start([Visitor Enters Store]) --> Browse[Explore Home & Collection]
    Browse --> Search[Search / Filter Catalog]
    Search --> ViewProduct[Open Product Page]
    ViewProduct --> SelectSize[Select Size & Add to Cart]
    SelectSize --> Cart[Review Shopping Cart]
    Cart --> AuthCheck{Logged In?}
    AuthCheck -- No --> Login[Sign In / Register / 1-Click Demo]
    AuthCheck -- Yes --> Checkout[Place Order Page]
    Login --> Checkout
    Checkout --> PayChoice{Payment Method}
    PayChoice -- Stripe --> StripePortal[Stripe Checkout Card Payment]
    PayChoice -- COD --> OrderSuccess[Order Confirmed]
    StripePortal --> OrderSuccess
    OrderSuccess --> OrderHistory[View In 'My Orders']

    subgraph Admin Pipeline
        AdminLogin[Login as admin@shopverse.com] --> AdminNav[Click 'Admin Panel']
        AdminNav --> Dashboard[Admin KPI Dashboard]
        Dashboard --> AddItem[Add New Products]
        Dashboard --> ManageList[Manage Catalog]
        Dashboard --> UpdateOrders[Change Order Fulfillment Status]
    end
```

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js**: `v20.x` or `v24.x` recommended
- **Package Manager**: `npm`, `pnpm`, or `yarn`
- **Git**

### 2. Clone the Repository
```bash
git clone https://github.com/Adnan4141/shopverse-ecommerce.git
cd shopverse-ecommerce
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Stripe Payments (Optional for local test mode)
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key

# Database & Cache (For PostgreSQL & Redis scaling)
DATABASE_URL="postgresql://postgres:password@localhost:5432/shopverse?schema=public"
REDIS_URL="redis://localhost:6379"

# JWT Secret
JWT_SECRET=super_secret_jwt_key_shopverse_2026
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Production Build & Test
```bash
npm run build
npm run start
```

---

## 📁 Project Directory Structure

```plaintext
shopverse-ecommerce/
├── public/
│   ├── assets/              # High-res logos, banners, icons, product images
│   ├── favicon.ico          # Browser favicon
│   └── favicon.png          # High-definition brand favicon
├── src/
│   ├── app/
│   │   ├── admin/           # Admin Dashboard routes
│   │   │   ├── add/         # Add product page
│   │   │   ├── list/        # Product catalog table
│   │   │   ├── orders/      # Admin order fulfillment
│   │   │   ├── seed/        # Database seed tool
│   │   │   └── page.tsx     # KPI analytics dashboard
│   │   ├── api/             # Next.js Serverless API routes
│   │   │   ├── admin/seed/  # Seed database endpoint
│   │   │   ├── auth/        # Login & Register endpoints
│   │   │   ├── order/       # Order management endpoints
│   │   │   ├── payment/     # Stripe session creation
│   │   │   └── products/    # Product CRUD endpoints
│   │   ├── cart/            # Cart page
│   │   ├── collection/      # Filterable product catalog
│   │   ├── login/           # Auth login & demo auto-fill
│   │   ├── register/        # Registration page
│   │   ├── orders/          # Customer order history
│   │   ├── place-order/     # Checkout with Stripe & COD
│   │   ├── product/[id]/    # Dynamic product details
│   │   ├── profile/         # User profile page
│   │   ├── layout.tsx       # Root layout & Toaster
│   │   └── page.tsx         # Storefront landing page
│   ├── components/
│   │   ├── admin/           # Admin Navbar & Sidebar
│   │   ├── common/          # Navbar, Footer, TopBanner, SearchBar
│   │   ├── home/            # Hero, LatestCollection, BestSeller, Policy
│   │   └── ui/              # Shadcn accessible UI primitives
│   ├── context/
│   │   └── shop-context.tsx # Global shopping cart & auth state provider
│   ├── data/
│   │   └── products.ts      # Comprehensive catalog seed dataset
│   └── lib/
│       ├── stripe.ts        # Stripe server-side instance
│       └── utils.ts         # Tailwind clsx utility
├── documentations.md        # Comprehensive technical documentation & DB schemas
├── package.json
└── README.md
```

---

## 🔒 Security Best Practices
- **Role-Based Authorization**: Client navigation guards and API validation ensure only authorized administrators access back-office tools.
- **Sensitive Key Protection**: Stripe secret credentials and database tokens are kept exclusively in server environment variables.
- **Input Sanitization**: Safe form inputs and numeric validators prevent malformed payload submissions.

---

## 📄 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  Crafted with ❤️ by <a href="https://github.com/Adnan4141">Adnan</a> • Powered by <strong>Next.js & Vercel</strong>
</p>
