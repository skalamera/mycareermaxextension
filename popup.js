saveButton.addEventListener('click', function() {
  const userId = document.getElementById('userId').value; // Change 'username' to 'userId'
  console.log("Before saving: ", userId);

  chrome.storage.local.set({ userId: userId }, function() { // Change 'username' to 'userId'
    if (chrome.runtime.lastError) {
      alert('An error occurred: ' + chrome.runtime.lastError.message);
    } else {
      alert('User ID saved');
    }
  });

  chrome.storage.local.get(['userId'], function(result) {
    console.log("After saving: ", result.userId); // Change 'username' to 'userId'
  });
});
