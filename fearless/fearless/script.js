const versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
let version = "";
let champions = [];
let bannedChampions = new Set(); // 금지된 챔피언을 추적하는 Set

// 최신 버전과 챔피언 목록 가져오기
fetch(versionsUrl)
  .then((response) => response.json())
  .then((versions) => {
    version = versions[0];
    return fetch(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
    );
  })
  .then((response) => response.json())
  .then((data) => {
    champions = Object.values(data.data);
    champions.sort((a, b) => a.name.localeCompare(b.name, "ko"));
    renderChampionList(champions);
  })
  .catch((error) =>
    console.error("챔피언 데이터를 불러오는 중 오류 발생:", error)
  );

// 챔피언 목록 렌더링
function renderChampionList(championList) {
  const championListDiv = document.getElementById("champion-list");
  championListDiv.innerHTML = "";

  championList.forEach((champion) => {
    const championDiv = document.createElement("div");
    championDiv.className = "champion";
    if (bannedChampions.has(champion.id)) {
      championDiv.classList.add("unavailable");
    }
    championDiv.addEventListener("click", () =>
      toggleChampion(championDiv, champion.id)
    );

    const img = document.createElement("img");
    img.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
    img.alt = champion.name;

    const name = document.createElement("p");
    name.textContent = champion.name;

    championDiv.appendChild(img);
    championDiv.appendChild(name);
    championListDiv.appendChild(championDiv);
  });

  updateBannedCount();
}

// 챔피언 금지 및 해제
function toggleChampion(championDiv, championId) {
  if (championDiv.classList.contains("unavailable")) {
    championDiv.classList.remove("unavailable");
    bannedChampions.delete(championId);
  } else {
    championDiv.classList.add("unavailable");
    bannedChampions.add(championId);
  }
  updateBannedCount();
}

// 금지된 챔피언 수 업데이트
function updateBannedCount() {
  const bannedCount = bannedChampions.size;
  document.getElementById(
    "banned-count"
  ).textContent = `현재 금지된 챔피언 수 : ${bannedCount}`;
}

// 챔피언 필터링
function filterChampions(query) {
  const cleanedQuery = query
    .replace(/[^가-힣a-zA-Z0-9]/g, "")
    .replace(/[\u3131-\u318E\u314F-\u3163]/g, "");
  const filteredChampions = champions.filter((champion) =>
    champion.name.includes(cleanedQuery)
  );
  renderChampionList(filteredChampions);
}

// 입력 이벤트 처리
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("champion-search");
  input.addEventListener("keyup", (e) => {
    filterChampions(e.target.value);
  });

  // 입력 지우기 버튼
  const clearButton = document.querySelector(".clear-button");
  clearButton.addEventListener("click", () => {
    input.value = "";
    filterChampions("");
  });

  // 리셋 버튼 이벤트 처리
  const resetButton = document.getElementById("reset-button");
  resetButton.addEventListener("click", () => {
    bannedChampions.clear(); // 금지된 챔피언 목록 초기화
    input.value = ""; // 입력 필드 초기화
    renderChampionList(champions); // 모든 챔피언 목록 다시 표시
  });
});
