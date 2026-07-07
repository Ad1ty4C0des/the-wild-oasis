# 🌿 The Wild Oasis — Management Suite

<div align="center">
  <img src="public/logo-light.png" alt="The Wild Oasis Logo" width="200"/>
  
  ### Your premium hotel management platform. 
  *Streamline operations, delight guests, and grow your business with ease.*
  
  <br />

  ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
  ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
  ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
  ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white)
  [![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](#-docker)

</div>

---

## ✨ Overview

**The Wild Oasis** is a fully-featured, full-stack resort management system designed to handle the day-to-day operations of a boutique hotel. 

Recently redesigned with a "**Luxe-Naturalist**" aesthetic, the application provides a premium, highly responsive, and meticulously animated user interface that feels both powerful and elegant. Built with modern React and backed by Supabase, it offers a seamless experience for hotel staff to manage bookings, cabins, and guests.

## 🚀 Key Features

- **📊 Comprehensive Dashboard:** Real-time analytics, sales charts, and occupancy statistics at a glance.
- **📅 Booking Management:** Complete guest lifecycle tracking from unconfirmed reservations to check-outs. Includes dynamic custom-animated filtering and sorting.
- **🏡 Cabin Inventory:** Create, edit, and delete cabin listings, complete with capacity limits, pricing, and discount tracking.
- **🌗 Seamless Dark Mode:** A meticulously crafted dark theme that shifts the aesthetic while maintaining perfect contrast and readability.
- **✨ Premium UI/UX:** Features a Bento-grid layout, custom slide-in animations for dropdowns and context menus, fluid sliding sidebar navigation, and specialized contextual color palettes (e.g., warm cream dashboard vs. clean blue-lavender data tables).
- **📱 Fully Responsive:** Carefully optimized layout that gracefully adapts from massive 24" desktop monitors all the way down to mobile devices, ensuring no workflow is compromised on the go.
- **🔐 Secure Authentication:** Role-based access control and secure login flows powered by Supabase.

## 🛠️ Technology Stack

**Frontend:**
- **React 18** — UI Component Architecture
- **Vite** — Lightning-fast build tool
- **React Router 6** — SPA Navigation
- **TanStack Query (React Query)** — Powerful asynchronous state management and data fetching
- **Styled-Components** — CSS-in-JS for scalable, scoped, and themeable styling
- **React Hook Form** — Performant, flexible, and extensible forms
- **Recharts** — Composable charting library for dashboard analytics
- **React Hot Toast** — Elegant notifications

**Backend:**
- **Supabase** — Open-source Firebase alternative (PostgreSQL database, Authentication, Storage)

**Containerization:**
- **Docker** — Multi-stage build (Node → Vite build → Nginx)
- **Nginx** — Lightweight static file server with SPA routing

## 📸 Sneak Peek

| Dashboard (Light Mode) | Dashboard (Dark Mode) |
| :---: | :---: |
| <img src="./public/sneap_peek/Screenshot 2026-05-10 092846.png" alt="Dashboard Light Mode" width="400" /> | <img src="./public/sneap_peek/Screenshot 2026-05-10 092945.png" alt="Dashboard Dark Mode" width="400" /> |
| **Bookings View** | **Login Screen** |
| <img src="./public/sneap_peek/Screenshot 2026-05-10 092924.png" alt="Bookings View" width="400" /> | <img src="./public/sneap_peek/Screenshot 2026-05-10 093005.png" alt="Login Screen" width="400" /> |



## 💻 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/the-wild-oasis.git
   cd the-wild-oasis
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Since environment variables are excluded from Git, you will need to create a `.env` file in the root directory and add your own Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

### 🐳 Docker

You can also run The Wild Oasis using Docker — no Node.js installation required.

#### Quick Start (Docker Run)

```bash
# Build the image (env vars are baked in at build time by Vite)
docker build -t wild-oasis:1.0 \
  --build-arg VITE_SUPABASE_URL=your_supabase_url \
  --build-arg VITE_SUPABASE_ANON_KEY=your_supabase_anon_key \
  .

# Run the container
docker run -d --name wild-oasis-app -p 8080:80 wild-oasis:1.0
```

#### Using Docker Compose

```bash
# Build and start
docker compose up -d --build

# View logs
docker compose logs -f

# Stop
docker compose down
```

#### Pull from Docker Hub

No need to clone the repo — just pull the pre-built image:

```bash
docker pull adityapratap07/wild-oasis:latest
docker run -d --name wild-oasis-app -p 8080:80 adityapratap07/wild-oasis:latest
```

The app will be running at **`http://localhost:8080`**

> **Note:** Unlike traditional Node.js apps, Vite bakes environment variables into the JS bundle at **build time**. The Docker Hub image comes pre-configured with Supabase credentials. To use your own, rebuild the image with your `--build-arg` values.

## 🗄️ Database Configuration

To fully run this project, you need to set up a Supabase project with the following tables and their respective Row Level Security (RLS) policies:
- `cabins` (id, name, maxCapacity, regularPrice, discount, description, image)
- `bookings` (id, created_at, startDate, endDate, numNights, numGuests, cabinPrice, extrasPrice, totalPrice, status, hasBreakfast, isPaid, observations, cabinId, guestId)
- `guests` (id, created_at, fullName, email, nationality, nationalID, countryFlag)
- `settings` (id, created_at, minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice)

*Note: Storage buckets for cabin images and avatar uploads must also be configured.*

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
<div align="center">
  <i>Designed and built with ❤️ for better hospitality management.</i>
</div>
