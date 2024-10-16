// const versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
// let version = "";
// let champions = [];

// fetch(versionsUrl)
//   .then((response) => response.json())
//   .then((versions) => {
//     version = versions[0]; // 최신 버전은 항상 배열의 첫 번째 항목에 있습니다.
//     return fetch(
//       `https://ddragon.leagueoflegends.com/cdn/${version}/data/ko_KR/champion.json`
//     );
//   })
//   .then((response) => response.json())
//   .then((data) => {
//     const champions = Object.values(data.data);
//     champions.sort((a, b) => a.name.localeCompare(b.name, "ko"));
//     const championListDiv = document.getElementById("champion-list");

//     for (let key in champions) {
//       if (champions.hasOwnProperty(key)) {
//         const champion = champions[key];
//         const championDiv = document.createElement("div");
//         championDiv.className = "champion";
//         championDiv.addEventListener("click", () =>
//           toggleChampion(championDiv)
//         );

//         const img = document.createElement("img");
//         img.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
//         img.alt = champion.name;

//         const name = document.createElement("p");
//         name.textContent = champion.name;

//         championDiv.appendChild(img);
//         championDiv.appendChild(name);
//         championListDiv.appendChild(championDiv);
//       }
//     }
//   })
//   .catch((error) =>
//     console.error("챔피언 데이터를 불러오는 중 오류 발생:", error)
//   );

// // 챔피언 목록 렌더링
// function renderChampionList(championList) {
//   const championListDiv = document.getElementById("champion-list");
//   championListDiv.innerHTML = "";

//   championList.forEach((champion) => {
//     const championDiv = document.createElement("div");
//     championDiv.className = "champion";
//     championDiv.addEventListener("click", () => toggleChampion(championDiv));

//     const img = document.createElement("img");
//     img.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
//     img.alt = champion.name;

//     const name = document.createElement("p");
//     name.textContent = champion.name;

//     championDiv.appendChild(img);
//     championDiv.appendChild(name);
//     championListDiv.appendChild(championDiv);
//   });
// }

// // 금지된 챔피언 수 업데이트
// function updateBannedCount() {
//   const bannedCount = document.querySelectorAll(".champion.unavailable").length;
//   document.getElementById(
//     "banned-count"
//   ).textContent = `현재 금지된 챔피언 수 : ${bannedCount}`;
// }

// function toggleChampion(championDiv) {
//   if (championDiv.classList.contains("unavailable")) {
//     championDiv.classList.remove("unavailable");
//   } else {
//     championDiv.classList.add("unavailable");
//   }
//   updateBannedCount();
// }

// // 챔피언 필터링
// function filterChampions(query) {
//   const cleanedQuery = query
//     .replace(/[^가-힣a-zA-Z0-9]/g, "")
//     .replace(/[\u3131-\u318E\u314F-\u3163]/g, "");
//   const filteredChampions = champions.filter((champion) =>
//     champion.name.includes(cleanedQuery)
//   );
//   renderChampionList(filteredChampions);
// }

// // 입력 이벤트 처리
// document.getElementById("champion-search").addEventListener("keyup", (e) => {
//   filterChampions(e.target.value);
// });

// // 입력 지우기 버튼
// function clearInput() {
//   const input = document.getElementById("champion-search");
//   input.value = "";
//   filterChampions("");
// }

const versionsUrl = "https://ddragon.leagueoflegends.com/api/versions.json";
let version = "";
let champions = [];

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
    championDiv.addEventListener("click", () => toggleChampion(championDiv));

    const img = document.createElement("img");
    img.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${champion.image.full}`;
    img.alt = champion.name;

    const name = document.createElement("p");
    name.textContent = champion.name;

    championDiv.appendChild(img);
    championDiv.appendChild(name);
    championListDiv.appendChild(championDiv);
  });
}

// 금지된 챔피언 수 업데이트
function updateBannedCount() {
  const bannedCount = document.querySelectorAll(".champion.unavailable").length;
  document.getElementById(
    "banned-count"
  ).textContent = `현재 금지된 챔피언 수 : ${bannedCount}`;
}

// 챔피언 금지 및 해제
function toggleChampion(championDiv) {
  if (championDiv.classList.contains("unavailable")) {
    championDiv.classList.remove("unavailable");
  } else {
    championDiv.classList.add("unavailable");
  }
  updateBannedCount();
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
    renderChampionList(champions); // 모든 챔피언 다시 표시
  });
});
