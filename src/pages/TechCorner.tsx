import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ModernIconTabs } from "@/components/ui/modern-icon-tabs";
import { 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Video, 
  Monitor, 
  Server, 
  Network, 
  Cloud, 
  Code, 
  TestTube, 
  Users, 
  MessageSquare,
  Globe,
  Bell,
  Star,
  Clock,
  Award,
  Sparkles,
  Brain,
  Wrench,
  Lightbulb,
  FileSpreadsheet,
  FolderOpen,
  Link,
  ExternalLink
} from "lucide-react";
import { BackgroundQuestions } from "@/components/BackgroundQuestions";
import { useYouTubeLearningResources } from "@/hooks/useYouTubeLearningResources";

const TechCorner = () => {
  const [activeTab, setActiveTab] = useState('free-hacks');
  const { resources: learningResources, loading: resourcesLoading, getYouTubeChannels, getLearningWebsites } = useYouTubeLearningResources();

  const courses = [
    {
      id: 1,
      title: "Zero to Hero in Computers",
      category: "Digital Literacy",
      icon: <Monitor className="h-5 w-5" />,
      description: "Complete computer fundamentals course covering typing, MS Office, browsing, OS, troubleshooting, and internet basics.",
      duration: "4-6 weeks",
      level: "Beginner",
      badge: "Like a Mini Diploma",
      gradient: "from-blue-500 to-cyan-500",
      modules: ["Typing & Basics", "MS Office Suite", "Internet & Browsing", "Troubleshooting", "Operating Systems"]
    },
    {
      id: 2,
      title: "System & Server Engineering",
      category: "Infrastructure",
      icon: <Server className="h-5 w-5" />,
      description: "Windows Server roles, Active Directory, DNS, DHCP, GPO, plus Linux essentials including commands, shells, users, and crontabs.",
      duration: "6-8 weeks",
      level: "Intermediate",
      badge: "System Admin Ready",
      gradient: "from-green-500 to-emerald-500",
      modules: ["Windows Server", "Active Directory", "Linux Essentials", "Unix Commands", "Server Management"]
    },
    {
      id: 3,
      title: "Network Engineering",
      category: "Networking",
      icon: <Network className="h-5 w-5" />,
      description: "CCNA-level networking basics including IP, subnetting, routing, plus hands-on with Wireshark, Nmap, and Putty.",
      duration: "8-10 weeks",
      level: "Intermediate",
      badge: "Network Pro Track",
      gradient: "from-purple-500 to-pink-500",
      modules: ["IP & Subnetting", "Routing Protocols", "Network Tools", "Wireshark Analysis", "Network Security"]
    },
    {
      id: 4,
      title: "Cloud Computing",
      category: "Cloud",
      icon: <Cloud className="h-5 w-5" />,
      description: "AWS, Azure, GCP from basics to certification path. Covers IAM, EC2, S3, VPC, RDS, Resource Groups and more.",
      duration: "10-12 weeks",
      level: "Intermediate",
      badge: "Cloud Certification Path",
      gradient: "from-orange-500 to-red-500",
      modules: ["AWS Fundamentals", "Azure Basics", "GCP Essentials", "Cloud Architecture", "Certification Prep"]
    },
    {
      id: 5,
      title: "DevOps Toolkit",
      category: "DevOps",
      icon: <Code className="h-5 w-5" />,
      description: "Complete DevOps workflow with GitHub, Docker, CI/CD pipelines, Terraform, Jenkins, and Infrastructure as Code.",
      duration: "8-10 weeks",
      level: "Advanced",
      badge: "DevOps Engineer Ready",
      gradient: "from-indigo-500 to-purple-500",
      modules: ["Git & GitHub", "Docker Containers", "CI/CD Pipelines", "Terraform", "Jenkins Automation"]
    },
    {
      id: 6,
      title: "Developer Roadmap",
      category: "Programming",
      icon: <Code className="h-5 w-5" />,
      description: "Full-stack development path: JavaScript, Python, C, SQL, HTML/CSS/React, Node.js, databases, and APIs.",
      duration: "12-16 weeks",
      level: "Beginner to Advanced",
      badge: "Full-Stack Developer",
      gradient: "from-pink-500 to-rose-500",
      modules: ["Frontend Basics", "JavaScript", "React", "Backend", "Databases", "APIs"]
    },
    {
      id: 7,
      title: "Software Testing",
      category: "Quality Assurance",
      icon: <TestTube className="h-5 w-5" />,
      description: "Manual testing basics, automation with Selenium/Cypress, writing test cases, bug tracking, and testing tools.",
      duration: "6-8 weeks",
      level: "Beginner",
      badge: "QA Tester Ready",
      gradient: "from-teal-500 to-green-500",
      modules: ["Manual Testing", "Test Automation", "Test Cases", "Bug Tracking", "QA Tools"]
    },
    {
      id: 8,
      title: "Break Into IT Toolkit",
      category: "Career Prep",
      icon: <Users className="h-5 w-5" />,
      description: "Complete career preparation: resume building, LinkedIn optimization, freelancing platforms, interview prep, portfolio, and GitHub best practices.",
      duration: "4-6 weeks",
      level: "All Levels",
      badge: "Career Ready",
      gradient: "from-amber-500 to-orange-500",
      modules: ["Resume Building", "LinkedIn Strategy", "Portfolio Creation", "Interview Prep", "Freelancing"]
    },
    {
      id: 9,
      title: "Communication Training",
      category: "Soft Skills",
      icon: <MessageSquare className="h-5 w-5" />,
      description: "Professional communication skills: email etiquette, team meetings, client calls, written and verbal clarity.",
      duration: "3-4 weeks",
      level: "All Levels",
      badge: "Communication Pro",
      gradient: "from-sky-500 to-blue-500",
      modules: ["Email Etiquette", "Meeting Skills", "Client Communication", "Verbal Skills", "Written Communication"]
    },
    {
      id: 10,
      title: "Cross-Cultural Training",
      category: "Global Skills",
      icon: <Globe className="h-5 w-5" />,
      description: "Work effectively with US/UK/Europe clients. Cultural nuances, timezone etiquette, do's and don'ts in global collaboration.",
      duration: "2-3 weeks",
      level: "All Levels",
      badge: "Global Ready",
      gradient: "from-violet-500 to-purple-500",
      modules: ["Cultural Awareness", "Timezone Management", "Global Etiquette", "Remote Collaboration", "Client Relations"]
    }
  ];

  const freeHacksResources = [
    {
      title: "🔧 Fixes & SOPs",
      description: "Troubleshooting guides, quick system/server/network SOPs for common issues.",
      icon: <Wrench className="h-5 w-5" />,
      count: "50+ SOPs",
      gradient: "from-red-500 to-orange-500"
    },
    {
      title: "💡 Smart Tech Tips",
      description: "Registry hacks, drive-hiding tricks, speed-up methods, and system optimization.",
      icon: <Lightbulb className="h-5 w-5" />,
      count: "30+ Tips",
      gradient: "from-yellow-500 to-amber-500"
    },
    {
      title: "🧾 Cheat Sheets",
      description: "PDF/Notion quick guides for AWS, Windows, VMware, Docker, and more.",
      icon: <FileSpreadsheet className="h-5 w-5" />,
      count: "25+ Sheets",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "📂 Ready Templates",
      description: "Change logs, trackers, deployment checklists, and project templates.",
      icon: <FolderOpen className="h-5 w-5" />,
      count: "20+ Templates",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "🔗 Useful Tools & Links",
      description: "Curated online tools: ping tester, YAML checker, IP info, and more utilities.",
      icon: <Link className="h-5 w-5" />,
      count: "100+ Tools",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const tabs = [
    {
      id: 'free-hacks',
      label: '🧠 Free Hacks & Resources',
      icon: Brain,
      count: freeHacksResources.length,
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'courses',
      label: 'dKloud Courses',
      icon: GraduationCap,
      count: courses.length,
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      id: 'tutorials',
      label: 'Tutorials',
      icon: Video,
      count: 100,
      gradient: 'from-orange-500 to-red-500'
    },
    {
      id: 'youtube-learning',
      label: 'YouTube Channels & Websites',
      icon: Video,
      count: learningResources.length,
      gradient: 'from-red-500 to-pink-500'
    }
  ];

  const handleExploreNow = () => {
    window.open('https://learn.dkloud.in', '_blank');
  };

  const handleFreeHacksRedirect = () => {
    window.open('https://learn.dkloud.in', '_blank');
  };

  const renderFreeHacks = () => (
    <div className="space-y-8">
      {/* Hook Description */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 text-center">
        <div className="flex items-center justify-center mb-3">
          <Brain className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-xl font-bold">🧠 Free Hacks & Resources</h3>
        </div>
        <p className="text-muted-foreground">
          A fun, helpful hub packed with time-saving tips, SOPs, cheat sheets, and smart fixes.
        </p>
      </div>

      {/* Resource Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {freeHacksResources.map((resource, index) => (
          <Card 
            key={index} 
            className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer"
            onClick={handleFreeHacksRedirect}
          >
            <CardHeader className="text-center">
              <div className={`mx-auto w-14 h-14 rounded-full bg-gradient-to-r ${resource.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {resource.icon}
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {resource.title}
              </CardTitle>
              <Badge variant="outline" className="animate-pulse">{resource.count}</Badge>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-center mb-4">
                {resource.description}
              </CardDescription>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation();
                  handleFreeHacksRedirect();
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Explore Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderCourses = () => (
    <div className="space-y-8">
      {/* Course Hub Announcement */}
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 text-center">
        <div className="flex items-center justify-center mb-3">
          <Star className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-xl font-bold">📚 dKloud MicroCourses</h3>
        </div>
        <p className="text-muted-foreground mb-4">
          Future-Ready Tech Learning, Visual & Simplified — Now Available at Our Course Hub!
        </p>
        <Button 
          onClick={handleExploreNow}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white font-medium"
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Explore All Courses
        </Button>
      </div>

      {/* Course Categories */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <Card 
            key={course.id} 
            className="group relative overflow-hidden bg-gradient-to-br from-background to-muted/50 border-2 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20 cursor-pointer"
            onClick={handleExploreNow}
          >
            {/* Animated glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-500" 
                 style={{background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--secondary)))`}} />
            
            {/* Badge */}
            <div className="absolute top-4 right-4 z-10">
              <Badge className="bg-green-100 text-green-700 border-green-300">
                ✅ Available Now
              </Badge>
            </div>

            {/* Level Badge */}
            <div className="absolute top-4 left-4 z-10">
              <Badge variant="outline" className="text-xs">
                {course.level}
              </Badge>
            </div>

            <CardHeader className="text-center pb-4">
              {/* Icon */}
              <div className={`mx-auto w-14 h-14 rounded-full bg-gradient-to-r ${course.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {course.icon}
              </div>

              {/* Title and Category */}
              <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">
                {course.title}
              </CardTitle>
              
              <Badge variant="secondary" className="mb-3">
                {course.category}
              </Badge>

              <CardDescription className="text-sm leading-relaxed">
                {course.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Course Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4 text-primary" />
                    <span className="text-primary font-medium">{course.badge}</span>
                  </div>
                </div>

                {/* Modules */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Course Modules</p>
                  <div className="space-y-1">
                    {course.modules.slice(0, 3).map((module, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs">
                        <Sparkles className="h-3 w-3 text-primary" />
                        <span>{module}</span>
                      </div>
                    ))}
                    {course.modules.length > 3 && (
                      <p className="text-xs text-muted-foreground pl-5">
                        +{course.modules.length - 3} more modules
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button 
                className={`w-full bg-gradient-to-r ${course.gradient} hover:opacity-90 text-white font-medium group-hover:shadow-lg transition-all duration-300`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleExploreNow();
                }}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Learn More
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderTutorials = () => (
    <div className="text-center py-16">
      <div className="mb-4">
        <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-white mb-4">
          <Video className="h-8 w-8" />
        </div>
      </div>
      <h3 className="text-2xl font-bold mb-4">Video Tutorials</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Step-by-step video tutorials for hands-on learning
      </p>
      <Badge className="animate-pulse">🚀 Coming Soon</Badge>
    </div>
  );

  const renderYouTubeLearning = () => {
    if (resourcesLoading) {
      return (
        <div className="text-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading learning resources...</p>
        </div>
      );
    }

    const youtubeChannels = getYouTubeChannels();
    const learningWebsites = getLearningWebsites();

    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 border border-primary/20 text-center">
          <div className="flex items-center justify-center mb-3">
            <Video className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-xl font-bold">📺 Best YouTube Channels & Learning Websites</h3>
          </div>
          <p className="text-muted-foreground">
            Curated collection of the best YouTube channels and websites to accelerate your tech learning journey.
          </p>
        </div>

        {/* YouTube Channels Section */}
        {youtubeChannels.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-center mb-6">📺 YouTube Channels</h4>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {youtubeChannels.map((channel, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {channel.Name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {channel.Description}
                        </CardDescription>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant="secondary">{channel.Category}</Badge>
                        {channel.Subscribers && (
                          <Badge variant="outline" className="text-red-600 border-red-600">
                            {channel.Subscribers} Subscribers
                          </Badge>
                        )}
                      </div>
                      
                      {channel.Rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{channel.Rating}/5</span>
                        </div>
                      )}

                      <Button 
                        asChild 
                        className="w-full mt-4"
                        variant="outline"
                      >
                        <a 
                          href={channel.URL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Video className="h-4 w-4" />
                          Watch Channel
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Learning Websites Section */}
        {learningWebsites.length > 0 && (
          <div className="space-y-6">
            <h4 className="text-2xl font-bold text-center mb-6">🌐 Learning Websites</h4>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {learningWebsites.map((website, index) => (
                <Card 
                  key={index} 
                  className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {website.Name}
                        </CardTitle>
                        <CardDescription className="mt-2">
                          {website.Description}
                        </CardDescription>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{website.Category}</Badge>
                      </div>
                      
                      {website.Rating && (
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium">{website.Rating}/5</span>
                        </div>
                      )}

                      <Button 
                        asChild 
                        className="w-full mt-4"
                        variant="outline"
                      >
                        <a 
                          href={website.URL} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                          <Globe className="h-4 w-4" />
                          Visit Website
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {youtubeChannels.length === 0 && learningWebsites.length === 0 && (
          <div className="text-center py-12">
            <Video className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No learning resources found</h3>
            <p className="text-muted-foreground">
              Learning resources will be available soon!
            </p>
          </div>
        )}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'free-hacks':
        return renderFreeHacks();
      case 'courses':
        return renderCourses();
      case 'tutorials':
        return renderTutorials();
      case 'youtube-learning':
        return renderYouTubeLearning();
      default:
        return renderFreeHacks();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative">
      <BackgroundQuestions />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              📚 dKloud TechCorner
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Future-Ready Tech Learning, Visual & Simplified. Short, practical, high-impact courses designed for freshers, switchers, and freelancers.
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <ModernIconTabs 
            tabs={tabs}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>
    </div>
  );
};

export default TechCorner;
