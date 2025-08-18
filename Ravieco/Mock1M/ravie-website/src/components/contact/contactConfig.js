/**
 * Contact Page Configuration
 * Centralized data for contact methods, FAQs, and form options
 */

import { Mail, Phone, MapPin } from 'lucide-react'

export const contactMethods = [
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@ravie.co",
    description: "For new projects and inquiries",
    href: "mailto:hello@ravie.co",
    primary: true
  },
  {
    icon: Mail,
    label: "Business Development",
    value: "business@ravie.co", 
    description: "For partnerships and collaborations",
    href: "mailto:business@ravie.co"
  },
  {
    icon: Phone,
    label: "Give Us a Call",
    value: "(555) 123-RAVIE",
    description: "Monday - Friday, 9am - 6pm PST",
    href: "tel:+15551237284"
  },
  {
    icon: MapPin,
    label: "Visit Our Studio",
    value: "Los Angeles, CA",
    description: "Available for in-person meetings",
    href: "#"
  }
]

export const faqs = [
  {
    question: "How long does a typical project take?",
    answer: "Coming soon"
  },
  {
    question: "What's your minimum project budget?",
    answer: "Coming soon"
  },
  {
    question: "Do you work with startups?",
    answer: "Coming soon"
  },
  {
    question: "Can you work remotely?",
    answer: "Coming soon"
  }
]

export const serviceOptions = [
  { value: "", label: "Select a service" },
  { value: "brand-films", label: "Brand Films" },
  { value: "product-marketing", label: "Product Marketing" },
  { value: "social-media", label: "Social Media" },
  { value: "brand-design", label: "Brand Design" },
  { value: "interactive-web", label: "Interactive / Web" },
  { value: "live-experiential", label: "Live Experiential" },
  { value: "strategy", label: "Strategy" }
]

export const budgetOptions = [
  { value: "", label: "Select budget" },
  { value: "10-25k", label: "$10,000 - $25,000" },
  { value: "25-50k", label: "$25,000 - $50,000" },
  { value: "50-100k", label: "$50,000 - $100,000" },
  { value: "100-250k", label: "$100,000 - $250,000" },
  { value: "250k+", label: "$250,000+" }
]