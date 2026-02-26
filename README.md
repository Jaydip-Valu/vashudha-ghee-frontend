# Vashudha Ghee - Frontend

Modern React 18+ e-commerce frontend application built with Vite, Redux Toolkit, and Tailwind CSS.

## 🚀 Tech Stack

- **React 18.2+** - UI library
- **Vite** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Helmet Async** - SEO management
- **React Hot Toast** - Notifications
- **Lucide React** - Icons

## 📁 Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components
│   │   ├── Layout/     # Header, Footer, Sidebar
│   │   ├── Product/    # Product-related components
│   │   ├── Cart/       # Cart components
│   │   └── Common/     # Shared components (Button, Input, etc.)
│   ├── pages/          # Page components
│   │   ├── admin/      # Admin pages
│   │   └── ...         # Public pages
│   ├── services/       # API service modules
│   ├── store/          # Redux store and slices
│   ├── utils/          # Helper functions and constants
│   ├── routes/         # Route protection
│   ├── App.jsx         # Main app component
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── .env.example        # Environment variables template
├── index.html          # HTML template
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
└── README.md
```

## 🛠️ Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```
   VITE_API_URL=https://vashudha-ghee-backend.onrender.com/
   VITE_APP_NAME=Vashudha Ghee
   VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Features

### Public Features
- **Home Page** - Hero section with featured products
- **Product Catalog** - Browse and filter products
- **Product Details** - Detailed product information
- **Shopping Cart** - Add/remove items, update quantities
- **Checkout** - Multi-step checkout with payment integration
- **User Authentication** - Login/Register
- **User Profile** - Manage account details
- **Order History** - View past orders

### Admin Features
- **Dashboard** - Overview of key metrics
- **Product Management** - CRUD operations for products
- **Order Management** - View and update order status
- **Inventory Management** - Track stock levels

## 🔐 Authentication

The app uses JWT-based authentication with the following flow:
1. User logs in/registers
2. Token is stored in localStorage
3. Token is sent with each API request via Axios interceptor
4. Protected routes check authentication status

## 🛒 State Management

Redux Toolkit is used for global state management with the following slices:
- **authSlice** - User authentication state
- **cartSlice** - Shopping cart state (synced with localStorage)
- **productSlice** - Product catalog state

## 🎯 Routing

React Router v6 is used with:
- Public routes - Accessible to all users
- Protected routes - Require authentication
- Admin routes - Require admin role

## 💳 Payment Integration

Razorpay is integrated for online payments:
- Payment gateway loaded dynamically
- Order creation and verification flow
- COD (Cash on Delivery) option available

## 🎨 Styling

Tailwind CSS with custom theme configuration:
- Custom color palette (primary, secondary)
- Responsive design utilities
- Reusable component classes
- Dark mode ready

## 📱 Responsive Design

Fully responsive design with breakpoints:
- Mobile (< 640px)
- Tablet (640px - 1024px)
- Desktop (> 1024px)

## 🔍 SEO

React Helmet Async for SEO optimization:
- Dynamic meta tags
- Open Graph tags
- Twitter Card tags
- Canonical URLs

## 📊 Performance

- Code splitting with React.lazy
- Image optimization
- Lazy loading for images
- Efficient re-renders with React.memo
- Debounced search

## 🚀 Deployment

### Build for production:
```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview production build:
```bash
npm run preview
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📝 License

This project is licensed under the MIT License.

## 👥 Team

Vashudha Ghee Development Team

## 📞 Support

For support, email support@vashudhaghee.com
