'use client'

import { useState } from 'react'
import { User, Mail, Lock, Trash2, Upload, Share2, Settings as SettingsIcon, Download, Crown, Palette } from 'lucide-react'
import toast from 'react-hot-toast'
import Header from '@/components/Header'

const TEMP_USER_EMAIL = 'mbs.techvolution@gmail.com'
const TEMP_USER_NAME = 'M'

type SettingsTab = 'account' | 'contact-exchange' | 'integrations' | 'export-contacts' | 'subscription' | 'branding'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('account')
  const [name, setName] = useState(TEMP_USER_NAME)
  const [email, setEmail] = useState(TEMP_USER_EMAIL)
  const [password, setPassword] = useState('**********')
  const [accountPhoto, setAccountPhoto] = useState<string | null>(null)
  const [showChangeEmail, setShowChangeEmail] = useState(false)
  const [newEmail, setNewEmail] = useState('')
  const [showResetPassword, setShowResetPassword] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const tabs = [
    { id: 'account' as SettingsTab, label: 'Account', icon: User },
    { id: 'contact-exchange' as SettingsTab, label: 'Contact Exchange', icon: Share2 },
    { id: 'integrations' as SettingsTab, label: 'Integrations', icon: SettingsIcon, isPro: true },
    { id: 'export-contacts' as SettingsTab, label: 'Export Contacts', icon: Download },
    { id: 'subscription' as SettingsTab, label: 'Subscription', icon: Crown },
    { id: 'branding' as SettingsTab, label: 'Branding', icon: Palette },
  ]

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const data = await response.json()
        setAccountPhoto(data.url)
        toast.success('Account photo updated successfully')
      } else {
        toast.error('Failed to upload photo')
      }
    } catch (error) {
      toast.error('Error uploading photo')
    }
  }

  const handleSaveName = async () => {
    toast.success('Name updated successfully')
  }

  const handleChangeEmail = async () => {
    if (!newEmail || !newEmail.includes('@')) {
      toast.error('Please enter a valid email address')
      return
    }
    toast.success('Email change request sent. Please check your inbox.')
    setShowChangeEmail(false)
    setNewEmail('')
  }

  const handleResetPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields')
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters')
      return
    }
    toast.success('Password reset successfully')
    setShowResetPassword(false)
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleDeleteAccount = async () => {
    if (!confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return
    }
    toast.success('Account deletion request submitted')
  }

  const userInitial = name.charAt(0).toUpperCase()

  return (
    <>
      <Header breadcrumbs={[{ label: 'Settings' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Settings</h1>

          {/* Tabs */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-sm mb-6">
            <div className="border-b border-neutral-200">
              <nav className="flex space-x-2 sm:space-x-4 md:space-x-8 px-2 sm:px-4 md:px-6 overflow-x-auto scrollbar-hide" aria-label="Tabs">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  const isActive = activeTab === tab.id
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`
                        flex items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm transition-colors whitespace-nowrap
                        ${
                          isActive
                            ? 'border-teal-600 text-teal-600'
                            : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                        }
                      `}
                    >
                      <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{tab.label}</span>
                      <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                      {tab.isPro && (
                        <span className="ml-1 text-[10px] sm:text-xs bg-orange-100 text-orange-700 px-1.5 sm:px-2 py-0.5 rounded-full font-semibold">
                          PRO
                        </span>
                      )}
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-4 sm:p-6 md:p-8">
              {/* Account Tab */}
              {activeTab === 'account' && (
                <div className="space-y-6">
                  {/* Current User Display */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white font-semibold text-lg shadow-md">
                      {accountPhoto ? (
                        <img src={accountPhoto} alt="Account" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        userInitial
                      )}
                    </div>
                    <div>
                      <p className="text-gray-600">{email}</p>
                    </div>
                  </div>

                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Name
                    </label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        placeholder="Enter your name"
                      />
                      <button
                        onClick={handleSaveName}
                        className="px-4 py-2 rounded-xl gradient-primary text-white hover:shadow-lg transition-all font-medium whitespace-nowrap"
                      >
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Account Photo */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Account Photo
                    </label>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 flex-shrink-0">
                        {accountPhoto ? (
                          <img src={accountPhoto} alt="Account" className="w-full h-full rounded-lg object-cover" />
                        ) : (
                          <div className="text-gray-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            className="hidden"
                          />
                          <span className="px-4 py-2 rounded-xl gradient-primary text-white hover:shadow-lg transition-all font-medium inline-block">
                            + Add Photo
                          </span>
                        </label>
                        {accountPhoto && (
                          <button
                            onClick={() => setAccountPhoto(null)}
                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium sm:ml-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email
                    </label>
                    {!showChangeEmail ? (
                      <div className="space-y-3">
                        <p className="text-gray-600">{email}</p>
                        <button
                          onClick={() => setShowChangeEmail(true)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                          Change Email
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="email"
                          value={newEmail}
                          onChange={(e) => setNewEmail(e.target.value)}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Enter new email address"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleChangeEmail}
                            className="px-4 py-2 rounded-xl gradient-primary text-white hover:shadow-lg transition-all font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setShowChangeEmail(false)
                              setNewEmail('')
                            }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Lock className="w-4 h-4" />
                      Password
                    </label>
                    {!showResetPassword ? (
                      <div className="space-y-3">
                        <input
                          type="password"
                          value={password}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                        />
                        <button
                          onClick={() => setShowResetPassword(true)}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                        >
                          Reset Password
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Current password"
                        />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="New password"
                        />
                        <input
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-2 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={handleResetPassword}
                            className="px-4 py-2 rounded-xl gradient-primary text-white hover:shadow-lg transition-all font-medium"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setShowResetPassword(false)
                              setCurrentPassword('')
                              setNewPassword('')
                              setConfirmPassword('')
                            }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Delete Account */}
                  <div className="pt-6 border-t border-gray-200 space-y-2">
                    <label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </label>
                    <p className="text-gray-600 text-sm">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              )}

              {/* Contact Exchange Tab */}
              {activeTab === 'contact-exchange' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Exchange</h2>
                  <p className="text-gray-600">Contact exchange settings coming soon...</p>
                </div>
              )}

              {/* Integrations Tab */}
              {activeTab === 'integrations' && (
                <div>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-yellow-800 font-semibold">Premium Feature</p>
                    <p className="text-yellow-700 text-sm mt-1 mb-3">
                      Integrations are available in Basic and Pro plans.
                    </p>
                    <a
                      href="/settings/subscription"
                      className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-sm"
                    >
                      Upgrade Plan
                    </a>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Integrations</h2>
                  <p className="text-gray-600">Integrations settings coming soon...</p>
                </div>
              )}

              {/* Export Contacts Tab */}
              {activeTab === 'export-contacts' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Contacts</h2>
                  <p className="text-gray-600">Export contacts functionality coming soon...</p>
                </div>
              )}

              {/* Subscription Tab */}
              {activeTab === 'subscription' && (
                <div>
                  <p className="text-gray-600 mb-4">
                    Manage your subscription and billing preferences.
                  </p>
                  <a
                    href="/settings/subscription"
                    className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                  >
                    Go to Subscription Management
                  </a>
                </div>
              )}

              {/* Branding Tab */}
              {activeTab === 'branding' && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Branding</h2>
                  <p className="text-gray-600">Branding settings coming soon...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
