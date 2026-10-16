'use client';

import { createContext, useContext, useState } from 'react';

const translations = {
  en: {
    // Header
    brandName: 'Nagorik Bhumi',
    tagline: 'Land Services for a Better Bangladesh',
    langBn: 'বাংলা',
    langEn: 'English',

    // Login
    welcomeBack: 'Welcome Back',
    loginSubtitle: 'Sign in to manage your land records',
    nidLabel: 'National ID (NID) Number',
    nidPlaceholder: 'Enter your 10 or 17-digit NID number',
    passwordLabel: 'Password',
    passwordPlaceholder: 'Enter your password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    loginBtn: 'Login Securely',
    orDivider: 'OR',
    newUser: 'New to Nagorik Bhumi?',
    createAccount: 'Create an account',
    infoProtected: 'Your information is protected',

    // Register
    createYourAccount: 'Create Your Account',
    registerSubtitle: 'Register with your National ID to get started',
    fullNameLabel: 'Full Name',
    fullNameNote: '(as shown on NID)',
    fullNamePlaceholder: 'Enter your full name',
    dobLabel: 'Date of Birth',
    mobileLabel: 'Mobile Number',
    mobilePlaceholder: '01XXXXXXXXX',
    createPasswordLabel: 'Create Password',
    createPasswordPlaceholder: 'Enter your password',
    confirmPasswordLabel: 'Confirm Password',
    confirmPasswordPlaceholder: 'Confirm your password',
    termsText: 'I agree to the',
    termsLink: 'Terms of Service',
    andText: 'and',
    privacyLink: 'Privacy Policy',
    registerBtn: 'Verify NID & Register',
    alreadyAccount: 'Already have an account?',
    loginLink: 'Login',
    secureVerify: 'Your identity will be verified securely.',
    noShareOtp: 'Never share your password or OTP.',
  },

  bn: {
    // Header
    brandName: 'নাগরিক ভূমি',
    tagline: 'একটি উন্নত বাংলাদেশের জন্য ভূমি সেবা',
    langBn: 'বাংলা',
    langEn: 'English',

    // Login
    welcomeBack: 'স্বাগতম',
    loginSubtitle: 'আপনার জমির রেকর্ড পরিচালনা করতে সাইন ইন করুন',
    nidLabel: 'জাতীয় পরিচয়পত্র (NID) নম্বর',
    nidPlaceholder: 'আপনার ১০ বা ১৭ সংখ্যার NID নম্বর লিখুন',
    passwordLabel: 'পাসওয়ার্ড',
    passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
    rememberMe: 'মনে রাখুন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    loginBtn: 'নিরাপদে লগইন করুন',
    orDivider: 'অথবা',
    newUser: 'নাগরিক ভূমিতে নতুন?',
    createAccount: 'অ্যাকাউন্ট তৈরি করুন',
    infoProtected: 'আপনার তথ্য সুরক্ষিত',

    // Register
    createYourAccount: 'আপনার অ্যাকাউন্ট তৈরি করুন',
    registerSubtitle: 'শুরু করতে আপনার জাতীয় পরিচয়পত্র দিয়ে নিবন্ধন করুন',
    fullNameLabel: 'পূর্ণ নাম',
    fullNameNote: '(NID অনুযায়ী)',
    fullNamePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
    dobLabel: 'জন্ম তারিখ',
    mobileLabel: 'মোবাইল নম্বর',
    mobilePlaceholder: '০১XXXXXXXXX',
    createPasswordLabel: 'পাসওয়ার্ড তৈরি করুন',
    createPasswordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
    confirmPasswordLabel: 'পাসওয়ার্ড নিশ্চিত করুন',
    confirmPasswordPlaceholder: 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
    termsText: 'আমি সম্মত',
    termsLink: 'সেবার শর্তাবলী',
    andText: 'এবং',
    privacyLink: 'গোপনীয়তা নীতি',
    registerBtn: 'NID যাচাই করুন ও নিবন্ধন করুন',
    alreadyAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    loginLink: 'লগইন করুন',
    secureVerify: 'আপনার পরিচয় নিরাপদে যাচাই করা হবে।',
    noShareOtp: 'কখনো আপনার পাসওয়ার্ড বা OTP শেয়ার করবেন না।',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];
  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
