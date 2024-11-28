// 아이디

const findPasswordLink = document.querySelector('.find-password-link');

// 아이디

const findPasswordModal = document.getElementById('find-password-modal');

// 아이디

const closeFindPasswordModal = document.getElementById('close-find-password')

//아이디 하단 버튼

const toggleToFindPassword = document.getElementById("toggle-to-find-password");

// 아이디

const findPasswordForm = document.getElementById('find-password-form');

//모달 타이틀
const modalTitle = document.getElementById('modal-title');

// 아이디 찾기 링크 클릭 시 모달 표시

// 아이디 찾기 모달 닫기 

// 모달 외부 클릭 시 닫기

// 아이디 찾기 폼 표시

// 비밀번호 찾기 링크 클릭 시 모달 표시
findPasswordLink.addEventListener('click', () => {
    findPasswordModal.style.display = 'flex';
})

// 모달 닫기 (닫기 버튼 클릭 시)
closeFindPasswordModal.addEventListener('click', () => {
    findPasswordModal.style.display = 'none'; // 모달 닫기
});

// 모달 외부 클릭 시 닫기
window.addEventListener('click', (e) => {
    // 모달 외부를 클릭했을 때만 모달을 닫기
    if (e.target === findPasswordModal) {
        findPasswordModal.style.display = 'none'; // 모달 닫기
    }
});

// 비밀번호 찾기 폼 표시
toggleToFindPassword.addEventListener('click', () => {
    modalTitle.textContent = "비밀번호 찾기"; // 제목 변경
    findPasswordForm.style.display = 'block'; // 비밀번호 찾기 폼 표시
}
)