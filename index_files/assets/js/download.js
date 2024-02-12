document.addEventListener('DOMContentLoaded', function () {
    const downloadInfoContainer = document.getElementById('download-info');
    const urlParams = new URLSearchParams(window.location.search);
    const packToDownload = urlParams.get('pack');
  const packImage = urlParams.get('a');

    if (packToDownload) {
        displayDownloadInfo(packToDownload);
        setBackgroundImage(packToDownload);
        simulateDownload();
    } else {
        downloadInfoContainer.innerHTML = '<p>No music pack selected for download.</p>';
    }
});

function simulateDownload() {
    const progressElement = document.getElementById("h1");
    let progress = 0;

    function updateProgress() {
        progress += Math.random() / 2;
        progressElement.innerHTML = `Downloading Your Music Pack... ${Math.round(Math.min(progress, 100).toFixed(2))}%`;

        if (progress < 100) {
            setTimeout(updateProgress, 0);
        } else {
            progressElement.innerHTML = "Done!";
            redirectToDownload();
        }
    }

    setTimeout(updateProgress, 1);
}

function redirectToDownload() {
    const urlParams = new URLSearchParams(window.location.search);
    const packToDownload = urlParams.get("pack");

    let downloadLink = '';

    fetch('/getTotalDownloads')
    .then(response => response.json())
    .then(currentCount => {
        const newCount = currentCount + 1;

        return fetch('/incrementTotalDownloads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newCount })
        });
    })
    .then(response => {
        if (response.ok) {
            console.log('TotalDownloads.txt incremented by 1');


            document.cookie = `downloaded=${1}; path=/`;

            if (packToDownload === '[Dubstep] Owe Pack') {
                downloadLink = 'https://splash-packs.bytepioneer.repl.co/assets/packs/[Vaultune] Owe Pack.zip';
            } else if (packToDownload === "[Trap] Flex Pack") {
                downloadLink = 'https://splash-packs.bytepioneer.repl.co/assets/packs/[Vaultune] Flex Pack.zip';
            } else if (packToDownload === "[Hybrid Trap] Tell Pack") {
                downloadLink = 'https://splash-packs.bytepioneer.repl.co/assets/packs/[Vaultune] Tell Pack.zip';
            }

            window.location.href = downloadLink;
        } else {
            console.error('Failed to increment TotalDownloads.txt');
        }
    })
    .catch(error => {
        console.error('Error fetching or incrementing TotalDownloads.txt:', error);
    });
}



function displayDownloadInfo(packName) {
    const downloadInfoContainer = document.getElementById('download-info');
    downloadInfoContainer.innerHTML = `
        <p>You are about to download:</p>
        <h2>${packName}</h2>
    `;
}

function setBackgroundImage(packName) {
    const downloadContainer = document.getElementById('download-info');
    const backgroundImageUrl = getBackgroundImageUrl(packImage);

    if (backgroundImageUrl) {
        downloadContainer.style.backgroundImage = `url('${backgroundImageUrl}')`;
        downloadContainer.style.opacity = 0.9;
    }
}

function getBackgroundImageUrl(pack) {
  return `https://80966467-f955-4a51-ad29-39600699e8b2-00-3tz3nu34rn2ki.worf.replit.dev/assets/images/${pack}.jpeg`;
}

document.addEventListener('DOMContentLoaded', function () {
    const downloadInfoContainer = document.getElementById('download-info');
    const urlParams = new URLSearchParams(window.location.search);
    const packToDownload = urlParams.get('pack');
    const packImage = urlParams.get('a') || 'defaultImage';

    if (packToDownload) {
        displayDownloadInfo(packToDownload);
        setBackgroundImage(packToDownload, packImage);
        simulateDownload();
    } else {
        downloadInfoContainer.innerHTML = '<p>No music pack selected for download.</p>';
    }
});

function simulateDownload() {
    const progressElement = document.getElementById("h1");
    let progress = 0;

    function updateProgress() {
        progress += Math.random() / 2;
        progressElement.innerHTML = `Downloading Your Music Pack... ${Math.round(Math.min(progress, 100).toFixed(2))}%`;

        if (progress < 100) {
            setTimeout(updateProgress, 0);
        } else {
            progressElement.innerHTML = "Done!";
            redirectToDownload();
        }
    }

    setTimeout(updateProgress, 1);
}

function redirectToDownload() {
    const urlParams = new URLSearchParams(window.location.search);
    const packToDownload = urlParams.get("pack");
    let downloadLink = '';

    fetch('/getTotalDownloads')
    .then(response => response.json())
    .then(currentCount => {
        const newCount = currentCount + 1;

        return fetch('/incrementTotalDownloads', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ newCount })
        });
    })
    .then(response => {
        if (response.ok) {
            document.cookie = `downloaded=${1}; path=/`;

            if (packToDownload === '[Dubstep] Owe Pack') {
                downloadLink = 'https://splash-packs.bytepioneer.repl.co/assets/packs/[Vaultune] Owe Pack.zip';
            } else if (packToDownload === "[Trap] Flex Pack") {
                downloadLink = 'https://splash-packs.bytepioneer.repl.co/assets/packs/[Vaultune] Flex Pack.zip';
            } else if (packToDownload === "[Hybrid Trap] Tell Pack") {
                downloadLink = 'https://splash-packs.bytepioneer.repl.co/assets/packs/[Vaultune] Tell Pack.zip';
            }

            window.location.href = downloadLink;
        } else {
            console.error('Failed to increment TotalDownloads.txt');
        }
    })
    .catch(error => {
        console.error('Error fetching or incrementing TotalDownloads.txt:', error);
    });
}

function displayDownloadInfo(packName) {
    const downloadInfoContainer = document.getElementById('download-info');
    downloadInfoContainer.innerHTML = `
        <p>You are about to download:</p>
        <h2>${packName}</h2>
    `;
}

function setBackgroundImage(packName, packImage) {
    const downloadContainer = document.getElementById('download-info');
    const backgroundImageUrl = getBackgroundImageUrl(packImage);

    if (backgroundImageUrl) {
        downloadContainer.style.backgroundImage = `url('${backgroundImageUrl}')`;
        downloadContainer.style.backgroundSize = 'cover';
        downloadContainer.style.backgroundRepeat = 'no-repeat';
        downloadContainer.style.backgroundPosition = 'center';
        downloadContainer.style.opacity = 0.6;
    }
}

function getBackgroundImageUrl(pack) {
  return `https://80966467-f955-4a51-ad29-39600699e8b2-00-3tz3nu34rn2ki.worf.replit.dev/assets/images/${pack}.jpeg`;
}

function copyLink() {
  const mainDirectory = window.location.href;
  const tempInput = document.createElement('input');
  tempInput.value = mainDirectory;
  document.body.appendChild(tempInput);
  tempInput.select();
  document.execCommand('copy');
  document.body.removeChild(tempInput);

  const copyTextElement = document.getElementById("copy-link");

  if (copyTextElement) {
    copyTextElement.innerHTML = "Copied Link!";

    setTimeout(function() {
      copyTextElement.innerHTML = "Share Download Link.";
    }, 2500);
  } else {
    console.error("Element with id 'copy-link' not found");
  }
}
