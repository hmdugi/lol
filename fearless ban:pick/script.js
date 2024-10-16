const versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
let version = "";

fetch(versionsUrl)
    .then(response => response.json())
    .then(versions => {
        version = versions[0]; // 최신 버전은 항상 배열의 첫 번째 항목에 있습니다.
        return fetch(`https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`);
    })
    .then(response => response.json())
    .then(data => {
        const champions = Object.values(data.data);
        champions.sort((a, b) => a.name.localeCompare(b.name, 'ko'));
        const championListDiv = document.getElementById('champion-list');

        for (let key in champions) {
            if (champions.hasOwnProperty(key)) {
                const champion = champions[key];
                const championDiv = document.createElement('div');
                championDiv.className = 'champion';
                championDiv.addEventListener('click', () => toggleChampion(championDiv));

                const img = document.createElement('img');
                img.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
                img.alt = champion.name;

                const name = document.createElement('p');
                name.textContent = champion.name;

                championDiv.appendChild(img);
                championDiv.appendChild(name);
                championListDiv.appendChild(championDiv);
            }
        }
    })
    .catch(error => console.error("챔피언 데이터를 불러오는 중 오류 발생:", error));

function toggleChampion(championDiv) {
    if (championDiv.classList.contains('unavailable')) {
        championDiv.classList.remove('unavailable');
    } else {
        championDiv.classList.add('unavailable');
    }
}
