function redirect(value) {
    window.location.href = `${window.location.href}/${value}`;
}

document.addEventListener('DOMContentLoaded', function () {
    const audioElements = document.querySelectorAll('audio');

    audioElements.forEach((audio) => {
        const audioId = audio.id;
        const loading = document.getElementById(`loading${audioId}`);
        loading.style.display = 'block';

        const minLoadingDuration = 500;
        const startLoadingTime = Date.now();

        audio.load();

        audio.addEventListener('canplaythrough', () => {
            const controls = document.querySelector(`#${audioId} + .audio-controls, .play-pause`);
            controls.innerHTML = "&#9654;";
            const elapsedTime = Date.now() - startLoadingTime;
            const remainingTime = Math.max(0, minLoadingDuration - elapsedTime);

            setTimeout(() => {
                loading.style.display = 'none';
            }, remainingTime);
        });

        audio.addEventListener('ended', () => {
          document.querySelectorAll('.play-pause').forEach(element => element.innerHTML = "&#9654;");
        });
    });
});

function togglePlayPause(audioId, button) {
    const audioElements = document.querySelectorAll('audio');

    audioElements.forEach((audio) => {
        if (audio.id !== audioId) {
            audio.pause();
        }
    });

    const audio = document.getElementById(audioId);

  document.querySelectorAll('.play-pause').forEach(element => element.innerHTML = "&#9654;");

    if (audio.paused) {
        audio.play();
        button.innerHTML = "&#10074;&#10074;";
    } else {
        audio.pause();
        button.innerHTML = "&#9654;";
    }
}

function toggleOffSalePacks() {
    const offSalePacks = document.querySelectorAll('.music-pack[value="off-sale"]');
    const checkbox = document.getElementById('toggleCheckbox');
    const toggleLabel = document.querySelector('.toggle-label');

    offSalePacks.forEach((pack) => {
        pack.style.display = checkbox.checked ? 'block' : 'none';
    });

    toggleLabel.innerHTML = checkbox.checked ? "&#10003;" : "&#10005;";
}

function toggleAlbumPacks() {
    const albumPacks = document.querySelectorAll('.music-pack');
    const checkbox = document.getElementById('toggleAlbumPacks');
    const toggleLabel = document.getElementById('toggleLabel');

    const hiddenPackNames = ['kai', 'krazy', 'glitch', 'dex', 'void', 'xcite'];

    albumPacks.forEach((pack) => {
        const packNameAttribute = pack.getAttribute('name');
        const packName = packNameAttribute ? packNameAttribute.toLowerCase() : '';
        const isHiddenPack = hiddenPackNames.includes(packName);

        pack.classList.toggle('hidden', checkbox.checked && !isHiddenPack);
    });

    toggleLabel.innerHTML = checkbox.checked ? "&#10003;" : "&#10005;";
}
