import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Zap, Shield, Globe, Smartphone, QrCode, BarChart3, Users, Share2, Palette, Download } from 'lucide-react'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-orange-50/50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-neutral-200/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo-icon.svg" 
                alt="NexCard" 
                width={44} 
                height={44}
                className="rounded-xl"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                NexCard
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                href="/pricing" 
                className="text-neutral-700 hover:text-teal-600 font-medium transition-colors hidden sm:block relative group"
              >
                Pricing
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="/dashboard" 
                className="text-neutral-700 hover:text-teal-600 font-medium transition-colors hidden sm:block relative group"
              >
                Dashboard
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-600 transition-all group-hover:w-full"></span>
              </Link>
              <Link 
                href="/create" 
                className="px-6 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all flex items-center gap-2 transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-24 pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 text-sm font-medium mb-8 shadow-sm animate-fade-in">
                  <Zap className="w-4 h-4 text-orange-500" />
                  <span>Next-Gen Digital Networking</span>
                </div>
                
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
                  <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-orange-500 bg-clip-text text-transparent animate-gradient">
                    Your Identity,
                  </span>
                  <br />
                  <span className="text-neutral-900">Redefined</span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-neutral-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Create stunning digital business cards that make lasting impressions. 
                  Share instantly, track engagement, and grow your network effortlessly.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                  <Link 
                    href="/create"
                    className="group px-8 py-4 rounded-xl gradient-primary text-white font-semibold hover:shadow-2xl hover:shadow-teal-500/40 transition-all transform hover:-translate-y-1 flex items-center gap-2 justify-center"
                  >
                    Create Your Card
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link 
                    href="/dashboard"
                    className="px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm text-neutral-700 font-semibold border-2 border-neutral-200 hover:border-teal-300 hover:bg-teal-50/50 transition-all shadow-sm"
                  >
                    View Dashboard
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0">
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">10K+</div>
                    <div className="text-sm text-neutral-500 mt-1">Active Users</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">50K+</div>
                    <div className="text-sm text-neutral-500 mt-1">Cards Created</div>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-teal-400 bg-clip-text text-transparent">1M+</div>
                    <div className="text-sm text-neutral-500 mt-1">Connections</div>
                  </div>
                </div>
              </div>

              {/* Right - Card Preview */}
              <div className="relative hidden lg:block">
                <div className="relative">
                  {/* Floating Card Mockup */}
                  <div className="relative transform hover:scale-105 transition-transform duration-500">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-orange-400 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
                    <div className="relative bg-white rounded-3xl shadow-2xl p-8 border border-neutral-100">
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold">
                            JD
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold text-neutral-900">John Doe</h3>
                            <p className="text-teal-600 font-medium">CEO & Founder</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-neutral-600">
                          <p className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-teal-100 flex items-center justify-center">
                              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                            </span>
                            john@example.com
                          </p>
                          <p className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-orange-100 flex items-center justify-center">
                              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                            </span>
                            +1 (555) 123-4567
                          </p>
                        </div>
                        <div className="pt-4 border-t border-neutral-100">
                          <div className="flex gap-2">
                            {[1, 2, 3, 4].map((i) => (
                              <div key={i} className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-100 to-orange-100 flex items-center justify-center">
                                <Share2 className="w-5 h-5 text-teal-600" />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* QR Code Badge */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-neutral-100 transform rotate-6 hover:rotate-0 transition-transform">
                    <QrCode className="w-12 h-12 text-teal-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-block mb-4">
              <span className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Features</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold text-neutral-900 mb-6">
              Why Choose <span className="bg-gradient-to-r from-teal-600 to-orange-500 bg-clip-text text-transparent">NexCard</span>?
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Everything you need to make networking effortless and memorable
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Feature 1 */}
            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 card-hover shadow-sm hover:shadow-xl hover:border-teal-200">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Lightning Fast</h3>
              <p className="text-neutral-600 leading-relaxed">
                Create and share your digital card in seconds. No downloads, no apps needed—just a link.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 card-hover shadow-sm hover:shadow-xl hover:border-orange-200">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Secure & Private</h3>
              <p className="text-neutral-600 leading-relaxed">
                Your data is encrypted and secure. Full control over what you share and who sees it.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 card-hover shadow-sm hover:shadow-xl hover:border-teal-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Universal Access</h3>
              <p className="text-neutral-600 leading-relaxed">
                Works on any device, anywhere. Share via QR code, link, or NFC—your choice.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 card-hover shadow-sm hover:shadow-xl hover:border-teal-200">
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                <QrCode className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">QR Code Sharing</h3>
              <p className="text-neutral-600 leading-relaxed">
                Generate beautiful QR codes instantly. Just scan and connect—no typing required.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 card-hover shadow-sm hover:shadow-xl hover:border-orange-200">
              <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Analytics Dashboard</h3>
              <p className="text-neutral-600 leading-relaxed">
                Track views, shares, and engagement. Understand who's connecting with you.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group p-8 rounded-3xl bg-white/80 backdrop-blur-sm border border-neutral-200/50 card-hover shadow-sm hover:shadow-xl hover:border-teal-200">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center mb-6 shadow-lg shadow-teal-500/30 group-hover:scale-110 transition-transform">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4">Fully Customizable</h3>
              <p className="text-neutral-600 leading-relaxed">
                Choose from multiple templates, colors, and layouts. Make it uniquely yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center p-16 rounded-3xl gradient-hero relative overflow-hidden shadow-2xl">
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600/50 to-orange-500/50"></div>
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                <span>Join the Revolution</span>
              </div>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Ready to Transform Your Networking?
              </h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of professionals who are making connections that matter. Start building your digital presence today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/create"
                  className="group inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-white text-teal-600 font-semibold hover:bg-neutral-50 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
                >
                  Create Your Card Now
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link 
                  href="/dashboard"
                  className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold border-2 border-white/30 hover:bg-white/20 transition-all"
                >
                  View Examples
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-neutral-200/50 bg-white/80 backdrop-blur-sm relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo-icon.svg" 
                alt="NexCard" 
                width={40} 
                height={40}
                className="rounded-xl"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                NexCard
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/pricing" className="text-neutral-600 hover:text-teal-600 transition-colors">
                Pricing
              </Link>
              <Link href="/help" className="text-neutral-600 hover:text-teal-600 transition-colors">
                Help
              </Link>
              <Link href="/support" className="text-neutral-600 hover:text-teal-600 transition-colors">
                Support
              </Link>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500">
                © 2024 NexCard. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
