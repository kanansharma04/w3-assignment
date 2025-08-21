import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import User from './models/User.js'
import ClaimHistory from './models/ClaimHistory.js'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

function logFunky(msg, color = '\x1b[35m') {
  // Default magenta, reset: \x1b[0m
  console.log(`${color}%s\x1b[0m`, msg)
}

dotenv.config()

const app = express()
app.use(express.json())
app.use(cors()) // For development, keep this

// Serve React build in production
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const buildPath = path.resolve(__dirname, '../../frontend/dist')

// Serve React build in production only if build folder exists
if (process.env.NODE_ENV === 'production' && fs.existsSync(buildPath)) {
  app.use(express.static(buildPath))

  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
  })
}

const MONGO_URI = process.env.MONGO_URI


if (!MONGO_URI) {
  logFunky('💥 Error: MONGO_URI environment variable is not set.', '\x1b[31m')
  process.exit(1)
}

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logFunky('🚀 MongoDB connected! 🎉', '\x1b[32m'))
  .catch(err => logFunky('❌ MongoDB connection error: ' + err, '\x1b[31m'))

// Prepopulate users if not present
const initialUsers = [
  'Rahul', 'Kamal', 'Sanak', 'Priya', 'Amit', 'Neha', 'Vikas', 'Anjali', 'Rohit', 'Sneha'
]


async function prepopulateUsers() {
  const count = await User.countDocuments()
  if (count === 0) {
    await User.insertMany(initialUsers.map(name => ({ name, totalPoints: 0 })))
    logFunky('✨ Prepopulated users! ✨', '\x1b[36m')
  } else {
    logFunky('😎 Users already exist, skipping prepopulation.', '\x1b[33m')
  }
  // Force a write to ensure DB/collection creation
  const firstUser = await User.findOne()
  if (firstUser) {
    logFunky(`👤 Sample user: ${firstUser.name} (${firstUser.totalPoints} pts)`, '\x1b[34m')
  }
}
prepopulateUsers()

// POST /users - Add new user
app.post('/users', async (req, res) => {
  try {
    const { name } = req.body
    if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' })
    const user = new User({ name: name.trim(), totalPoints: 0 })
    await user.save()
    logFunky(`🆕 User added: ${user.name}`, '\x1b[32m')
    return res.status(201).json(user)
  } catch (err) {
    if (err.code === 11000) {
      logFunky(`⚠️ User already exists: ${req.body.name}`, '\x1b[33m')
      return res.status(409).json({ error: 'User already exists' })
    }
    logFunky(`💥 Error adding user: ${err.message}`, '\x1b[31m')
    return res.status(500).json({ error: err.message || 'Server error' })
  }
})

// GET /users - Leaderboard
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().sort({ totalPoints: -1 })
    logFunky('📊 Leaderboard requested!', '\x1b[36m')
    return res.json(users)
  } catch (err) {
    logFunky('💥 Error fetching leaderboard: ' + err.message, '\x1b[31m')
    return res.status(500).json({ error: 'Server error' })
  }
})

// POST /claim/:userId - Claim points
app.post('/claim/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const user = await User.findById(userId)
    if (!user) {
      logFunky('❌ User not found for claim!', '\x1b[31m')
      return res.status(404).json({ error: 'User not found' })
    }
    const points = Math.floor(Math.random() * 10) + 1
    user.totalPoints += points
    await user.save()
    const claim = new ClaimHistory({ userId, pointsClaimed: points })
    await claim.save()
    logFunky(`🎲 ${user.name} claimed ${points} pts!`, '\x1b[35m')
    const leaderboard = await User.find().sort({ totalPoints: -1 })
    return res.json({ user, leaderboard })
  } catch (err) {
    logFunky('💥 Error claiming points: ' + err.message, '\x1b[31m')
    return res.status(500).json({ error: 'Server error' })
  }
})

// GET /history/:userId - Claim history
app.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params
    const history = await ClaimHistory.find({ userId }).sort({ claimedAt: -1 })
    logFunky(`📜 Claim history requested for user ${userId}`, '\x1b[36m')
    return res.json(history)
  } catch (err) {
    logFunky('💥 Error fetching history: ' + err.message, '\x1b[31m')
    return res.status(500).json({ error: 'Server error' })
  }
})

app.get('/', (req, res) => {
  res.send('🎰 Welcome to the Funky Leaderboard API! 🎰')
})

// Global error handler
app.use((err, req, res, next) => {
  logFunky('💥 Uncaught error: ' + (err.message || err), '\x1b[31m')
  res.status(500).json({ error: err.message || 'Internal Server Error' })
})

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:' + (process.env.PORT || 5000)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  logFunky(`🚦 Server running on port ${PORT} 🚦`, '\x1b[32m')
  logFunky(`🌐 Backend URL: ${BACKEND_URL}`, '\x1b[36m')
})


