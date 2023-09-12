
// Fetch the user's resume from the Flask API based on the user_id
function getResumeFromAPI(userId) {
  return fetch(`http://localhost:5000/api/get_resume?user_id=${userId}`)
    .then(response => response.json())
    .then(data => {
      if (data.resume) {
        return data.resume;
      } else {
        console.log('No resume found for this user.');
        return null;
      }
    })
    .catch(error => {
      console.error('Error fetching resume:', error);
      return null;
    });
}

// Main function that fetches the user_id and sets up the focus event listener
async function main() {
  // Fetch the user_id from chrome.storage.local
  let userId;
  chrome.storage.local.get(['userId'], function(result) {
    userId = result.userId;

    if (!userId) {
      console.log('No user ID found. Please set it in the extension popup.');
      return;
    }

    // Fetch the resume based on the user_id
    getResumeFromAPI(userId).then(resume => {
      if (resume) {
        // Set up the focus event listener
        document.addEventListener('focusin', function(e) {
          if (e.target.tagName.toLowerCase() === 'input') {
            
    // Function to fetch the relevant part of the resume based on the field name or ID
    function getRelevantResumePart(fieldName, fullResume) {
      // Assuming fullResume is a JSON object
      if (fullResume.hasOwnProperty(fieldName)) {
        return fullResume[fieldName];
      }
      return "";  // Default empty string if the field name doesn't match any keys in the resume
    }

    const tagName = e.target.tagName.toLowerCase();
    if (tagName === 'input' || tagName === 'textarea') {
      // Get the name or ID of the input/textarea field to determine what part of the resume to paste
      const fieldName = e.target.name || e.target.id;

      // Assuming resume is a JSON object, replace this with actual parsing logic if needed
      const fullResume = JSON.parse(resume);
      
      // Fetch the relevant part of the resume
      const relevantPart = getRelevantResumePart(fieldName, fullResume);

      // Paste the relevant part into the input/textarea field
      e.target.value = relevantPart;
    }
    
            e.target.value = resume; // You'll probably want to parse the resume to fill specific fields
          }
        });
      }
    });
  });
}

// Call the main function
main();
