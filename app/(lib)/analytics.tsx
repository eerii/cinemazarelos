"use client"

// privacy friendly analytics (no cookies, no user data collected)
import { Analytics as VercelAnalytics } from "@vercel/analytics/react"

const Analytics = () => <VercelAnalytics/>

export default Analytics