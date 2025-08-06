
// IoT Floating Icons Component
import { useEffect, useState } from "react";
import { 
  Wifi, 
  Smartphone, 
  Watch, 
  Car, 
  Home, 
  Lightbulb, 
  Thermometer, 
  Camera, 
  Speaker, 
  Router,
  Tv,
  Gamepad2,
  Headphones,
  Tablet,
  Laptop,
  Brain,
  Server,
  Cpu,
  Cloud,
  Shield,
  Bluetooth,
  Radio,
  Zap,
  Battery,
  WifiOff,
  Settings,
  Globe,
  Lock,
  Unlock
} from "lucide-react";

const iotIcons = [
  { Icon: Wifi, color: "text-primary" },
  { Icon: Smartphone, color: "text-secondary" },
  { Icon: Watch, color: "text-accent" },
  { Icon: Car, color: "text-primary" },
  { Icon: Home, color: "text-secondary" },
  { Icon: Lightbulb, color: "text-accent" },
  { Icon: Thermometer, color: "text-primary" },
  { Icon: Camera, color: "text-secondary" },
  { Icon: Speaker, color: "text-accent" },
  { Icon: Router, color: "text-primary" },
  { Icon: Tv, color: "text-secondary" },
  { Icon: Gamepad2, color: "text-accent" },
  { Icon: Headphones, color: "text-primary" },
  { Icon: Tablet, color: "text-secondary" },
  { Icon: Laptop, color: "text-accent" },
  { Icon: Brain, color: "text-primary" },
  { Icon: Server, color: "text-secondary" },
  { Icon: Cpu, color: "text-accent" },
  { Icon: Cloud, color: "text-primary" },
  { Icon: Shield, color: "text-secondary" },
  { Icon: Bluetooth, color: "text-accent" },
  { Icon: Radio, color: "text-primary" },
  { Icon: Zap, color: "text-secondary" },
  { Icon: Battery, color: "text-accent" },
  { Icon: Wifi, color: "text-primary" },
  { Icon: WifiOff, color: "text-secondary" },
  { Icon: Settings, color: "text-accent" },
  { Icon: Globe, color: "text-primary" },
  { Icon: Lock, color: "text-secondary" },
  { Icon: Unlock, color: "text-accent" }
];

interface FloatingIcon {
  id: number;
  Icon: any;
  color: string;
  x: number;
  y: number;
  duration: number;
  delay: number;
  scale: number;
  animationType: 'float-up' | 'fade-in-out' | 'spiral' | 'random-direction' | 'power-pulse';
  direction?: number;
}

export function IoTFloatingIcons({ showOnHomePage = false }: { showOnHomePage?: boolean }) {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    if (!showOnHomePage) return;

    const animationTypes: FloatingIcon['animationType'][] = [
      'float-up', 'fade-in-out', 'spiral', 'random-direction', 'power-pulse'
    ];

    const createIcon = () => {
      const randomIcon = iotIcons[Math.floor(Math.random() * iotIcons.length)];
      const animationType = animationTypes[Math.floor(Math.random() * animationTypes.length)];
      
      const newIcon: FloatingIcon = {
        id: Date.now() + Math.random(),
        Icon: randomIcon.Icon,
        color: randomIcon.color,
        x: Math.random() * (window.innerWidth - 60),
        y: animationType === 'fade-in-out' ? Math.random() * (window.innerHeight - 100) : window.innerHeight + 50,
        duration: 12000 + Math.random() * 8000, // Much slower: 12-20s for subtle movement
        delay: Math.random() * 3000, // Increased delay variation
        scale: 0.2 + Math.random() * 0.2, // Much smaller: 0.2-0.4 for very tiny icons
        animationType,
        direction: Math.random() * 360 // for random direction animation
      };

      setFloatingIcons(prev => [...prev, newIcon]);

      // Remove icon after animation completes
      setTimeout(() => {
        setFloatingIcons(prev => prev.filter(icon => icon.id !== newIcon.id));
      }, newIcon.duration + newIcon.delay + 2000);
    };

    // Much less frequent: Every 8-12 seconds for very subtle effect
    const initialInterval = setInterval(createIcon, 8000 + Math.random() * 4000);

    // Cleanup
    return () => clearInterval(initialInterval);
  }, [showOnHomePage]);

  const getAnimationStyle = (icon: FloatingIcon) => {
    const baseStyle = {
      left: `${icon.x}px`,
      animationDelay: `${icon.delay}ms`,
      transform: `scale(${icon.scale})`,
    };

    switch (icon.animationType) {
      case 'float-up':
        return {
          ...baseStyle,
          bottom: `-60px`,
          animationDuration: `${icon.duration}ms`,
        };
      case 'fade-in-out':
        return {
          ...baseStyle,
          top: `${icon.y}px`,
          animationDuration: `${icon.duration}ms`,
        };
      case 'spiral':
        return {
          ...baseStyle,
          bottom: `-60px`,
          animationDuration: `${icon.duration}ms`,
        };
      case 'random-direction':
        return {
          ...baseStyle,
          bottom: `${Math.random() * window.innerHeight}px`,
          animationDuration: `${icon.duration}ms`,
          '--direction': `${icon.direction}deg`,
        } as React.CSSProperties;
      case 'power-pulse':
        return {
          ...baseStyle,
          top: `${icon.y}px`,
          animationDuration: `${icon.duration}ms`,
        };
      default:
        return baseStyle;
    }
  };

  const getAnimationClass = (animationType: FloatingIcon['animationType']) => {
    switch (animationType) {
      case 'float-up':
        return 'animate-float-up opacity-15'; // Much more subtle
      case 'fade-in-out':
        return 'animate-fade-in-out opacity-20'; // Very low opacity
      case 'spiral':
        return 'animate-spiral opacity-15'; // Barely visible
      case 'random-direction':
        return 'animate-random-direction opacity-20'; // Subtle presence
      case 'power-pulse':
        return 'animate-power-pulse opacity-25'; // Slightly more visible but still subtle
      default:
        return 'animate-float-up opacity-30';
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {floatingIcons.map((icon) => (
        <div
          key={icon.id}
          className={`absolute ${getAnimationClass(icon.animationType)}`}
          style={getAnimationStyle(icon)}
        >
          <icon.Icon 
            className={`h-2 w-2 ${icon.color} animate-pulse`} // Very tiny: 8px x 8px
            style={{
              filter: `drop-shadow(0 0 ${icon.animationType === 'power-pulse' ? '12px' : '6px'}) currentColor`, // Reduced glow effect
              animationDuration: icon.animationType === 'power-pulse' ? '2s' : '4s', // Slower pulse animation
              animationDelay: `${Math.random() * 4000}ms` // Increased delay variation
            }}
          />
        </div>
      ))}
    </div>
  );
}
