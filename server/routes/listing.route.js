import express, { Router } from 'express'
import { createListing } from '../controllers/listing.controllers.js'
import { verifyToken } from '../utils/verifyUser.js';
import { defaults } from 'token';

const router = express.Router();

router.post('/create', verifyToken, createListing)

export default router;