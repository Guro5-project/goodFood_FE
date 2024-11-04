// 모달창 열기
function openModal() {
    document.getElementById("modal-wrapper").style.display = "block";
    document.getElementById("modal").style.display = "flex"; 
}

// 모달창 닫기
function closeModal() {
    document.getElementById("modal-wrapper").style.display = "none";
    document.getElementById("modal").style.display = "none";
}

// 모달 외부를 클릭했을 때 닫히는 이벤트 추가
document.getElementById("modal-wrapper").addEventListener("click", function(event) {
    if (event.target === document.getElementById("modal-wrapper")) {
        closeModal();
    }
});
