# Windows Setup Guide for Shoufly Delivery App

This guide will help you set up and run the Shoufly delivery app on Windows.

## Prerequisites

1. **Node.js** (v18 or higher) - Download from [nodejs.org](https://nodejs.org/)
2. **Git** - Download from [git-scm.com](https://git-scm.com/)
3. **Database** - PostgreSQL or use a cloud service like Neon

## Setup Instructions

### 1. Clone and Install Dependencies
```bash
# Clone the repository (if not already done)
git clone <your-repo-url>
cd shoufly-delivery-app

# Install dependencies
npm install
```

### 2. Environment Variables
Create a `.env` file in the root directory:
```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key-here-32chars

# Twilio WhatsApp (Optional)
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890
ADMIN_WHATSAPP=+1234567890
DELIVERY_WHATSAPP=+1234567890
```

### 3. Database Setup
```bash
# Push database schema
npm run db:push
```

### 4. Running the Application

#### Development Mode
```bash
# Using cross-env (Windows compatible)
npx cross-env NODE_ENV=development tsx server/index.ts

# Or use the regular dev command (should work with cross-env installed)
npm run dev
```

#### Production Mode
```bash
# Build the application
npm run build

# Start in production
npx cross-env NODE_ENV=production node dist/index.js
```

## Windows-Specific Notes

1. **Path Separators**: The app uses Node.js `path` module which automatically handles Windows vs Unix path separators.

2. **Environment Variables**: We use `cross-env` package to set environment variables in a cross-platform way.

3. **Database Connection**: Works with any PostgreSQL database (local or cloud-based like Neon).

4. **Port Configuration**: The app runs on port 5000 by default, which should work on Windows.

## Troubleshooting

### Common Issues:

1. **'tsx' is not recognized**:
   ```bash
   npm install -g tsx
   # Or use npx
   npx tsx server/index.ts
   ```

2. **Database Connection Issues**:
   - Ensure PostgreSQL is running (if using local)
   - Check DATABASE_URL format
   - Verify network connectivity

3. **Port Already in Use**:
   ```bash
   # Kill process using port 5000
   netstat -ano | findstr :5000
   taskkill /PID <PID_NUMBER> /F
   ```

4. **File Path Issues**:
   - Use forward slashes (/) or double backslashes (\\\\) in paths
   - The app automatically handles path separators

## Features Working on Windows

✅ User Authentication (Register/Login)
✅ Order Management
✅ Admin Dashboard
✅ WhatsApp Notifications (with Twilio)
✅ Database Operations
✅ File Serving and Static Assets
✅ Hot Reload Development

## Admin User Creation

To create an admin user, you can either:
1. Register normally and manually update the database
2. Or use SQL to create an admin user:

```sql
UPDATE users SET role = 'admin' WHERE email = 'your-email@example.com';
```

## Support

The application is fully compatible with Windows 10/11 and should work with:
- PowerShell
- Command Prompt
- Git Bash
- WSL (Windows Subsystem for Linux)