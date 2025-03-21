/*!
* Start Bootstrap - Clean Blog v6.0.9 (https://startbootstrap.com/theme/clean-blog)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-clean-blog/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    let scrollPos = 0;
    const mainNav = document.getElementById('mainNav');
    const headerHeight = mainNav.clientHeight;
    window.addEventListener('scroll', function() {
        const currentTop = document.body.getBoundingClientRect().top * -1;
        if ( currentTop < scrollPos) {
            // Scrolling Up
            if (currentTop > 0 && mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-visible');
            } else {
                console.log(123);
                mainNav.classList.remove('is-visible', 'is-fixed');
            }
        } else {
            // Scrolling Down
            mainNav.classList.remove(['is-visible']);
            if (currentTop > headerHeight && !mainNav.classList.contains('is-fixed')) {
                mainNav.classList.add('is-fixed');
            }
        }
        scrollPos = currentTop;
    });
})


document.addEventListener("DOMContentLoaded", function () {
    // 카테고리별로 아코디언 내용 저장
    const faqContents = {
        "기부·후원": [
            { question: "정기후원을 신청하면 어떤 우편물을 받게 되나요?", answer: "기부 내역서와 감사 편지가 발송됩니다." },
            { question: "기부 영수증은 어떻게 발급하나요?", answer: "기부 영수증은 기부 후에 이메일로 발송됩니다." },
            { question: "기부금은 어떤 방식으로 사용되나요?", answer: "기부금은 주로 교육 지원에 사용됩니다." }
        ],
        "기부영수증": [
            { question: "기부 영수증을 어떻게 발급받을 수 있나요?", answer: "웹사이트에서 발급 요청이 가능합니다." },
            { question: "기부 영수증은 어떤 정보가 포함되나요?", answer: "기부 내역과 기부자의 정보가 포함됩니다." },
            { question: "기부 영수증은 언제 발급되나요?", answer: "기부 후 1~2일 이내에 발급됩니다." }
        ],
        "기타문의": [
            { question: "기타 문의는 어떻게 접수하나요?", answer: "문의 폼을 통해 접수하시면 됩니다." },
            { question: "전화 문의는 가능한가요?", answer: "전화 문의도 가능합니다. 대표번호로 전화해주세요." },
            { question: "메일로 문의할 수 있나요?", answer: "이메일로도 문의 가능합니다." }
        ]
    };

    // 카테고리 버튼 클릭 이벤트 처리
    document.querySelectorAll(".faq-btn").forEach(button => {
        button.addEventListener("click", function () {
            let targetAccordion = document.getElementById("faqAccordion");
            let category = this.innerText; // 버튼 텍스트 가져오기

            // 선택된 카테고리의 아코디언 내용 불러오기
            let categoryFaq = faqContents[category] || [];

            // 기존 아코디언 내용 삭제
            targetAccordion.innerHTML = "";

            // 새로운 아코디언 3개 생성
            let newAccordionItems = "";
            categoryFaq.slice(0, 3).forEach((item, index) => {
                let newId = "faq" + Math.floor(Math.random() * 1000); // 고유 ID 생성

                // 첫 번째 항목만 열리게 설정
                let collapseClass = index === 0 ? "collapse show" : "collapse";

                // 각 항목에 대한 아코디언 생성
                newAccordionItems += `
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button ${index === 0 ? 'active' : ''}" type="button" data-bs-toggle="collapse" data-bs-target="#${newId}">
                                Q. ${item.question}
                            </button>
                        </h2>
                        <div id="${newId}" class="accordion-collapse ${collapseClass}" data-bs-parent="#faqAccordion">
                            <div class="accordion-body">
                                ${item.answer}
                            </div>
                        </div>
                    </div>`;
            });

            // 새로운 아코디언 추가
            targetAccordion.innerHTML = newAccordionItems;
        });
    });

    // 각 아코디언 항목 클릭 시 활성화 상태 변경
    document.getElementById("faqAccordion").addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("accordion-button")) {
            // 이전에 활성화된 아코디언 항목 비활성화
            document.querySelectorAll(".accordion-button.active").forEach(button => {
                button.classList.remove("active");
            });

            // 현재 클릭된 아코디언 버튼에 활성화 클래스 추가
            e.target.classList.add("active");
        }
    });
});


// 추가 후 - 4:35
// 기본 게시글 데이터
const defaultPosts = [
    { id: 1, title: "행복한학교재단 주요 사업안내 유튜브 동영상입니다.", author: "행복한학교", date: "2021/01/27", views: 5736, file: false },
    { id: 2, title: "2024년 후원 보고서 업데이트", author: "관리자", date: "2024/02/15", views: 1342, file: true }
];

// 로컬 스토리지에서 게시글 불러오기
function loadPosts() {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    return [...defaultPosts, ...storedPosts];
}

// 게시글 삭제 함수
function deletePost(postId) {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    let storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    storedPosts = storedPosts.filter(post => post.id !== postId);

    localStorage.setItem("posts", JSON.stringify(storedPosts));
    alert("게시글이 삭제되었습니다.");
    
    location.reload(); // 페이지 새로고침

    renderPosts();  // 삭제 후 테이블 업데이트
}

// 게시글 목록을 테이블에 추가
document.addEventListener("DOMContentLoaded", function () {
    const postListEl = document.getElementById("post-list");
    const posts = loadPosts().reverse(); // 최신 글이 위로 오도록 정렬

    posts.forEach((post, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${posts.length - index}</td>
            <td><a href="detail.html?id=${post.id}" class="title-link">${post.title}</a></td>
            <td>${post.author || "익명"}</td>
            <td>${post.date || new Date().toISOString().split("T")[0]}</td>
            <td>${post.views || 0}</td>
            <td>${post.file ? "📎" : "-"}</td>
            <td><button class="delete-btn" onclick="deletePost(${post.id})">삭제</button></td>
        `;

        postListEl.appendChild(row);
    });
});

function savePost() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim() || "익명";
    const content = document.getElementById("content").value.trim();
    const fileUpload = document.getElementById("fileUpload").checked;

    if (!title || !content) {
        alert("제목과 내용을 입력하세요.");
        return;
    }

    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];

    // 새로운 게시글 데이터
    const newPost = {
        id: storedPosts.length + 3, // 기존 ID 1, 2 이후부터 시작
        title,
        author,
        content,  // 본문 내용 추가
        date: new Date().toISOString().split("T")[0],
        views: 0,
        file: fileUpload
    };

    storedPosts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(storedPosts));

    alert("게시글이 저장되었습니다.");
    // window.location.href = "post.html";  // 목록 페이지로 이동
    window.location.href = `detail.html?id=${newPost.id}`;  // 새 게시글 상세 페이지로 이동
}

// URL에서 ID 가져오기
function getPostIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"), 10);
}

// 게시글 가져오기
function getPostById(postId) {
    const storedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    const defaultPosts = [
        { 
            id: 1, 
            title: "행복한학교재단 주요 사업안내 유튜브 동영상입니다.", 
            author: "행복한학교", 
            date: "2021/01/27", 
            views: 5736, 
            file: false, 
            content: "행복한학교재단의 주요 사업을 소개하는 유튜브 영상입니다. 많은 관심 부탁드립니다!"  // ✅ 내용 추가
        },
        { 
            id: 2, 
            title: "2024년 후원 보고서 업데이트", 
            author: "관리자", 
            date: "2024/02/15", 
            views: 1342, 
            file: true, 
            content: "2024년 후원 내역과 사용처를 정리한 보고서입니다. 파일을 다운로드하여 확인해 주세요."  // ✅ 내용 추가
        }
    ];
    const allPosts = [...defaultPosts, ...storedPosts];

    return allPosts.find(post => post.id === postId);
}

// // 상세 페이지 로드

document.addEventListener("DOMContentLoaded", function () {
    const postId = getPostIdFromUrl();
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find(p => p.id === postId);

    if (post) {
        // 조회수 증가
        post.views += 1;
        const updatedPosts = posts.map(p => (p.id === postId ? post : p));

        // 로컬스토리지에 다시 저장
        localStorage.setItem("posts", JSON.stringify(updatedPosts));

        // 페이지에 내용 표시
        document.getElementById("post-title").textContent = post.title;
        document.getElementById("post-author").textContent = `작성자: ${post.author}`;
        document.getElementById("post-date").textContent = `날짜: ${post.date}`;
        document.getElementById("post-content").textContent = post.content;
        document.getElementById("post-views").textContent = `조회수: ${post.views}`;
    } else {
        document.getElementById("post-content").textContent = "게시글을 찾을 수 없습니다.";
    }
});