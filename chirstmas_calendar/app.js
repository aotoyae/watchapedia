function showModal(imageUrl, text) {
  const existingModal = document.querySelector(".modal");
  if (existingModal) {
    existingModal.remove();
  }

  const modal = document.createElement("div");
  modal.className = "modal hidden";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content zoomIn";

  const image = document.createElement("div");
  image.style.backgroundImage = `url(${imageUrl})`;
  image.alt = "Door Image";
  image.style.width = "100%";
  image.style.height = "211px";

  const textElement = document.createElement("p");
  textElement.textContent = text;

  modalContent.appendChild(image);
  modalContent.appendChild(textElement);

  modal.appendChild(modalContent);

  modal.addEventListener("click", () => {
    modal.remove();
  });

  document.body.appendChild(modal);
  setTimeout(() => modal.classList.remove("hidden"), 0);
}

const modalMessageList = [
  {
    number: 15,
    message: "온정과 기대가 가득 찬 멋진 연말연시를 맞이하시길 바랍니다.",
  },
  {
    number: 16,
    message:
      "하얗게 피어오르는 입김에 걱정은 모두 날려 보내고 즐거운 성탄절 보내시기 바랍니다.",
  },
  {
    number: 17,
    message: "추운 겨울, 감기 조심하시고 건강한 크리스마스 보내세요.",
  },
  {
    number: 18,
    message:
      "한 해 동안 루돌프보다 더 바쁘게 달려온 여러분들께 선물이 가득하길 기원합니다.",
  },
  {
    number: 19,
    message: "2024년, 일 년 내내 크리스마스의 마법과 사랑을 느끼길 바라요.",
  },
  {
    number: 20,
    message:
      "하얗게 내려 쌓이는 눈처럼 좋은 일만 차곡차곡 쌓이기를 기원합니다.",
  },
  {
    number: 21,
    message: "당신의 일상에 사랑, 기쁨, 행복이 가득하기를 바라요.",
  },
  {
    number: 22,
    message: "가슴속에 품은 소원이 모두 이루어지는 크리스마스가 되기를.",
  },
  {
    number: 23,
    message: "올 한 해 아껴주셔서 감사합니다. 내년에도 잘 부탁드려요.",
  },
  { number: 24, message: "메리 크리스마스입니다." },
];
