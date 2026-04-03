const express=require("express")
const router=express.Router()
const{ signup,login,verify,getUserbyId,logout, updateUser}=require("../controller/authcontroller")
const { uploads } = require("../multer/multer")

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, email, password]
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       201: { description: OTP sent to email }
 *       400: { description: User already exists }
 */
router.post("/signup",signup)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Login successful }
 *       400: { description: Invalid credentials }
 */
router.post("/login",login)

/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify OTP
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, otp]
 *             properties:
 *               email: { type: string }
 *               otp: { type: number }
 *     responses:
 *       200: { description: Verification successful }
 *       400: { description: Invalid OTP }
 */
router.post("/verify",verify)

/**
 * @swagger
 * /api/auth/profile/{id}:
 *   get:
 *     summary: Get user profile by ID
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     responses:
 *       200: { description: User data fetched }
 *       404: { description: User not found }
 */
router.get("/profile/:id", getUserbyId)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Authentication]
 *     responses:
 *       200: { description: Logout successful }
 */
router.post("/logout", logout)

/**
 * @swagger
 * /api/auth/update-profile/{id}:
 *   put:
 *     summary: Update user profile
 *     tags: [Authentication]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               email: { type: string }
 *               profilePic: { type: string, format: binary }
 *     responses:
 *       200: { description: Profile updated successfully }
 *       404: { description: User not found }
 */
router.put("/update-profile/:id", uploads.single("profilePic"), updateUser)

module.exports=router