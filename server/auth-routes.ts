import express from 'express';
import { eq, and, gt, isNull } from 'drizzle-orm';
import { db } from './storage';
import { users, passwordResetTokens } from '@shared/schema';
import { registerSchema, loginSchema, forgotPasswordSchema, resetPasswordSchema } from '@shared/schema';
import { hashPassword, comparePassword, generateToken, authenticateToken, AuthenticatedRequest } from './auth';
import crypto from 'crypto';

const router = express.Router();

// Register endpoint
router.post('/register', async (req, res) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(validatedData.password);
    const newUser = await db.insert(users).values({
      email: validatedData.email,
      password: hashedPassword,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      phone: validatedData.phone,
    }).returning({
      id: users.id,
      email: users.email,
      firstName: users.firstName,
      lastName: users.lastName,
      role: users.role,
    });

    const token = generateToken(newUser[0].id);
    
    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: newUser[0]
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    
    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1);
    if (!user.length) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isPasswordValid = await comparePassword(validatedData.password, user[0].password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user[0].id);
    
    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user[0].id,
        email: user[0].email,
        firstName: user[0].firstName,
        lastName: user[0].lastName,
        role: user[0].role,
      }
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthenticatedRequest, res) => {
  res.json({ user: req.user });
});

// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const validatedData = forgotPasswordSchema.parse(req.body);
    
    // Find user by email
    const user = await db.select().from(users).where(eq(users.email, validatedData.email)).limit(1);
    if (!user.length) {
      // Don't reveal if email exists or not for security
      return res.json({ message: 'If an account exists with this email, you will receive a password reset link.' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Store reset token
    await db.insert(passwordResetTokens).values({
      userId: user[0].id,
      token: resetToken,
      expiresAt,
    });

    // In a real app, you would send an email here
    // For demo purposes, we'll log the reset link
    console.log(`Password reset link for ${validatedData.email}: /reset-password?token=${resetToken}`);
    
    res.json({ 
      message: 'If an account exists with this email, you will receive a password reset link.',
      // For demo purposes, include the token in response
      resetToken 
    });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
  try {
    const validatedData = resetPasswordSchema.parse(req.body);
    
    // Find valid reset token
    const resetToken = await db.select()
      .from(passwordResetTokens)
      .where(
        and(
          eq(passwordResetTokens.token, validatedData.token),
          gt(passwordResetTokens.expiresAt, new Date()),
          isNull(passwordResetTokens.used)
        )
      )
      .limit(1);

    if (!resetToken.length) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const hashedPassword = await hashPassword(validatedData.password);
    
    // Update user password
    await db.update(users)
      .set({ password: hashedPassword })
      .where(eq(users.id, resetToken[0].userId));
    
    // Mark token as used
    await db.update(passwordResetTokens)
      .set({ used: new Date() })
      .where(eq(passwordResetTokens.id, resetToken[0].id));
    
    res.json({ message: 'Password reset successfully' });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ message: 'Invalid input data', errors: error.errors });
    }
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;