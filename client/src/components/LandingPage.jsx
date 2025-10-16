import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TypewriterText } from './TypeWriterText';
import { Briefcase, Shield, TrendingUp, Clock, CheckCircle2, ArrowRight, Sparkles, BarChart3, PieChart } from 'lucide-react';

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Feature cards: Focus on benefits and capabilities
  const features = [
    {
      icon: Briefcase,
      title: 'Centralized Application Management',
      description: 'Track all your job applications in one place, with instant updates and easy access.'
    },
    {
      icon: Shield,
      title: 'Transparent Status Updates',
      description: 'See every change and update to your application status, with full history and notifications.'
    },
    {
      icon: TrendingUp,
      title: 'Performance Insights',
      description: 'Visualize your application journey, interview progress, and success rates with interactive charts.'
    },
    {
      icon: CheckCircle2,
      title: 'Instant Resume Preview',
      description: 'Preview your resume before submitting and review it anytime, right from your dashboard.'
    }
  ];

  // Stats cards: Show impact and scale (updated values)
  const stats = [
    { value: '5,000+', label: 'Applications Managed' },
    { value: '92%', label: 'Interview Conversion Rate' },
    { value: '1,200+', label: 'Resumes Previewed' },
    { value: '99.9%', label: 'Uptime & Reliability' }
  ];

  return (
<div className="min-h-screen bg-gradient-to-br from-[#0A1A5E] via-[#1E3A8A] to-[#60A5FA] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-slate-900/40 to-blue-950/30 pointer-events-none" />

      <nav className="fixed top-0 w-full backdrop-blur-xl bg-black/50 border-b border-slate-800/30 z-50 shadow-lg shadow-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2 group cursor-pointer">
              <span className="text-xl font-bold bg-gradient-to-r from-slate-200 to-blue-200 bg-clip-text text-transparent">
                TrackFlow  
              </span>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#features" className="text-slate-200 hover:text-blue-200 transition-colors relative group">
                Features
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#insights" className="text-slate-200 hover:text-blue-200 transition-colors relative group">
                Insights
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
              <a href="#stats" className="text-slate-200 hover:text-blue-200 transition-colors relative group">
                Stats
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-slate-500 to-blue-500 group-hover:w-full transition-all duration-300" />
              </a>
            </div>
            <div className="flex space-x-4">
              <button className="px-4 py-2 text-slate-200 hover:text-white transition-colors"
               onClick={() => navigate('/signin')}>
                Sign In
              </button>
              <button className="px-6 py-2 bg-gradient-to-r from-black to-blue-950 text-white rounded-lg hover:from-slate-900 hover:to-blue-900 transition-all transform hover:scale-105 shadow-lg shadow-black/50"
               onClick={() => navigate('/signup')}>
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              Track Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-400 via-blue-400 to-white animate-gradient">
                <TypewriterText
                  texts={[
                    'Job Applications',
                    'Interview Process',
                    'Career Journey',
                    'Success Path'
                  ]}
                />
              </span>
               
              
            </h1>
            <p className="text-xl md:text-2xl text-slate-200/80 mb-12 max-w-3xl mx-auto leading-relaxed">
              TrackFlow empowers your job search with real-time insights, instant resume previews, and a proven track record of helping thousands land interviews and offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="group px-8 py-4 bg-gradient-to-r from-black via-blue-950 to-slate-900 text-white rounded-lg font-semibold hover:from-slate-900 hover:via-blue-900 hover:to-black transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-2xl shadow-black/50"
                onClick={() => navigate('/signup')}
              >
                <span>Start Tracking Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
             
            </div>
          </div>

          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} id="stats">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="card-hover bg-gradient-to-br from-black/80 to-blue-950/1000 backdrop-blur-sm p-6 rounded-xl border border-slate-800/30 shadow-lg shadow-black/20">
                  <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-300 via-blue-300 to-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-slate-200/70 text-sm font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm relative z-10" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-blue-200 to-white mb-4">
              What TrackFlow Does
            </h2>
            <p className="text-xl text-slate-200/70">
              Powerful tools to help you succeed in your job search.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gradient-to-br from-black/70 to-blue-950/50 backdrop-blur-sm p-6 rounded-xl border border-slate-800/30 hover:border-blue-900 transition-all transform hover:scale-105 hover:-translate-y-2 cursor-pointer shadow-lg shadow-black/20 hover:shadow-2xl hover:shadow-blue-950/40"
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-black to-blue-950 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all shadow-lg shadow-black/50">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-100 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-200/70">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm relative z-10" id="insights">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-white mb-6">
              Insights & Analytics
            </h2>
            <p className="text-xl text-slate-200/70">
              Get a clear picture of your job search journey with real-time stats and visual summaries.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover bg-gradient-to-br from-black/80 to-blue-950/1000 p-8 rounded-xl border border-slate-800/30 shadow-lg shadow-black/20 flex flex-col items-center ">
              <BarChart3 className="w-12 h-12 text-blue-300 mb-4" />
              <div className="text-lg font-semibold text-white mb-2">Application Status</div>
              <div className="w-full flex flex-col gap-2 mt-2">
                <div className="flex justify-between text-slate-200">
                  <span>Applied</span>
                  <span>95%</span>
                </div>
                <div className="flex justify-between text-green-300">
                  <span>Interviewed</span>
                  <span>88%</span>
                </div>
                <div className="flex justify-between text-yellow-300">
                  <span>Shortlisted</span>
                  <span>65%</span>
                </div>
                <div className="flex justify-between text-red-400">
                  <span>Rejected</span>
                  <span>8%</span>
                </div>
              </div>
            </div>
            <div className="card-hover bg-gradient-to-br from-black/80 to-blue-950/1000 p-8 rounded-xl border border-slate-800/30 shadow-lg shadow-black/20 flex flex-col items-center">
              <PieChart className="w-12 h-12 text-blue-300 mb-4" />
              <div className="text-lg font-semibold text-white mb-2">Success Rate</div>
              <div className="w-full flex flex-col gap-2 mt-2">
                <div className="flex justify-between text-green-300">
                  <span>Offers Received</span>
                  <span>42%</span>
                </div>
                <div className="flex justify-between text-blue-300">
                  <span>Interviews Scheduled</span>
                  <span>78%</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Applications Pending</span>
                  <span>12%</span>
                </div>
              </div>
            </div>
            <div className="card-hover bg-gradient-to-br from-black/80 to-blue-950/1000 p-8 rounded-xl border border-slate-800/30 shadow-lg shadow-black/20 flex flex-col items-center">
              <TrendingUp className="w-12 h-12 text-blue-300 mb-4" />
              <div className="text-lg font-semibold text-white mb-2">Your Progress</div>
              <div className="w-full flex flex-col gap-2 mt-2">
                <div className="flex justify-between text-slate-200">
                  <span>Applications This Month</span>
                  <span>120</span>
                </div>
                <div className="flex justify-between text-green-300">
                  <span>Interviews Attended</span>
                  <span>35</span>
                </div>
                <div className="flex justify-between text-blue-300">
                  <span>Resumes Viewed</span>
                  <span>210</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/30 backdrop-blur-sm relative z-10" id="how-it-works">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-blue-200 to-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-200/70">
              Simple steps to organize and boost your job search.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover bg-gradient-to-br from-black/80 to-blue-950/1000 p-8 rounded-xl border border-slate-800/30 shadow-lg shadow-black/20 flex flex-col items-center">
              <CheckCircle2 className="w-12 h-12 text-green-300 mb-4" />
              <div className="text-2xl font-semibold text-white mb-2">Apply Easily</div>
              <p className="text-slate-200/70">
                Find jobs that match your skills and interests. Submit your application and upload your resume in seconds.
              </p>
            </div>
            <div className="card-hover bg-gradient-to-br from-black/80 to-blue-950/1000 p-8 rounded-xl border border-slate-800/30 shadow-lg shadow-black/20 flex flex-col items-center">
              <Clock className="w-12 h-12 text-yellow-300 mb-4" />
              <div className="text-2xl font-semibold text-white mb-2">Track Progress</div>
              <p className="text-slate-200/70">
                Get instant updates as your application moves through different stages. See every status change and feedback.
              </p>
            </div>
            <div className="card-hover bg-gradient-to-br from-black/80 to-blue-950/1000 p-8 rounded-xl border border-slate-800/30 shadow-lg shadow-black/20 flex flex-col items-center">
              <Shield className="w-12 h-12 text-blue-300 mb-4" />
              <div className="text-2xl font-semibold text-white mb-2">Stay Organized</div>
              <p className="text-slate-200/70">
                Access all your applications, resumes, and updates in one secure dashboard. Never miss a deadline or opportunity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black/20 to-blue-950/20 backdrop-blur-sm relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-blue-950/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-blue-200 to-white mb-6">
              Ready to Take Control of Your Job Search?
            </h2>
            <p className="text-xl text-slate-200/80 mb-8">
              Join thousands of users who trust TrackFlow to organize, monitor, and succeed in their career journey.
            </p>
            <button
              className="group px-10 py-5 bg-gradient-to-r from-black via-blue-950 to-slate-900 text-white rounded-lg font-semibold text-lg hover:from-slate-900 hover:via-blue-900 hover:to-black transition-all transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto shadow-2xl shadow-black/50"
              onClick={() => navigate('/signup')}
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800/30 py-12 px-4 sm:px-6 lg:px-8 backdrop-blur-sm bg-black/70 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  </div>
                <span className="text-lg font-bold bg-gradient-to-r from-slate-200 to-blue-200 bg-clip-text text-transparent">
                  TrackFlow
                </span>
              </div>
              <p className="text-slate-200/60 text-sm">
                TrackFlow helps you organize, monitor, and analyze your job applications for better results.
              </p>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-200/60 text-sm">
                <li><a href="#features" className="hover:text-blue-200 transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Demo</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-200/60 text-sm">
                <li><a href="#" className="hover:text-blue-200 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-100 font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-200/60 text-sm">
                <li><a href="#" className="hover:text-blue-200 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-blue-200 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-slate-800/30 text-center text-slate-200/60 text-sm">
            2025 TrackFlow. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}