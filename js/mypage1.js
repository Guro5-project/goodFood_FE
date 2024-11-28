$(document).ready(function () {
    // 임의 데이터 (로컬 스토리지에서 불러오기 또는 기본값 사용)
    let mockData = JSON.parse(localStorage.getItem("userInfo")) || {
        id: "user123",
        username: "홍현서",
        email: "hong@example.com",
        phone: "010-1234-5678",
        profileImage: "https://via.placeholder.com/150"
    };

    // 정보 표시 함수
    function displayInfo() {
        $("#userId").text(mockData.id);
        $("#username").text(mockData.username);
        $("#email").text(mockData.email);
        $("#phone").text(mockData.phone);
        $("#profileImage").attr("src", mockData.profileImage);
    }

    // 초기 데이터 표시
    displayInfo();

    // 프로필 이미지 변경 모달 열기/닫기
    const uploadModal = $("#uploadModal");
    $("#changeProfileImage").click(function () {
        uploadModal.css("display", "flex").hide().fadeIn(300);
    });

    $(".close-button").click(function () {
        $(this).closest(".modal").fadeOut(300);
    });

    // 이미지 업로드 처리
    $("#uploadButton").click(function () {
        const fileInput = $("#uploadFile")[0];
        if (fileInput.files.length === 0) {
            alert("이미지를 선택해주세요.");
            return;
        }

        const file = fileInput.files[0];
        const reader = new FileReader();

        reader.onload = function (event) {
            mockData.profileImage = event.target.result;
            localStorage.setItem("userInfo", JSON.stringify(mockData));
            displayInfo();
            uploadModal.fadeOut();
            alert("프로필 이미지가 변경되었습니다.");
        };

        reader.readAsDataURL(file);
    });

    // 정보 수정 모달 열기/닫기
    const editModal = $("#editModal");
    $(".edit-button").click(function () {
        const field = $(this).data("field");
        $("#modalTitle").text(field === "email" ? "이메일 수정" : "전화번호 수정");
        $("#newValue").val(mockData[field]);
        editModal.data("field", field).css("display", "flex").hide().fadeIn(300);
    });

    $(".close-button").click(function () {
        $(this).closest(".modal").fadeOut(300);
    });

    // 정보 수정 저장
    $("#saveButton").click(function () {
        const field = editModal.data("field");
        const newValue = $("#newValue").val().trim();

        if (!newValue) {
            alert("값을 입력해주세요.");
            return;
        }

        // 데이터 저장
        mockData[field] = newValue;
        localStorage.setItem("userInfo", JSON.stringify(mockData));
        displayInfo();
        editModal.fadeOut();
        alert(`${field === "email" ? "이메일" : "전화번호"}가 수정되었습니다.`);
    });

    const mockPosts = [
        {
            id: 1,
            title: "여기 참 맛있어요!",
            date: "2024-03-15",
            views: 42
        },
        {
            id: 2,
            title: "여기 가실거면 신중하게 생각하셔야돼요.",
            date: "2024-03-14",
            views: 38
        },
        {
            id: 3,
            title: "김준현이 왔다 간 맛집!",
            date: "2024-03-13",
            views: 23
        }
        // 더 많은 게시글 데이터...
    ];

    // 페이지네이션 변수
    let currentPage = 1;
    const postsPerPage = 5;

    // 통계 업데이트 함수
    function updateStats() {
        const totalPosts = mockPosts.length;
        const totalViews = mockPosts.reduce((sum, post) => sum + post.views, 0);
        
        $("#totalPosts").text(totalPosts);
        $("#totalViews").text(totalViews);
        $("#totalPages").text(Math.ceil(mockPosts.length / postsPerPage));
    }

    // 정렬 기능 추가
    $("#sortOption").change(function() {
        const sortBy = $(this).val();
        if (sortBy === "latest") {
            mockPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
        } else if (sortBy === "views") {
            mockPosts.sort((a, b) => b.views - a.views);
        }
        currentPage = 1;
        displayPosts(currentPage);
    });

    // 게시글 목록 표시 함수
    function displayPosts(page) {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const paginatedPosts = mockPosts.slice(start, end);

        const postList = $(".post-list");
        postList.empty();

        paginatedPosts.forEach(post => {
            const formattedDate = new Date(post.date).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
            
            postList.append(`
                <div class="post-item">
                    <a href="#" class="post-title">
                        <i class="fas fa-file-alt"></i> ${post.title}
                    </a>
                    <div class="post-info">
                        <span class="post-date">
                            <i class="far fa-calendar-alt"></i> ${formattedDate}
                        </span>
                        <span class="post-views">
                            <i class="far fa-eye"></i> 조회수 ${post.views}
                        </span>
                    </div>
                </div>
            `);
        });

        // 페이지네이션 버튼 상태 업데이트
        $("#currentPage").text(page);
        $("#prevPage").prop("disabled", page === 1);
        $("#nextPage").prop("disabled", end >= mockPosts.length);
    }

    // 페이지네이션 이벤트 핸들러
    $("#prevPage").click(function() {
        if (currentPage > 1) {
            currentPage--;
            displayPosts(currentPage);
        }
    });

    $("#nextPage").click(function() {
        if ((currentPage * postsPerPage) < mockPosts.length) {
            currentPage++;
            displayPosts(currentPage);
        }
    });

    // 초기화 시 게시글 목록 표시
    displayPosts(currentPage);

    // 초기화 시 통계 업데이트
    updateStats();

    // 모달 외부 클릭 시 닫기
    $(".modal").click(function(e) {
        if (e.target === this) {
            $(this).fadeOut(300);
        }
    });
});
