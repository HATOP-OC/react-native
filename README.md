## Features

- **Global State Management:** Uses Zustand for Authentication, Theme toggling, Shopping Cart, and User Profile (persisted via `AsyncStorage`).
- **Data Fetching:** Handled by TanStack Query (React Query) for optimal caching and loading states.
- **Navigation:** React Navigation (Bottom Tabs + Stack Navigator).
- **Dark/Light Mode:** Dynamic theme switching.
- **Form Validation:** Handled via `react-hook-form` for checkout processing.
- **100% TypeScript:** Strictly typed with no `any` fallbacks.

## Tech Stack

- React Native (Expo)
- TypeScript
- Zustand
- TanStack Query
- React Navigation
- React Hook Form

## How to Run

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Setup:**
   Create a `.env` file in the root directory:
   ```env
   EXPO_PUBLIC_API_URL=https://fakestoreapi.com
   EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1
   ```

3. **Start the App:**
   ```bash
   npx expo start
   ```
   Press `a` to run on Android emulator or `i` for iOS simulator.
