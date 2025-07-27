# The Wild Oasis - Resort Management System

![The Wild Oasis Logo](public/logo-light.png)

A modern web application for managing resort operations including cabin bookings, guest check-ins, and staff management.

## Features

- **Cabin Management** - Create, edit, and delete cabin listings with photos and pricing
- **Booking System** - Manage reservations with check-in/out functionality
- **User Authentication** - Secure login/logout with Supabase integration
- **Dashboard Analytics** - Visualize bookings and occupancy statistics
- **Dark Mode** - Toggle between light/dark themes
- **Responsive Design** - Mobile-friendly interface

## Technologies

- React.js + Vite
- React Router
- Supabase (Backend)
- date-fns (Date utilities)
- Styled Components

## Installation

1. Clone repository:

```bash
git clone https://github.com/yourusername/the-wild-oasis.git
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Start development server:

```bash
npm run dev
```

## Configuration

Set up your Supabase project with tables for:

- Cabins
- Bookings
- Guests
- Settings

## License

MIT License - see [LICENSE](LICENSE) for details
