# API Integration Setup Guide

## Overview
The API integration is now configured for your Sahal Marketplace application. This includes:
- Generic HTTP API Service
- Ads API Service  
- Authentication API Service
- HTTP Interceptor for token management
- Automatic retry and timeout handling

## Environment Configuration

### 1. Set API Base URL
Edit your `.env.local` file and add:

```env
GEMINI_API_KEY=your_gemini_key_here
API_URL=http://localhost:3001/api
```

Or for production:
```env
API_URL=https://api.yourdomain.com/api
```

The application will use `http://localhost:3001/api` by default if not set.

## Services Overview

### ApiService (`src/services/api.service.ts`)
Generic service for all HTTP requests. Methods:
- `get<T>(endpoint, params?)` - GET request
- `post<T>(endpoint, body)` - POST request
- `put<T>(endpoint, body)` - PUT request
- `patch<T>(endpoint, body)` - PATCH request
- `delete<T>(endpoint)` - DELETE request
- `replaceUrlParams(endpoint, params)` - Replace URL parameters

**Features:**
- Automatic timeout (30 seconds default)
- Automatic retry (3 times by default)
- Error handling and logging
- Query parameters support

### AdsApiService (`src/services/ads.api.service.ts`)
Handles all ads-related API calls:

```typescript
// Get all ads
this.adsApiService.getAds({ category: 'Gaadiid', location: 'Mogadishu' })
  .subscribe(ads => console.log(ads));

// Get single ad
this.adsApiService.getAdById(1).subscribe(ad => console.log(ad));

// Create ad
this.adsApiService.createAd({
  title: 'My Item',
  price: 5000,
  location: 'Mogadishu',
  imageUrl: 'https://...',
  isFavorite: false
}).subscribe(newAd => console.log(newAd));

// Update ad
this.adsApiService.updateAd(1, { price: 6000 })
  .subscribe(updated => console.log(updated));

// Delete ad
this.adsApiService.deleteAd(1).subscribe();

// Search ads
this.adsApiService.searchAds('laptop').subscribe(results => console.log(results));

// Get user's ads
this.adsApiService.getUserAds().subscribe(userAds => console.log(userAds));

// Toggle favorite
this.adsApiService.toggleFavorite(1).subscribe(updated => console.log(updated));
```

### AuthApiService (`src/services/auth.api.service.ts`)
Handles authentication and token management:

```typescript
// Login
this.authApiService.login({ email: 'user@example.com', password: 'password' })
  .subscribe(response => {
    console.log('Logged in:', response.user);
  });

// Register
this.authApiService.signup({
  name: 'John Doe',
  email: 'john@example.com',
  password: 'password'
}).subscribe(response => {
  console.log('Registered:', response.user);
});

// Logout
this.authApiService.logout().subscribe();

// Check if logged in
if (this.authApiService.isLoggedIn()) {
  console.log('User is logged in');
}

// Get token
const token = this.authApiService.getToken();
```

**Features:**
- Automatic token storage in localStorage
- Token refresh on 401 errors
- Automatic logout on refresh failure

## HttpAuthInterceptor (`src/interceptors/http.auth.interceptor.ts`)

This interceptor automatically:
1. Adds Bearer token to all API requests
2. Handles 401 (Unauthorized) responses
3. Attempts to refresh token when expired
4. Logs out user if refresh fails

## API Configuration (`src/config/api.config.ts`)

All endpoints are centralized:

```typescript
ENDPOINTS: {
  ADS: '/ads',
  AD_BY_ID: '/ads/:id',
  CREATE_AD: '/ads',
  UPDATE_AD: '/ads/:id',
  DELETE_AD: '/ads/:id',
  SEARCH_ADS: '/ads/search',
  CATEGORIES: '/categories',
  USERS: '/users',
  USER_PROFILE: '/users/profile',
  USER_ADS: '/users/ads',
  AUTH_LOGIN: '/auth/login',
  AUTH_SIGNUP: '/auth/signup',
  AUTH_LOGOUT: '/auth/logout',
  AUTH_REFRESH: '/auth/refresh',
  MESSAGES: '/messages',
  SEND_MESSAGE: '/messages/send',
  NOTIFICATIONS: '/notifications',
  MARK_READ: '/notifications/:id/read',
  MARK_ALL_READ: '/notifications/mark-all-read',
}
```

## Backend Requirements

Your backend API should implement these endpoints:

### Authentication
- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/refresh` - Refresh access token

### Ads
- `GET /api/ads` - Get all ads (with optional filters: category, location, search)
- `GET /api/ads/:id` - Get single ad
- `POST /api/ads` - Create new ad
- `PUT /api/ads/:id` - Update ad
- `DELETE /api/ads/:id` - Delete ad
- `GET /api/ads/search?query=...` - Search ads
- `GET /api/users/ads` - Get user's ads
- `PATCH /api/ads/:id` - Toggle favorite

### Categories
- `GET /api/categories` - Get all categories

### Users
- `GET /api/users/profile` - Get current user profile
- `PUT /api/users/profile` - Update user profile

### Messages
- `GET /api/messages` - Get all messages
- `POST /api/messages/send` - Send new message

### Notifications
- `GET /api/notifications` - Get all notifications
- `PATCH /api/notifications/:id/read` - Mark notification as read
- `PATCH /api/notifications/mark-all-read` - Mark all as read

## Response Format

Your backend should return responses in this format:

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Product Title",
    ...
  },
  "message": "Operation successful" // optional
}
```

For errors:
```json
{
  "success": false,
  "error": "Error message",
  "message": "User-friendly error message"
}
```

## Error Handling

Errors are handled automatically by the interceptor and services:

```typescript
this.adsApiService.getAds().subscribe({
  next: (ads) => console.log(ads),
  error: (err) => {
    console.error('Failed to load ads:', err.message);
    // Handle error - show toast, etc.
  }
});
```

## Common Integration Patterns

### 1. Load data on component init
```typescript
ngOnInit() {
  this.adsApiService.getAds()
    .subscribe(ads => {
      this.ads.set(ads);
    });
}
```

### 2. Create resource
```typescript
submitForm() {
  this.adsApiService.createAd(formData)
    .subscribe({
      next: (newAd) => {
        this.router.navigate(['/product', newAd.id]);
      },
      error: (err) => this.showError(err)
    });
}
```

### 3. Update resource
```typescript
saveChanges() {
  this.adsApiService.updateAd(this.adId, changedFields)
    .subscribe(updated => {
      this.currentAd.set(updated);
    });
}
```

## Environment Setup

For local development with a backend server:

```bash
# Terminal 1: Start frontend (port 3000)
npm run dev

# Terminal 2: Start backend (port 3001)
npm run dev:api  # or your backend command
```

## Next Steps

1. **Set up your backend API** - Implement the endpoints listed above
2. **Update API_URL** in `.env.local` to point to your backend
3. **Test endpoints** - Use the browser DevTools Network tab to verify API calls
4. **Update components** - Replace mock data with API calls
5. **Add error handling** - Add toast notifications for API errors
6. **Add loading states** - Show loading indicators while fetching data

## Troubleshooting

### CORS Errors
If you see CORS errors, ensure your backend has proper CORS headers:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH
Access-Control-Allow-Headers: Content-Type, Authorization
```

### Token Not Sending
Check that:
1. The token is being saved in localStorage
2. The interceptor is registered in `index.tsx`
3. Backend is checking for `Authorization: Bearer <token>` header

### 401 Errors
This happens when:
1. Token is expired
2. Token is invalid
3. User is not authenticated

The interceptor will try to refresh automatically, then logout if it fails.

## Questions?
Check the service comments or API documentation for more details.
