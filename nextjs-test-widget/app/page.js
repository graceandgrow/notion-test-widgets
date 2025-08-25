// app/page.js
'use client';

import { useState, useEffect, useMemo } from 'react';

// Simplified InstagramHeader component
function InstagramHeader({ bioData, isVisible }) {
  const profileData = bioData || {
    username: '@test_account',
    name: 'Test Account',
    bio: 'Testing Instagram widget on mobile\nSimplified version for testing',
    website: 'example.com'
  };

  if (!isVisible) return null;

  return (
    <div style={{ 
      padding: '20px', 
      borderBottom: '1px solid #efefef',
      textAlign: 'center',
      background: 'white'
    }}>
      <div style={{
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
        margin: '0 auto 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
        CAM
      </div>
      <h1 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 5px 0' }}>
        {profileData.username}
      </h1>
      {profileData.name && (
        <h2 style={{ fontSize: '14px', fontWeight: 'normal', color: '#8e8e8e', margin: '0 0 10px 0' }}>
          {profileData.name}
        </h2>
      )}
      {profileData.bio && (
        <p style={{ fontSize: '14px', lineHeight: '1.4', margin: '10px 0', whiteSpace: 'pre-line' }}>
          {profileData.bio}
        </p>
      )}
    </div>
  );
}

// Main ProWidget component
export default function SimplifiedProWidget() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showBio, setShowBio] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [testStatus, setTestStatus] = useState({
    react: false,
    hooks: false,
    effects: false,
    api: false
  });

  // Simulate your image data structure
  const sampleImages = [
    { id: 1, title: 'Test Image 1', platform: 'Instagram', media: [{ url: 'https://picsum.photos/300/300?random=1' }] },
    { id: 2, title: 'Test Image 2', platform: 'TikTok', media: [{ url: 'https://picsum.photos/300/300?random=2' }] },
    { id: 3, title: 'Test Image 3', platform: 'Instagram', media: [{ url: 'https://picsum.photos/300/300?random=3' }] },
    { id: 4, title: 'Test Image 4', platform: 'Instagram', media: [{ url: 'https://picsum.photos/300/300?random=4' }] },
    { id: 5, title: 'Test Image 5', platform: 'TikTok', media: [{ url: 'https://picsum.photos/300/300?random=5' }] },
    { id: 6, title: 'Test Image 6', platform: 'Instagram', media: [{ url: 'https://picsum.photos/300/300?random=6' }] },
    { id: 7, title: 'Test Image 7', platform: 'Instagram', media: [{ url: 'https://picsum.photos/300/300?random=7' }] },
    { id: 8, title: 'Test Image 8', platform: 'TikTok', media: [{ url: 'https://picsum.photos/300/300?random=8' }] },
    { id: 9, title: 'Test Image 9', platform: 'Instagram', media: [{ url: 'https://picsum.photos/300/300?random=9' }] },
  ];

  // Test React hooks and effects
  useEffect(() => {
    console.log('useEffect working - component mounted');
    setTestStatus(prev => ({ ...prev, react: true, effects: true }));
    
    // Simulate data loading
    setTimeout(() => {
      setImages(sampleImages);
      setLoading(false);
      setTestStatus(prev => ({ ...prev, hooks: true }));
      console.log('useState working - data loaded');
    }, 1000);
  }, [sampleImages]);

  // Test API simulation
  useEffect(() => {
    const testAPI = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        console.log('API fetch working:', data.title);
        setTestStatus(prev => ({ ...prev, api: true }));
      } catch (error) {
        console.log('API fetch failed:', error.message);
      }
    };
    testAPI();
  }, []);

  // Mimic your filtering logic
  const filteredImages = useMemo(() => {
    if (selectedPlatform === 'all') return images;
    return images.filter(img => img.platform === selectedPlatform);
  }, [images, selectedPlatform]);

  const availablePlatforms = useMemo(() => {
    const platforms = images.map(img => img.platform)
      .filter((platform, index, arr) => arr.indexOf(platform) === index);
    return platforms;
  }, [images]);

  // Mimic your grid display logic
  const displayedItems = useMemo(() => {
    const minGridSize = 9;
    const totalItems = Math.max(minGridSize, filteredImages.length);
    return Array.from({ length: totalItems }).map((_, i) => filteredImages[i] || null);
  }, [filteredImages]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log('Refresh triggered');
    setTimeout(() => {
      setIsRefreshing(false);
      console.log('Refresh completed');
    }, 2000);
  };

  const handleBioToggle = () => {
    setShowBio(prev => !prev);
    console.log('Bio toggled:', !showBio);
  };

  const handleImageClick = (item, index) => {
    if (item) {
      alert(`Clicked: ${item.title} (${item.platform})`);
      console.log('Image click working:', item);
    }
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        background: '#fafafa' 
      }}>
        <div>Loading Instagram Widget Test...</div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: '8px', background: '#fafafa' }}>
      {/* Test Status Bar */}
      <div style={{
        background: 'white',
        padding: '10px',
        borderRadius: '8px',
        marginBottom: '10px',
        fontSize: '12px',
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap'
      }}>
        <span style={{ color: testStatus.react ? 'green' : 'red' }}>
          {testStatus.react ? 'OK' : 'FAIL'} React: {testStatus.react ? 'Working' : 'Failed'}
        </span>
        <span style={{ color: testStatus.hooks ? 'green' : 'red' }}>
          {testStatus.hooks ? 'OK' : 'FAIL'} Hooks: {testStatus.hooks ? 'Working' : 'Failed'}
        </span>
        <span style={{ color: testStatus.effects ? 'green' : 'red' }}>
          {testStatus.effects ? 'OK' : 'FAIL'} Effects: {testStatus.effects ? 'Working' : 'Failed'}
        </span>
        <span style={{ color: testStatus.api ? 'green' : 'red' }}>
          {testStatus.api ? 'OK' : 'FAIL'} API: {testStatus.api ? 'Working' : 'Failed'}
        </span>
      </div>

      <div style={{ 
        maxWidth: '375px', 
        margin: '0 auto', 
        background: 'white', 
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        {/* Instagram Header */}
        <InstagramHeader bioData={null} isVisible={showBio} />

        {/* Controls */}
        <div style={{ 
          padding: '15px', 
          borderBottom: '1px solid #efefef',
          display: 'flex',
          gap: '10px',
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            style={{
              padding: '8px 12px',
              backgroundColor: '#0095f6',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>

          <button
            onClick={handleBioToggle}
            style={{
              padding: '8px 12px',
              backgroundColor: showBio ? '#262626' : '#dbdbdb',
              color: showBio ? 'white' : '#262626',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            {showBio ? 'Hide Bio' : 'Show Bio'}
          </button>

          <select
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            style={{
              padding: '8px',
              borderRadius: '6px',
              border: '1px solid #dbdbdb',
              fontSize: '12px'
            }}
          >
            <option value="all">All Platforms</option>
            {availablePlatforms.map(platform => (
              <option key={platform} value={platform}>{platform}</option>
            ))}
          </select>
        </div>

        {/* Instagram Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '2px'
        }}>
          {displayedItems.map((item, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(item, index)}
              style={{
                aspectRatio: '1',
                backgroundColor: '#f0f0f0',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              {item ? (
                <img
                  src={item.media[0]?.url}
                  alt={item.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                  fontSize: '12px',
                  color: '#999'
                }}>
                  {index + 1}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Debug Info */}
        <div style={{
          padding: '10px',
          fontSize: '12px',
          color: '#8e8e8e',
          borderTop: '1px solid #efefef'
        }}>
          Total: {images.length} | Filtered: {filteredImages.length} | Platform: {selectedPlatform}
        </div>
      </div>
    </div>
  );
}