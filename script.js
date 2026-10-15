/* =========================================================
   SAROTHI - MAIN JAVASCRIPT
   Image Upload + AI Demo + Stories
   ========================================================= */


/* =========================================================
   PAGE NAVIGATION
   ========================================================= */

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {
        page.classList.remove("active");
    });

    const selectedPage =
        document.getElementById(pageId);

    if (selectedPage) {
        selectedPage.classList.add("active");
    }

    const nav = document.querySelector("nav");

    if (nav) {
        nav.classList.remove("show");
    }

    document.querySelectorAll(".nav-link").forEach(function(link) {

        link.classList.remove("active");

        if (link.dataset.page === pageId) {
            link.classList.add("active");
        }

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


function toggleNav() {

    const nav = document.querySelector("nav");

    if (nav) {
        nav.classList.toggle("show");
    }
}


/* =========================================================
   NAVIGATION
   ========================================================= */

document.addEventListener("click", function(event) {

    const link =
        event.target.closest("[data-page]");

    if (!link) return;

    const page =
        link.dataset.page;

    if (!page) return;

    event.preventDefault();

    showPage(page);

});


/* =========================================================
   IMAGE UPLOAD / PREVIEW
   ========================================================= */

const mediaInput =
    document.getElementById("mediaInput");

const preview =
    document.getElementById("preview");

const analyzeBtn =
    document.getElementById("analyzeBtn");

const uploadContent =
    document.getElementById("uploadContent");


if (mediaInput) {

    mediaInput.addEventListener(
        "change",
        function() {

            const file =
                this.files[0];

            if (!file) {
                return;
            }


            /* Only allow images */

            if (!file.type.startsWith("image/")) {

                alert(
                    "Please select an image file."
                );

                this.value = "";

                return;

            }

            const analysisPanel =
                document.getElementById("analysis");

            const resultText =
                document.getElementById("analysisText");

            if (analysisPanel) {
                analysisPanel.classList.add("hidden");
            }

            if (resultText) {
                resultText.textContent = "";
            }


            /* Create image preview */

            const imageURL =
                URL.createObjectURL(file);


            if (preview) {

                preview.src =
                    imageURL;

                preview.style.display =
                    "block";

            }


            /* Hide upload placeholder */

            if (uploadContent) {

                uploadContent.style.display =
                    "none";

            }


            /* Enable analysis */

            if (analyzeBtn) {

                analyzeBtn.disabled =
                    false;

                analyzeBtn.classList.remove(
                    "disabled"
                );

            }

        }
    );

}


/* =========================================================
   DRAG & DROP IMAGE UPLOAD
   ========================================================= */

const uploadArea =
    document.getElementById("uploadArea");


if (uploadArea) {

    uploadArea.addEventListener(
        "dragover",
        function(event) {

            event.preventDefault();

            uploadArea.classList.add(
                "dragging"
            );

        }
    );


    uploadArea.addEventListener(
        "dragleave",
        function() {

            uploadArea.classList.remove(
                "dragging"
            );

        }
    );


    uploadArea.addEventListener(
        "drop",
        function(event) {

            event.preventDefault();

            uploadArea.classList.remove(
                "dragging"
            );


            const files =
                event.dataTransfer.files;


            if (
                files &&
                files.length > 0 &&
                mediaInput
            ) {

                mediaInput.files =
                    files;


                mediaInput.dispatchEvent(
                    new Event("change")
                );

            }

        }
    );

}


/* =========================================================
   AI DEMO ANALYSIS
   ========================================================= */

function runDemoAnalysis() {

    const resultPanel =
        document.getElementById("analysis");

    const resultImage =
        document.getElementById("analysisImage");

    const resultText =
        document.getElementById("analysisText");

    const selectedFile =
        mediaInput && mediaInput.files[0];

    const analyzeButton =
        document.getElementById(
            "analyzeBtn"
        );

    if (!selectedFile) {
        alert("Please upload an image first.");
        return;
    }

    if (resultPanel) {
        resultPanel.classList.remove("hidden");
    }

    if (resultImage && preview) {
        resultImage.src = preview.src;
    }

    if (resultText) {
        resultText.innerHTML = "<p>Analyzing image...</p>";
    }

    if (analyzeButton) {

        analyzeButton.disabled =
            true;

        analyzeButton.textContent =
            "Analyzing...";

    }


    setTimeout(
        function() {

            if (analyzeButton) {

                analyzeButton.disabled =
                    false;

                analyzeButton.textContent =
                    "Start AI-assisted screening";

            }


            if (resultText) {

                resultText.innerHTML = `
                    <div class="analysis-success">
                        <h3>Possible AI-generated image</h3>
                        <p>Screening result: Some visual indicators may need closer review.</p>
                        <h3>Screening details</h3>
                        <ul>
                            <li>Lighting and shadows: review for inconsistent directions.</li>
                            <li>Fine details: inspect hair, fingers, and small background objects.</li>
                            <li>Texture patterns: check for unusually smooth or repeated details.</li>
                        </ul>
                    </div>
                `;

            }

        },
        1500
    );

}


/*
   Make function available to HTML onclick=""
*/

window.runDemoAnalysis =
    runDemoAnalysis;


/* =========================================================
   STORIES DATA
   ========================================================= */

let stories = [

    {
        id: 1,

        name: "Anonymous Member",

        anonymous: true,

        title:
            "A small step that changed my perspective",

        category:
            "Reflection",

        content:
            "Sometimes progress does not look like a huge change. Sometimes it is simply finding the courage to talk to someone, take a pause, or remind yourself that you deserve kindness too.",

        warning: false,

        likes: 12,

        liked: false,

        date: "Oct 4, 2026",

        mine: false,

        comments: []

    },


    {
        id: 2,

        name: "Maya",

        anonymous: false,

        title:
            "Learning to speak up for myself",

        category:
            "Life",

        content:
            "For a long time, I kept things to myself because I was afraid nobody would understand. Eventually, I realized that asking for support can be an important step toward taking care of yourself.",

        warning: false,

        likes: 18,

        liked: false,

        date: "Oct 3, 2026",

        mine: false,

        comments: []

    },


    {
        id: 3,

        name: "Anonymous Member",

        anonymous: true,

        title:
            "I realized I didn't have to handle everything alone",

        category:
            "True Experience",

        content:
            "Finding a safe place to express what I was feeling helped me understand that my experience mattered and that reaching out for support was okay.",

        warning: false,

        likes: 25,

        liked: false,

        date: "Oct 2, 2026",

        mine: false,

        comments: []

    }

];


/* =========================================================
   STORY SETTINGS
   ========================================================= */

let selectedMode =
    "public";

let selectedFilter =
    "latest";

let storyToDelete =
    null;


/* =========================================================
   MYSELF / ANONYMOUS
   ========================================================= */

function selectPostMode(mode) {

    selectedMode =
        mode;


    const publicButton =
        document.getElementById(
            "publicMode"
        );

    const anonymousButton =
        document.getElementById(
            "anonymousMode"
        );

    const nameInput =
        document.getElementById(
            "storyName"
        );


    if (
        !publicButton ||
        !anonymousButton
    ) {
        return;
    }


    /*
       VERY IMPORTANT:

       Remove active from BOTH first.
       Then add active ONLY to the
       selected option.
    */

    publicButton.classList.remove(
        "active"
    );

    anonymousButton.classList.remove(
        "active"
    );


    if (mode === "public") {

        publicButton.classList.add(
            "active"
        );


        if (nameInput) {

            nameInput.disabled =
                false;

            nameInput.placeholder =
                "Your name";

        }

    }


    if (mode === "anonymous") {

        anonymousButton.classList.add(
            "active"
        );


        if (nameInput) {

            nameInput.disabled =
                true;

            nameInput.value =
                "";

            nameInput.placeholder =
                "Hidden when anonymous";

        }

    }

}


/*
   Make available to HTML onclick
*/

window.selectPostMode =
    selectPostMode;


/* =========================================================
   READING TIME
   ========================================================= */

function updateReadingTime() {

    const textArea =
        document.getElementById(
            "storyText"
        );

    if (!textArea) {
        return;
    }


    const text =
        textArea.value.trim();


    let words =
        0;


    if (text.length > 0) {

        words =
            text.split(/\s+/).length;

    }


    const wordCount =
        document.getElementById(
            "wordCount"
        );

    const readingTime =
        document.getElementById(
            "readingTime"
        );


    if (wordCount) {

        wordCount.textContent =
            words;

    }


    if (readingTime) {

        const minutes =
            Math.max(
                1,
                Math.ceil(
                    words / 200
                )
            );


        readingTime.textContent =
            minutes + " min";

    }

}


/* =========================================================
   PUBLISH STORY
   ========================================================= */

function publishStory() {

    const titleInput =
        document.getElementById(
            "storyTitle"
        );

    const textInput =
        document.getElementById(
            "storyText"
        );

    const nameInput =
        document.getElementById(
            "storyName"
        );

    const categoryInput =
        document.getElementById(
            "storyCategory"
        );

    const warningInput =
        document.getElementById(
            "contentWarning"
        );


    if (
        !titleInput ||
        !textInput
    ) {
        return;
    }


    const title =
        titleInput.value.trim();

    const content =
        textInput.value.trim();

    const name =
        nameInput
            ? nameInput.value.trim()
            : "";

    const category =
        categoryInput
            ? categoryInput.value
            : "Life";

    const warning =
        warningInput
            ? warningInput.checked
            : false;


    if (!title) {

        alert(
            "Please enter a story title."
        );

        titleInput.focus();

        return;

    }


    if (!content) {

        alert(
            "Please write your story."
        );

        textInput.focus();

        return;

    }


    if (
        selectedMode === "public" &&
        !name
    ) {

        alert(
            "Please enter your name."
        );

        if (nameInput) {
            nameInput.focus();
        }

        return;

    }


    const newStory = {

        id:
            Date.now(),

        name:
            selectedMode === "anonymous"
                ? "Anonymous Member"
                : name,

        anonymous:
            selectedMode === "anonymous",

        title:
            title,

        category:
            category,

        content:
            content,

        warning:
            warning,

        likes:
            0,

        liked:
            false,

        date:
            "Just now",

        mine:
            true,

        comments:
            []

    };


    stories.unshift(
        newStory
    );


    titleInput.value =
        "";

    textInput.value =
        "";


    if (nameInput) {

        nameInput.value =
            "";

    }


    if (warningInput) {

        warningInput.checked =
            false;

    }


    updateReadingTime();


    selectPostMode(
        "public"
    );


    renderStories();


    alert(
        "Your story has been published."
    );

}


window.publishStory =
    publishStory;


/* =========================================================
   FILTER STORIES
   ========================================================= */

function filterStories(
    filter,
    button
) {

    selectedFilter =
        filter;


    document
        .querySelectorAll(
            ".filter-tab"
        )
        .forEach(
            function(tab) {

                tab.classList.remove(
                    "active"
                );

            }
        );


    if (button) {

        button.classList.add(
            "active"
        );

    }


    renderStories();

}


window.filterStories =
    filterStories;


/* =========================================================
   CATEGORY CHANGE
   ========================================================= */

document.addEventListener(
    "change",
    function(event) {

        if (
            event.target &&
            event.target.id ===
            "categoryFilter"
        ) {

            renderStories();

        }

    }
);


/* =========================================================
   RENDER STORIES
   ========================================================= */

function renderStories() {

    const storiesList =
        document.getElementById(
            "storiesList"
        );

    const storyCounter =
        document.getElementById(
            "storyCounter"
        );

    const categoryFilter =
        document.getElementById(
            "categoryFilter"
        );


    if (!storiesList) {
        return;
    }


    const selectedCategory =
        categoryFilter
            ? categoryFilter.value
            : "all";


    let visibleStories =
        [...stories];


    if (
        selectedCategory !==
        "all"
    ) {

        visibleStories =
            visibleStories.filter(
                function(story) {

                    return (
                        story.category ===
                        selectedCategory
                    );

                }
            );

    }


    if (
        selectedFilter ===
        "latest"
    ) {

        visibleStories.sort(
            function(a, b) {

                return b.id - a.id;

            }
        );

    }


    if (
        selectedFilter ===
        "trending" ||
        selectedFilter ===
        "top"
    ) {

        visibleStories.sort(
            function(a, b) {

                const scoreA =
                    a.likes +
                    a.comments.length * 2;

                const scoreB =
                    b.likes +
                    b.comments.length * 2;

                return scoreB - scoreA;

            }
        );

    }


    if (storyCounter) {

        storyCounter.textContent =
            visibleStories.length +
            (
                visibleStories.length === 1
                    ? " story"
                    : " stories"
            );

    }


    if (
        visibleStories.length ===
        0
    ) {

        storiesList.innerHTML = `

            <div class="record-empty">

                No stories found.

            </div>

        `;

        return;

    }


    storiesList.innerHTML =
        visibleStories
            .map(
                function(story) {

                    return createStoryCard(
                        story
                    );

                }
            )
            .join("");

}


/* =========================================================
   CREATE STORY CARD
   ========================================================= */

function createStoryCard(story) {

    const authorName =
        story.anonymous
            ? "Anonymous Member"
            : story.name;


    const avatar =
        story.anonymous
            ? "◌"
            : "👤";


    const warningHTML =
        story.warning
            ? `

                <span class="story-warning">
                    Content warning
                </span>

              `
            : "";


    /*
       DELETE BUTTON
       ONLY USER'S OWN STORY
    */

    const deleteButton =
        story.mine
            ? `

                <button
                    type="button"
                    class="story-menu"
                    onclick="openDeleteModal(${story.id})"
                    title="Delete Story"
                >

                    🗑

                </button>

              `
            : "";


    const anonymousBadge =
        story.anonymous
            ? `

                <span
                    style="
                        display:inline-block;
                        margin-left:5px;
                        padding:3px 7px;
                        border-radius:999px;
                        background:#f1f5f9;
                        color:#718096;
                        font-size:8px;
                    "
                >

                    Anonymous

                </span>

              `
            : "";


    return `

        <article
            class="story-card"
            data-story-id="${story.id}"
        >


            <div class="story-top">


                <div class="story-author">


                    <div class="author-avatar">

                        ${avatar}

                    </div>


                    <div>


                        <div class="author-name">

                            ${escapeHTML(
                                authorName
                            )}

                            ${anonymousBadge}

                        </div>


                        <div class="story-date">

                            ${escapeHTML(
                                story.date
                            )}

                        </div>


                    </div>


                </div>


                ${deleteButton}


            </div>


            <span class="story-category">

                ${escapeHTML(
                    story.category
                )}

            </span>


            ${warningHTML}


            <h3 class="story-title">

                ${escapeHTML(
                    story.title
                )}

            </h3>


            <p class="story-content">

                ${escapeHTML(
                    story.content
                )}

            </p>


            <div class="story-actions">


                <button
                    type="button"
                    class="story-action"
                    onclick="likeStory(${story.id})"
                >

                    ${story.liked
                        ? "♥"
                        : "♡"
                    }

                    ${story.likes}

                </button>


                <button
                    type="button"
                    class="story-action"
                    onclick="toggleComments(${story.id})"
                >

                    💬

                    ${story.comments.length}

                    Comments

                </button>


            </div>


            <div
                class="comments"
                id="comments-${story.id}"
            >


                <div class="comment-list">


                    ${
                        story.comments.length > 0

                        ?

                        story.comments
                            .map(
                                function(comment) {

                                    return `

                                        <div
                                            class="comment-item"
                                        >

                                            <b>
                                                ${escapeHTML(
                                                    comment.name
                                                )}
                                            </b>

                                            ·

                                            ${escapeHTML(
                                                comment.text
                                            )}

                                        </div>

                                    `;

                                }
                            )
                            .join("")

                        :

                        `

                            <div
                                class="comment-item"
                            >

                                Be the first to leave
                                a supportive comment.

                            </div>

                        `
                    }


                </div>


                <div class="comment-form">


                    <input
                        type="text"
                        id="comment-${story.id}"
                        placeholder="Write a supportive comment..."
                        onkeydown="
                            if(event.key === 'Enter'){
                                event.preventDefault();
                                addComment(${story.id});
                            }
                        "
                    >


                    <button
                        type="button"
                        onclick="addComment(${story.id})"
                    >

                        Comment

                    </button>


                </div>


            </div>


        </article>

    `;

}


/* =========================================================
   LIKE STORY
   ========================================================= */

function likeStory(id) {

    const story =
        stories.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!story) {
        return;
    }


    if (story.liked) {

        story.likes =
            Math.max(
                0,
                story.likes - 1
            );

        story.liked =
            false;

    }

    else {

        story.likes++;

        story.liked =
            true;

    }


    renderStories();

}


window.likeStory =
    likeStory;


/* =========================================================
   COMMENTS
   ========================================================= */

function toggleComments(id) {

    const comments =
        document.getElementById(
            "comments-" + id
        );


    if (!comments) {
        return;
    }


    comments.classList.toggle(
        "open"
    );

}


window.toggleComments =
    toggleComments;


/* =========================================================
   ADD COMMENT
   ========================================================= */

function addComment(id) {

    const input =
        document.getElementById(
            "comment-" + id
        );


    if (!input) {
        return;
    }


    const text =
        input.value.trim();


    if (!text) {
        return;
    }


    const story =
        stories.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!story) {
        return;
    }


    story.comments.push({

        name:
            "You",

        text:
            text

    });


    renderStories();


    setTimeout(
        function() {

            const comments =
                document.getElementById(
                    "comments-" + id
                );

            if (comments) {

                comments.classList.add(
                    "open"
                );

            }

        },
        10
    );

}


window.addComment =
    addComment;


/* =========================================================
   DELETE MODAL
   ========================================================= */

function openDeleteModal(id) {

    const story =
        stories.find(
            function(item) {

                return item.id === id;

            }
        );


    if (!story) {
        return;
    }


    /*
       Only user's own stories
       can be deleted.
    */

    if (!story.mine) {
        return;
    }


    storyToDelete =
        id;


    const modal =
        document.getElementById(
            "deleteModal"
        );


    if (modal) {

        modal.classList.add(
            "show"
        );

    }

}


window.openDeleteModal =
    openDeleteModal;


/* =========================================================
   CLOSE DELETE MODAL
   ========================================================= */

function closeDeleteModal() {

    storyToDelete =
        null;


    const modal =
        document.getElementById(
            "deleteModal"
        );


    if (modal) {

        modal.classList.remove(
            "show"
        );

    }

}


window.closeDeleteModal =
    closeDeleteModal;


/* =========================================================
   DELETE STORY
   ========================================================= */

function deleteStory() {

    if (
        storyToDelete ===
        null
    ) {
        return;
    }


    stories =
        stories.filter(
            function(story) {

                return (
                    story.id !==
                    storyToDelete
                );

            }
        );


    closeDeleteModal();


    renderStories();

}


window.deleteStory =
    deleteStory;


/* =========================================================
   CLOSE MODAL BY CLICKING OUTSIDE
   ========================================================= */

document.addEventListener(
    "click",
    function(event) {

        const modal =
            document.getElementById(
                "deleteModal"
            );


        if (!modal) {
            return;
        }


        if (
            event.target ===
            modal
        ) {

            closeDeleteModal();

        }

    }
);


/* =========================================================
   ESC KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key ===
            "Escape"
        ) {

            closeDeleteModal();

        }

    }
);


/* =========================================================
   ESCAPE HTML
   ========================================================= */

function escapeHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
           Story mode
        */

        selectPostMode(
            "public"
        );


        /*
           Reading time
        */

        updateReadingTime();


        /*
           Stories
        */

        renderStories();

    }
);


/* =========================================================
   LIVE WORD COUNT
   ========================================================= */

document.addEventListener(
    "input",
    function(event) {

        if (
            event.target &&
            event.target.id ===
            "storyText"
        ) {

            updateReadingTime();

        }

    }
);