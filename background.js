// Listen for a message from the content script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "fetchResume") {
    getResumeFromAPI(message.userId).then((resume) => {
      sendResponse({ resume: resume });
    });
  }
  return true;  // Will respond asynchronously
});

// Function to fetch the resume from your Flask API based on user_id
async function getResumeFromAPI(userId) {
  try {
    const response = await fetch(`http://localhost:5000/api/get_resume?user_id=${userId}`);
    const data = await response.json();
    if (response.ok) {
      return data.resume;
    } else {
      console.error('Failed to fetch resume:', data.error);
      return null;
    }
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
}
