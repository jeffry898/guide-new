export async function scheduled(event: any, env: any) {
  // Use the app URL from env or fallback to shared/dev URL pattern if available
  const baseUrl = env.APP_URL || 'https://guides.geniuzlab.com';
  
  console.log(`Triggering daily sequence at ${new Date().toISOString()}`);
  
  try {
    const response = await fetch(`${baseUrl}/api/risk-report/send-sequence`, {
      method: 'POST'
    });
    
    if (!response.ok) {
      throw new Error(`Failed to trigger sequence: ${response.statusText}`);
    }
    
    const result = await response.json();
    console.log('Sequence result:', result);
  } catch (error) {
    console.error('Error in daily-emails scheduled task:', error);
  }
}
