/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { IconUser, IconMail, IconLock, IconCheck, IconX, IconEye, IconEyeOff, IconAlertCircle, IconPhone } from '@tabler/icons-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminProfile = () => {
  const [loading, setLoading] = useState(false);
  const [adminData, setAdminData] = useState({
    fullName: '',
    nickname: '',
    email: '',
    phone: '',
    role: 'ADMIN',
    profileId: null,
    photos: []
  });

  const [nameForm, setNameForm] = useState({
    fullName: '',
    isEditing: false,
    error: '',
    success: ''
  });

  const [emailForm, setEmailForm] = useState({
    email: '',
    otp: '',
    isEditing: false,
    otpSent: false,
    error: '',
    success: '',
    isVerifying: false
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    showCurrent: false,
    showNew: false,
    showConfirm: false,
    error: '',
    success: ''
  });

  const [forgotPasswordForm, setForgotPasswordForm] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: '',
    otpSent: false,
    showNewPassword: false,
    showConfirmPassword: false,
    error: '',
    success: '',
    isVerifying: false
  });

  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    message: '',
    color: ''
  });

  // Load admin data on mount
  useEffect(() => {
    fetchAdminProfile();
  }, []);

  // Calculate password strength for reset password
  useEffect(() => {
    if (passwordForm.newPassword) {
      calculatePasswordStrength(passwordForm.newPassword);
    } else {
      setPasswordStrength({ score: 0, message: '', color: '' });
    }
  }, [passwordForm.newPassword]);

  const fetchAdminProfile = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_Token');
      
      // Try to fetch from API first
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/v1/admin/auth/profile', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            const profileData = data.data;
            
            setAdminData({
              fullName: profileData.fullName || profileData.nickname || '',
              nickname: profileData.nickname || '',
              email: profileData.email || '',
              phone: profileData.phone || '',
              role: profileData.role || 'ADMIN',
              profileId: profileData.profileId || null,
              photos: profileData.photos || []
            });
            
            setNameForm(prev => ({ ...prev, fullName: profileData.fullName || profileData.nickname || '' }));
            setEmailForm(prev => ({ ...prev, email: profileData.email || '' }));
            setForgotPasswordForm(prev => ({ ...prev, email: profileData.email || '' }));
            
            // Also update localStorage
            localStorage.setItem('userData', JSON.stringify(profileData));
            return;
          }
        } catch (apiError) {
          console.log('API fetch failed, using localStorage:', apiError);
        }
      }
      
      // Fallback to localStorage
      const userData = localStorage.getItem('userData');
      
      if (userData) {
        const user = JSON.parse(userData);
        setAdminData({
          fullName: user.fullName || user.nickname || '',
          nickname: user.nickname || '',
          email: user.email || '',
          phone: user.phone || '',
          role: user.role || 'ADMIN',
          profileId: user.profileId || null,
          photos: user.photos || []
        });
        setNameForm(prev => ({ ...prev, fullName: user.fullName || user.nickname || '' }));
        setEmailForm(prev => ({ ...prev, email: user.email || '' }));
        setForgotPasswordForm(prev => ({ ...prev, email: user.email || '' }));
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculatePasswordStrength = (password) => {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[@$!%*?&#]/.test(password)) score++;

    const strengths = [
      { score: 0, message: 'Very Weak', color: 'bg-red-500' },
      { score: 1, message: 'Weak', color: 'bg-orange-500' },
      { score: 2, message: 'Fair', color: 'bg-yellow-500' },
      { score: 3, message: 'Good', color: 'bg-blue-500' },
      { score: 4, message: 'Strong', color: 'bg-green-500' },
      { score: 5, message: 'Very Strong', color: 'bg-emerald-500' }
    ];

    setPasswordStrength(strengths[score]);
  };

  const handleNameUpdate = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!nameForm.fullName.trim()) {
      setNameForm(prev => ({ ...prev, error: 'Name cannot be empty' }));
      return;
    }

    if (nameForm.fullName.trim().length < 2) {
      setNameForm(prev => ({ ...prev, error: 'Name must be at least 2 characters' }));
      return;
    }

    if (nameForm.fullName.trim().length > 100) {
      setNameForm(prev => ({ ...prev, error: 'Name must not exceed 100 characters' }));
      return;
    }

    const namePattern = /^[a-zA-Z\s'-]+$/;
    if (!namePattern.test(nameForm.fullName.trim())) {
      setNameForm(prev => ({ ...prev, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' }));
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('access_Token');
      
      const response = await fetch('http://localhost:3001/api/v1/admin/auth/profile/update-name', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ fullName: nameForm.fullName.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setAdminData(prev => ({ ...prev, fullName: nameForm.fullName.trim() }));
        
        // Update localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.fullName = nameForm.fullName.trim();
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setNameForm(prev => ({ 
          ...prev, 
          success: 'Name updated successfully!', 
          error: '',
          isEditing: false 
        }));
        
        setTimeout(() => {
          setNameForm(prev => ({ ...prev, success: '' }));
        }, 3000);
      } else {
        setNameForm(prev => ({ ...prev, error: data.message || 'Failed to update name' }));
      }
    } catch (error) {
      setNameForm(prev => ({ ...prev, error: 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSendOtp = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailForm.email.trim() || !emailRegex.test(emailForm.email)) {
      setEmailForm(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('access_Token');
      
      const response = await fetch('http://localhost:3001/api/v1/admin/auth/profile/send-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: emailForm.email.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setEmailForm(prev => ({ 
          ...prev, 
          otpSent: true, 
          error: '',
          success: 'OTP sent to your new email address!' 
        }));
        
        setTimeout(() => {
          setEmailForm(prev => ({ ...prev, success: '' }));
        }, 3000);
      } else {
        setEmailForm(prev => ({ ...prev, error: data.message || 'Failed to send OTP' }));
      }
    } catch (error) {
      setEmailForm(prev => ({ ...prev, error: 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailVerifyOtp = async (e) => {
    e.preventDefault();

    if (!emailForm.otp.trim() || emailForm.otp.length !== 6) {
      setEmailForm(prev => ({ ...prev, error: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    try {
      setEmailForm(prev => ({ ...prev, isVerifying: true }));
      const token = localStorage.getItem('access_Token');
      
      const response = await fetch('http://localhost:3001/api/v1/admin/auth/profile/verify-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ otp: emailForm.otp.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setAdminData(prev => ({ ...prev, email: data.data.email }));
        
        // Update localStorage
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        userData.email = data.data.email;
        localStorage.setItem('userData', JSON.stringify(userData));
        
        setEmailForm({
          email: data.data.email,
          otp: '',
          isEditing: false,
          otpSent: false,
          error: '',
          success: 'Email updated successfully!',
          isVerifying: false
        });
        
        setTimeout(() => {
          setEmailForm(prev => ({ ...prev, success: '' }));
        }, 3000);
      } else {
        setEmailForm(prev => ({ 
          ...prev, 
          error: data.message || 'Invalid OTP', 
          isVerifying: false 
        }));
      }
    } catch (error) {
      setEmailForm(prev => ({ 
        ...prev, 
        error: 'Network error. Please try again.', 
        isVerifying: false 
      }));
    }
  };

  const handleEmailResendOtp = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('access_Token');
      
      const response = await fetch('http://localhost:3001/api/v1/admin/auth/profile/send-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ email: emailForm.email.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setEmailForm(prev => ({ 
          ...prev, 
          success: 'OTP resent successfully!',
          error: '' 
        }));
        
        setTimeout(() => {
          setEmailForm(prev => ({ ...prev, success: '' }));
        }, 3000);
      } else {
        setEmailForm(prev => ({ ...prev, error: data.message || 'Failed to resend OTP' }));
      }
    } catch (error) {
      setEmailForm(prev => ({ ...prev, error: 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validation
    if (!passwordForm.currentPassword) {
      setPasswordForm(prev => ({ ...prev, error: 'Current password is required' }));
      return;
    }

    if (!passwordForm.newPassword) {
      setPasswordForm(prev => ({ ...prev, error: 'New password is required' }));
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordForm(prev => ({ ...prev, error: 'Password must be at least 8 characters' }));
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordForm(prev => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }

    if (passwordForm.currentPassword === passwordForm.newPassword) {
      setPasswordForm(prev => ({ ...prev, error: 'New password must be different from current password' }));
      return;
    }

    // Strong password check
    const hasUpper = /[A-Z]/.test(passwordForm.newPassword);
    const hasLower = /[a-z]/.test(passwordForm.newPassword);
    const hasNumber = /\d/.test(passwordForm.newPassword);

    if (!hasUpper || !hasLower || !hasNumber) {
      setPasswordForm(prev => ({ 
        ...prev, 
        error: 'Password must contain uppercase, lowercase, and numbers' 
      }));
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('access_Token');
      
      const response = await fetch('http://localhost:3001/api/v1/admin/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword 
        })
      });

      const data = await response.json();

      if (response.ok) {
        setPasswordForm({
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
          showCurrent: false,
          showNew: false,
          showConfirm: false,
          error: '',
          success: 'Password changed successfully! All sessions have been logged out for security.'
        });
        
        setTimeout(() => {
          setPasswordForm(prev => ({ ...prev, success: '' }));
        }, 3000);
      } else {
        setPasswordForm(prev => ({ ...prev, error: data.message || 'Failed to change password' }));
      }
    } catch (error) {
      setPasswordForm(prev => ({ ...prev, error: 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordSendOtp = async (e) => {
    e.preventDefault();

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!forgotPasswordForm.email.trim() || !emailRegex.test(forgotPasswordForm.email)) {
      setForgotPasswordForm(prev => ({ ...prev, error: 'Please enter a valid email address' }));
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch('http://localhost:3001/api/v1/admin/auth/send-email-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: forgotPasswordForm.email.trim() })
      });

      const data = await response.json();

      if (response.ok) {
        setForgotPasswordForm(prev => ({ 
          ...prev, 
          otpSent: true, 
          error: '',
          success: 'OTP sent to your email!' 
        }));
        
        setTimeout(() => {
          setForgotPasswordForm(prev => ({ ...prev, success: '' }));
        }, 3000);
      } else {
        setForgotPasswordForm(prev => ({ ...prev, error: data.message || 'Failed to send OTP' }));
      }
    } catch (error) {
      setForgotPasswordForm(prev => ({ ...prev, error: 'Network error. Please try again.' }));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPasswordVerify = async (e) => {
    e.preventDefault();

    // Validation
    if (!forgotPasswordForm.otp.trim() || forgotPasswordForm.otp.length !== 6) {
      setForgotPasswordForm(prev => ({ ...prev, error: 'Please enter a valid 6-digit OTP' }));
      return;
    }

    if (!forgotPasswordForm.newPassword) {
      setForgotPasswordForm(prev => ({ ...prev, error: 'New password is required' }));
      return;
    }

    if (forgotPasswordForm.newPassword.length < 8) {
      setForgotPasswordForm(prev => ({ ...prev, error: 'Password must be at least 8 characters' }));
      return;
    }

    if (forgotPasswordForm.newPassword !== forgotPasswordForm.confirmPassword) {
      setForgotPasswordForm(prev => ({ ...prev, error: 'Passwords do not match' }));
      return;
    }

    // Strong password check
    const hasUpper = /[A-Z]/.test(forgotPasswordForm.newPassword);
    const hasLower = /[a-z]/.test(forgotPasswordForm.newPassword);
    const hasNumber = /\d/.test(forgotPasswordForm.newPassword);

    if (!hasUpper || !hasLower || !hasNumber) {
      setForgotPasswordForm(prev => ({ 
        ...prev, 
        error: 'Password must contain uppercase, lowercase, and numbers' 
      }));
      return;
    }

    try {
      setForgotPasswordForm(prev => ({ ...prev, isVerifying: true }));
      
      const response = await fetch('http://localhost:3001/api/v1/admin/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          email: forgotPasswordForm.email.trim(),
          otp: forgotPasswordForm.otp.trim(),
          newPassword: forgotPasswordForm.newPassword
        })
      });

      const data = await response.json();

      if (response.ok) {
        setForgotPasswordForm({
          email: adminData.email || '',
          otp: '',
          newPassword: '',
          confirmPassword: '',
          otpSent: false,
          showNewPassword: false,
          showConfirmPassword: false,
          error: '',
          success: 'Password reset successful! You can now use your new password.',
          isVerifying: false
        });
        
        setTimeout(() => {
          setForgotPasswordForm(prev => ({ ...prev, success: '' }));
        }, 5000);
      } else {
        setForgotPasswordForm(prev => ({ 
          ...prev, 
          error: data.message || 'Invalid OTP or failed to reset password', 
          isVerifying: false 
        }));
      }
    } catch (error) {
      setForgotPasswordForm(prev => ({ 
        ...prev, 
        error: 'Network error. Please try again.', 
        isVerifying: false 
      }));
    }
  };

  const getInitials = (name) => {
    if (!name) return 'AD';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="h-12 w-1 bg-gradient-to-b from-blue-600 to-indigo-600 rounded-full"></div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Admin Profile
            </h1>
          </div>
          <p className="text-slate-600 ml-8 font-medium">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Profile Overview Card */}
        <Card className="mb-6 border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-xl overflow-hidden">
          <div className="h-10"></div>
          <CardContent className="pt-0">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between -mt-16 md:-mt-12">
              <div className="flex items-end gap-4">
                <Avatar className="h-24 w-24 border-4 border-white shadow-2xl">
                  <AvatarImage src={adminData.photos?.[0] || ''} alt={adminData.fullName} />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                    {getInitials(adminData.fullName || adminData.nickname)}
                  </AvatarFallback>
                </Avatar>
                <div className="pb-2">
                  <h2 className="text-2xl font-bold text-slate-900">{adminData.fullName || adminData.nickname || 'Admin User'}</h2>
                  <p className="text-slate-600 font-medium">{adminData.email || 'No email set'}</p>
                  {adminData.phone && (
                    <p className="text-slate-500 text-sm font-medium flex items-center gap-1">
                      <IconPhone size={14} />
                      {adminData.phone}
                    </p>
                  )}
                </div>
              </div>
              <div className="mt-4 md:mt-0 md:pb-2">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-semibold text-sm shadow-lg">
                  <IconUser size={16} />
                  {adminData.role}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-1">
          {/* Name Update Section */}
          <Card className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <IconUser className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Full Name</CardTitle>
                    <CardDescription className="font-medium">Update your display name</CardDescription>
                  </div>
                </div>
                {!nameForm.isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setNameForm(prev => ({ ...prev, isEditing: true, error: '', success: '' }))}
                    className="font-semibold border-2 hover:bg-blue-50 hover:border-blue-300"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {nameForm.error && (
                <Alert variant="destructive" className="mb-4 border-2">
                  <IconAlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-medium">{nameForm.error}</AlertDescription>
                </Alert>
              )}
              
              {nameForm.success && (
                <Alert className="mb-4 border-2 border-green-500 bg-green-50 text-green-800">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <AlertDescription className="font-medium text-green-800">{nameForm.success}</AlertDescription>
                </Alert>
              )}

              {nameForm.isEditing ? (
                <form onSubmit={handleNameUpdate} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-sm font-semibold text-slate-700">Full Name</Label>
                    <Input
                      id="fullName"
                      value={nameForm.fullName}
                      onChange={(e) => setNameForm(prev => ({ ...prev, fullName: e.target.value, error: '' }))}
                      placeholder="Enter your full name"
                      className="mt-1 border-2 focus:border-blue-500 font-medium"
                      disabled={loading}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Letters, spaces, hyphens, and apostrophes only
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 font-semibold shadow-lg"
                    >
                      {loading ? 'Updating...' : 'Save Changes'}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setNameForm(prev => ({ 
                          ...prev, 
                          fullName: adminData.fullName || adminData.nickname || '', 
                          isEditing: false, 
                          error: '' 
                        }));
                      }}
                      disabled={loading}
                      className="border-2 font-semibold hover:bg-slate-50"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                  <IconUser className="text-slate-600" size={20} />
                  <span className="font-semibold text-slate-900">{adminData.fullName || adminData.nickname || 'Not set'}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Email Update Section */}
          <Card className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className=" ">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <IconMail className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <CardTitle className="text-xl">Email Address</CardTitle>
                    <CardDescription className="font-medium">Update your email with OTP verification</CardDescription>
                  </div>
                </div>
                {!emailForm.isEditing && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEmailForm(prev => ({ ...prev, isEditing: true, error: '', success: '', otpSent: false }))}
                    className="font-semibold border-2 hover:bg-indigo-50 hover:border-indigo-300"
                  >
                    Edit
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {emailForm.error && (
                <Alert variant="destructive" className="mb-4 border-2">
                  <IconAlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-medium">{emailForm.error}</AlertDescription>
                </Alert>
              )}
              
              {emailForm.success && (
                <Alert className="mb-4 border-2 border-green-500 bg-green-50 text-green-800">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <AlertDescription className="font-medium text-green-800">{emailForm.success}</AlertDescription>
                </Alert>
              )}

              {emailForm.isEditing ? (
                <div className="space-y-4">
                  {!emailForm.otpSent ? (
                    <form onSubmit={handleEmailSendOtp} className="space-y-4">
                      <div>
                        <Label htmlFor="email" className="text-sm font-semibold text-slate-700">New Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={emailForm.email}
                          onChange={(e) => setEmailForm(prev => ({ ...prev, email: e.target.value, error: '' }))}
                          placeholder="Enter your new email address"
                          className="mt-1 border-2 focus:border-indigo-500 font-medium"
                          disabled={loading}
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          We&apos;ll send a 6-digit OTP to verify this email
                        </p>
                      </div>
                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={loading}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg"
                        >
                          {loading ? 'Sending OTP...' : 'Send OTP'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEmailForm(prev => ({ 
                              ...prev, 
                              email: adminData.email || '', 
                              isEditing: false, 
                              error: '' 
                            }));
                          }}
                          disabled={loading}
                          className="border-2 font-semibold hover:bg-slate-50"
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  ) : (
                    <form onSubmit={handleEmailVerifyOtp} className="space-y-4">
                      <div className="p-4 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
                        <p className="text-sm font-semibold text-indigo-900">
                          OTP sent to: <span className="font-bold">{emailForm.email}</span>
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="emailOtp" className="text-sm font-semibold text-slate-700">Enter OTP</Label>
                        <Input
                          id="emailOtp"
                          value={emailForm.otp}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                            setEmailForm(prev => ({ ...prev, otp: value, error: '' }));
                          }}
                          placeholder="Enter 6-digit OTP"
                          maxLength={6}
                          className="mt-1 border-2 focus:border-indigo-500 font-mono text-lg tracking-widest text-center font-bold"
                          disabled={loading || emailForm.isVerifying}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button
                          type="submit"
                          disabled={loading || emailForm.isVerifying || emailForm.otp.length !== 6}
                          className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 font-semibold shadow-lg"
                        >
                          {emailForm.isVerifying ? 'Verifying...' : 'Verify OTP'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleEmailResendOtp}
                          disabled={loading}
                          className="border-2 font-semibold hover:bg-indigo-50"
                        >
                          Resend
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setEmailForm(prev => ({ ...prev, otpSent: false, otp: '', error: '' }))}
                        className="w-full font-semibold"
                        disabled={loading || emailForm.isVerifying}
                      >
                        ← Change Email
                      </Button>
                    </form>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg border-2 border-slate-200">
                  <IconMail className="text-slate-600" size={20} />
                  <span className="font-semibold text-slate-900">{adminData.email || 'Not set'}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Change Section */}
          <Card className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <IconLock className="text-purple-600" size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl">Change Password</CardTitle>
                  <CardDescription className="font-medium">Update your password for enhanced security</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {passwordForm.error && (
                <Alert variant="destructive" className="mb-4 border-2">
                  <IconAlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-medium">{passwordForm.error}</AlertDescription>
                </Alert>
              )}
              
              {passwordForm.success && (
                <Alert className="mb-4 border-2 border-green-500 bg-green-50 text-green-800">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <AlertDescription className="font-medium text-green-800">{passwordForm.success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handlePasswordChange} className="space-y-5">
                {/* Current Password */}
                <div>
                  <Label htmlFor="currentPassword" className="text-sm font-semibold text-slate-700">
                    Current Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="currentPassword"
                      type={passwordForm.showCurrent ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value, error: '' }))}
                      placeholder="Enter current password"
                      className="pr-10 border-2 focus:border-purple-500 font-medium"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordForm(prev => ({ ...prev, showCurrent: !prev.showCurrent }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {passwordForm.showCurrent ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </button>
                  </div>
                </div>

                <Separator />

                {/* New Password */}
                <div>
                  <Label htmlFor="newPassword" className="text-sm font-semibold text-slate-700">
                    New Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="newPassword"
                      type={passwordForm.showNew ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value, error: '' }))}
                      placeholder="Enter new password"
                      className="pr-10 border-2 focus:border-purple-500 font-medium"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordForm(prev => ({ ...prev, showNew: !prev.showNew }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {passwordForm.showNew ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </button>
                  </div>
                  
                  {/* Password Strength Indicator */}
                  {passwordForm.newPassword && (
                    <div className="mt-3 space-y-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                              i <= passwordStrength.score ? passwordStrength.color : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <p className={`text-sm font-semibold ${
                        passwordStrength.score <= 1 ? 'text-red-600' :
                        passwordStrength.score <= 2 ? 'text-yellow-600' :
                        passwordStrength.score <= 3 ? 'text-blue-600' :
                        'text-green-600'
                      }`}>
                        {passwordStrength.message}
                      </p>
                      <div className="text-xs text-slate-600 space-y-1 font-medium">
                        <p className="flex items-center gap-2">
                          {/[a-z]/.test(passwordForm.newPassword) && /[A-Z]/.test(passwordForm.newPassword) ? 
                            <IconCheck size={14} className="text-green-600" /> : 
                            <IconX size={14} className="text-slate-400" />}
                          Upper & lowercase letters
                        </p>
                        <p className="flex items-center gap-2">
                          {/\d/.test(passwordForm.newPassword) ? 
                            <IconCheck size={14} className="text-green-600" /> : 
                            <IconX size={14} className="text-slate-400" />}
                          Numbers
                        </p>
                        <p className="flex items-center gap-2">
                          {passwordForm.newPassword.length >= 8 ? 
                            <IconCheck size={14} className="text-green-600" /> : 
                            <IconX size={14} className="text-slate-400" />}
                          At least 8 characters
                        </p>
                        <p className="flex items-center gap-2">
                          {/[@$!%*?&#]/.test(passwordForm.newPassword) ? 
                            <IconCheck size={14} className="text-green-600" /> : 
                            <IconX size={14} className="text-slate-400" />}
                          Special characters (@$!%*?&#)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <Label htmlFor="confirmPassword" className="text-sm font-semibold text-slate-700">
                    Confirm New Password
                  </Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={passwordForm.showConfirm ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value, error: '' }))}
                      placeholder="Confirm new password"
                      className="pr-10 border-2 focus:border-purple-500 font-medium"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordForm(prev => ({ ...prev, showConfirm: !prev.showConfirm }))}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    >
                      {passwordForm.showConfirm ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                    </button>
                  </div>
                  {passwordForm.confirmPassword && (
                    <p className={`mt-2 text-sm font-semibold flex items-center gap-1 ${
                      passwordForm.newPassword === passwordForm.confirmPassword ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {passwordForm.newPassword === passwordForm.confirmPassword ? (
                        <><IconCheck size={16} /> Passwords match</>
                      ) : (
                        <><IconX size={16} /> Passwords do not match</>
                      )}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-semibold shadow-lg text-base py-6"
                >
                  {loading ? 'Changing Password...' : 'Change Password'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Forgot Password Section */}
          <Card className="border-2 border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="bg-gradient-to-r from-slate-50 to-pink-50 border-b-2 border-slate-200">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <IconLock className="text-pink-600" size={24} />
                </div>
                <div>
                  <CardTitle className="text-xl">Forgot Password</CardTitle>
                  <CardDescription className="font-medium">Reset your password using email OTP</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {forgotPasswordForm.error && (
                <Alert variant="destructive" className="mb-4 border-2">
                  <IconAlertCircle className="h-4 w-4" />
                  <AlertDescription className="font-medium">{forgotPasswordForm.error}</AlertDescription>
                </Alert>
              )}
              
              {forgotPasswordForm.success && (
                <Alert className="mb-4 border-2 border-green-500 bg-green-50 text-green-800">
                  <IconCheck className="h-4 w-4 text-green-600" />
                  <AlertDescription className="font-medium text-green-800">{forgotPasswordForm.success}</AlertDescription>
                </Alert>
              )}

              {!forgotPasswordForm.otpSent ? (
                <form onSubmit={handleForgotPasswordSendOtp} className="space-y-4">
                  <div>
                    <Label htmlFor="forgotEmail" className="text-sm font-semibold text-slate-700">
                      Email Address
                    </Label>
                    <Input
                      id="forgotEmail"
                      type="email"
                      value={forgotPasswordForm.email}
                      onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, email: e.target.value, error: '' }))}
                      placeholder="Enter your registered email"
                      className="mt-1 border-2 focus:border-pink-500 font-medium"
                      disabled={loading}
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      We&apos;ll send a 6-digit OTP to this email
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 font-semibold shadow-lg"
                  >
                    {loading ? 'Sending OTP...' : 'Send OTP'}
                  </Button>
                </form>
              ) : (
                <form onSubmit={handleForgotPasswordVerify} className="space-y-5">
                  <div className="p-4 bg-pink-50 border-2 border-pink-200 rounded-lg">
                    <p className="text-sm font-semibold text-pink-900">
                      OTP sent to: <span className="font-bold">{forgotPasswordForm.email}</span>
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="forgotOtp" className="text-sm font-semibold text-slate-700">
                      Enter OTP
                    </Label>
                    <Input
                      id="forgotOtp"
                      value={forgotPasswordForm.otp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setForgotPasswordForm(prev => ({ ...prev, otp: value, error: '' }));
                      }}
                      placeholder="Enter 6-digit OTP"
                      maxLength={6}
                      className="mt-1 border-2 focus:border-pink-500 font-mono text-lg tracking-widest text-center font-bold"
                      disabled={loading || forgotPasswordForm.isVerifying}
                    />
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="forgotNewPassword" className="text-sm font-semibold text-slate-700">
                      New Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="forgotNewPassword"
                        type={forgotPasswordForm.showNewPassword ? 'text' : 'password'}
                        value={forgotPasswordForm.newPassword}
                        onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, newPassword: e.target.value, error: '' }))}
                        placeholder="Enter new password"
                        className="pr-10 border-2 focus:border-pink-500 font-medium"
                        disabled={loading || forgotPasswordForm.isVerifying}
                      />
                      <button
                        type="button"
                        onClick={() => setForgotPasswordForm(prev => ({ ...prev, showNewPassword: !prev.showNewPassword }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {forgotPasswordForm.showNewPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="forgotConfirmPassword" className="text-sm font-semibold text-slate-700">
                      Confirm New Password
                    </Label>
                    <div className="relative mt-1">
                      <Input
                        id="forgotConfirmPassword"
                        type={forgotPasswordForm.showConfirmPassword ? 'text' : 'password'}
                        value={forgotPasswordForm.confirmPassword}
                        onChange={(e) => setForgotPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value, error: '' }))}
                        placeholder="Confirm new password"
                        className="pr-10 border-2 focus:border-pink-500 font-medium"
                        disabled={loading || forgotPasswordForm.isVerifying}
                      />
                      <button
                        type="button"
                        onClick={() => setForgotPasswordForm(prev => ({ ...prev, showConfirmPassword: !prev.showConfirmPassword }))}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                      >
                        {forgotPasswordForm.showConfirmPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                      </button>
                    </div>
                    {forgotPasswordForm.confirmPassword && (
                      <p className={`mt-2 text-sm font-semibold flex items-center gap-1 ${
                        forgotPasswordForm.newPassword === forgotPasswordForm.confirmPassword ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {forgotPasswordForm.newPassword === forgotPasswordForm.confirmPassword ? (
                          <><IconCheck size={16} /> Passwords match</>
                        ) : (
                          <><IconX size={16} /> Passwords do not match</>
                        )}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    disabled={loading || forgotPasswordForm.isVerifying || forgotPasswordForm.otp.length !== 6}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 font-semibold shadow-lg text-base py-6"
                  >
                    {forgotPasswordForm.isVerifying ? 'Resetting Password...' : 'Reset Password'}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setForgotPasswordForm(prev => ({ 
                      ...prev, 
                      otpSent: false, 
                      otp: '', 
                      newPassword: '', 
                      confirmPassword: '',
                      error: '' 
                    }))}
                    className="w-full font-semibold"
                    disabled={loading || forgotPasswordForm.isVerifying}
                  >
                    ← Back to Email Entry
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>


      </div>
    </div>
  );
};

export default AdminProfile;