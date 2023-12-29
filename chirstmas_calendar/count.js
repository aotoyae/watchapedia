const targetDate = new Date("2024-12-25");

function updateCountdown() {
  const now = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const timeRemaining = targetDate - now;

  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  const countdownElement = document.getElementById("countdown");
  countdownElement.innerHTML = `
      <span>D-${days} ${hours}h ${minutes}m ${seconds}s</span> ~`;
}
// 페이지 로드 시 업데이트 수행
updateCountdown();

// 1초마다 업데이트
setInterval(updateCountdown, 1000);

// 날짜 기준 카드 오픈 기능
const doors = document.querySelectorAll(".door");
doors.forEach((door, index) => {
  door.addEventListener("click", () => {
    const now = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Asia/Seoul" })
    );

    // 각 날짜에 해당하는 날짜 계산, 2023년 12월 1일부터 시작
    const openDate = new Date(2023, 11, index + 15);

    if (now.getTime() > openDate.getTime()) {
      const imageUrl = `image/tree_red.jpg`;

      const doorDiv = document.querySelector(`.day-${index + 15}`);
      const backDiv = doorDiv.querySelector(`.back`);

      const style = window.getComputedStyle(backDiv);
      const pTag = backDiv.querySelector("p");
      const text = modalMessageList[index]["message"];

      showModal(imageUrl, text);
    } else {
      const daysRemaining = Math.ceil((openDate - now) / (1000 * 60 * 60 * 24));
      console.log(openDate, now, daysRemaining);
      alert(`이 카드는 ${daysRemaining}일 후에 열린답니다 ☺️`);
    }
  });
});
