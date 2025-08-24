import { useState, useEffect } from 'react';

export default function TestWidget() {
  const [clicks, setClicks] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [nextJsWorking, setNextJsWorking] = useState(false);

  useEffect(() => {
    // Confirm Next.js is working
    setNextJsWorking(true);
    console.log('Next.js widget loaded!');
    
    // Device detection
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(mobile);
    
    // Update time
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString());
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setClicks(prev => {
      const newCount = prev + 1;
      console.log('Next.js click registered! Count:', newCount);
      return newCount;
    });
  };

  const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe', '#00f2fe'];
  const bgColor = colors[clicks % colors.length];

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${bgColor} 0%, #2c3e50 100%)`,
      color: 'white',
      fontFamily: 'Arial, sans-serif',
      padding: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'background 0.5s ease'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        padding: '30px',
        borderRadius: '20px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'transform 0.15s ease'
      }}
      onClick={handleClick}
      >
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '50%',
          margin: '0 auto 20px auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '30px'
        }}>
          ⚛️
        </div>
        
        <h1 style={{ margin: '0 0 20px 0', fontSize: '24px' }}>
          Next.js Test Widget!
        </h1>
        
        <div style={{ marginBottom: '15px', opacity: 0.9 }}>
          Testing if Next.js React works in Notion mobile
        </div>
        
        <div style={{
          padding: '10px 20px',
          background: nextJsWorking ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 0, 0, 0.3)',
          borderRadius: '15px',
          fontSize: '14px',
          marginBottom: '10px'
        }}>
          {nextJsWorking ? '✅ Next.js React: WORKING' : '❌ Next.js React: FAILED'}
        </div>
        
        <div style={{
          padding: '10px 20px',
          background: isMobile ? 'rgba(0, 255, 0, 0.3)' : 'rgba(255, 255, 0, 0.3)',
          borderRadius: '15px',
          fontSize: '14px',
          marginBottom: '10px'
        }}>
          {isMobile ? '📱 Mobile Device Detected' : '💻 Desktop Device Detected'}
        </div>
        
        <div style={{
          padding: '10px 20px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '15px',
          fontSize: '14px',
          marginBottom: '10px'
        }}>
          Clicks: {clicks} | Time: {currentTime}
        </div>
        
        <div style={{
          fontSize: '12px',
          opacity: 0.7,
          marginTop: '15px'
        }}>
          Click anywhere to test React state updates!
        </div>
      </div>
    </div>
  );
}