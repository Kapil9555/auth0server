import express,{Router} from  'express';
import dotenv from 'dotenv';
import axios from 'axios';
import nodemailer from 'nodemailer';
import { authController } from '../controllers/authController.js';

dotenv.config()

const router = Router()



router.post('/callback',authController);


export default router;