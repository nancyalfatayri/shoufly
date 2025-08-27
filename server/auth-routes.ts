import express from 'express';
import { eq } from 'drizzle-orm';
import { db } from './storage';
import { users } from '@shared/schema';
import { registerSchema, loginSchema } from '@shared/schema';
import { hashPassword, comparePassword, generateToken, authenticateToken, AuthenticatedRequest } from './auth';

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

export default router;