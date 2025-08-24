// Create this as a separate page: app/api-test/page.js
'use client';

import { useState, useCallback } from 'react';

export default function APITest() {
  const [testResults, setTestResults] = useState({});
  const [loading, setLoading] = useState({});

  const runTest = useCallback(async (testName, testFn) => {
    setLoading(prev => ({ ...prev, [testName]: true }));
    try {
      const result = await testFn();
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: true, data: result } 
      }));
    } catch (error) {
      setTestResults(prev => ({ 
        ...prev, 
        [testName]: { success: false, error: error.message } 
      }));
    }
    setLoading(prev => ({ ...prev, [testName]: false }));
  }, []);

  // Test 1: Your actual Instagram widget API
  const testYourAPI = async () => {
    // Replace with a real widget ID from your system
    const testWidgetId = 'test-widget-id'; // You need to provide this
    
    const response = await fetch('https://www.graceandgrow.co/api/fetch-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        widgetId: testWidgetId
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  };

  // Test 2: Public API (control test)
  const testPublicAPI = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    return await response.json();
  };

  // Test 3: CORS test
  const testCORS = async () => {
    const response = await fetch('https://api.github.com/users/octocat');
    const data = await response.json();
    return {
      login: data.login,
      public_repos: data.public_repos,
      followers: data.followers
    };
  };

  // Test 4: Complex data processing (simulate your widget logic)
  const testDataProcessing = async () => {
    // Simulate what your ProWidget does with data
    const sampleData = {
      data: [
        { id: 1, platform: 'Instagram', status: 'Published', title: 'Test 1' },
        { id: 2, platform: 'TikTok', status: 'Draft', title: 'Test 2' },
        { id: 3, platform: 'Instagram', status: 'Published', title: 'Test 3' },
      ],
      platformSupport: {
        allPlatforms: ['Instagram', 'TikTok'],
        stats: { Instagram: 2, TikTok: 1 }
      }
    };

    // Mimic your filtering logic
    const filteredData = sampleData.data.filter(item => item.platform === 'Instagram');
    const platforms = [...new Set(sampleData.data.map(item => item.platform))];
    
    return {
      originalCount: sampleData.data.length,
      filteredCount: filteredData.length,
      platforms,
      processing: 'Complex data manipulation working!'
    };
  };

  const TestResult = ({ name, result, isLoading }) => (
    <div style={{
      margin: '15px 0',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      backgroundColor: result?.success === true ? '#d4edda' : 
                     result?.success === false ? '#f8d7da' : 'white'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>
        {name}
      </h3>
      
      {isLoading ? (
        <div style={{ color: '#007bff' }}>🔄 Testing...</div>
      ) : result ? (
        result.success ? (
          <div>
            <div style={{ color: '#155724', marginBottom: '10px' }}>
              ✅ Success!
            </div>
            <pre style={{ 
              background: '#f8f9fa', 
              padding: '10px', 
              borderRadius: '4px', 
              fontSize: '12px',
              overflow: 'auto',
              maxHeight: '200px'
            }}>
              {typeof result.data === 'string' ? result.data : JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        ) : (
          <div>
            <div style={{ color: '#721c24', marginBottom: '10px' }}>
              ❌ Failed: {result.error}
            </div>
          </div>
        )
      ) : (
        <div style={{ color: '#6c757d' }}>Ready to test</div>
      )}
      
      <button
        onClick={() => runTest(name, 
          name === 'Your Instagram API' ? testYourAPI :
          name === 'Public API' ? testPublicAPI :
          name === 'CORS Test' ? testCORS : testDataProcessing
        )}
        disabled={isLoading}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: isLoading ? 'not-allowed' : 'pointer',
          opacity: isLoading ? 0.6 : 1
        }}
      >
        {isLoading ? 'Testing...' : 'Run Test'}
      </button>
    </div>
  );

  return (
    <div style={{
      maxWidth: '800px',
      margin: '20px auto',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>
        🧪 Next.js API & Functionality Test
      </h1>
      
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
        Testing the exact same functionality as your Instagram widget
      </p>

      <TestResult 
        name="Your Instagram API" 
        result={testResults['Your Instagram API']} 
        isLoading={loading['Your Instagram API']}
      />
      
      <TestResult 
        name="Public API" 
        result={testResults['Public API']} 
        isLoading={loading['Public API']}
      />
      
      <TestResult 
        name="CORS Test" 
        result={testResults['CORS Test']} 
        isLoading={loading['CORS Test']}
      />
      
      <TestResult 
        name="Data Processing" 
        result={testResults['Data Processing']} 
        isLoading={loading['Data Processing']}
      />

      <div style={{
        marginTop: '30px',
        padding: '15px',
        backgroundColor: '#e9ecef',
        borderRadius: '8px'
      }}>
        <h3>How to Test:</h3>
        <ol style={{ paddingLeft: '20px' }}>
          <li>First test "Public API" - this should always work</li>
          <li>Then test "Data Processing" - tests React logic</li>
          <li>Test "CORS" - checks cross-origin requests</li>
          <li>Finally test "Your Instagram API" (need real widget ID)</li>
        </ol>
        <p style={{ marginTop: '15px', fontSize: '14px', color: '#666' }}>
          For the Instagram API test, you'll need to replace 'test-widget-id' with a real widget ID from your system.
        </p>
      </div>
    </div>
  );
}