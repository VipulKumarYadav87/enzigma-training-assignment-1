import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import taskRoutes from './routers/routes.js';

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', taskRoutes);

// Hardcoded Port
const PORT = 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Export for test (ESM-style)
export default app;
