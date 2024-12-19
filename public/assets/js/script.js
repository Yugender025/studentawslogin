const classVideos = [
  {
    _id: 1,
    day: "Day 1",
    ClassHeader: "aws class",
    SecondHeader: "Today class session",
    infoContainer: "hello class",
    thubnailImg: "assets/images/Day0.jpg",
    iframeVideo: "https://d1mfrlrzgvrt4d.cloudfront.net/demo/Day0.mp4",
    havedoubt: "",
  },
  {
    _id: 2,
    day: "Day 2",
    ClassHeader: "aws class",
    SecondHeader: "Today class session",
    infoContainer: "hello class",
    thubnailImg: "assets/images/Day0.jpg",
    iframeVideo: "https://d1mfrlrzgvrt4d.cloudfront.net/demo/Day0.mp4",
    havedoubt: "",
  },
];

function createDaysessions(dayVideos) {
  return `
    <div class="Course_contentdaily">
        <div class="course-sectionDemo">
             <div style="border-radius:12px;" class="video-container" onclick="playVideo(this)">
                <img class="thumbnail" src="${dayVideos.thubnailImg}" alt="Video thumbnail">
                    <svg class="play-button" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="48" fill="rgba(0,0,0,0.7)" />
                        <path d="M35,25 L75,50 L35,75 Z" fill="white"/>
                    </svg>
               <video style="width:100%; height:100%; border-radius: 12px;" controlsList="nodownload" oncontextmenu="return false;" controls="" name="media"><source src="${dayVideos.iframeVideo}" type="video/mp4"></video> 
            </div>
    
            <div class="content-container">
                <div>
                    <div class="content-header">
                        <h2>${dayVideos.day}:${dayVideos.SecondHeader}</h2>
                    </div>
                    <div class="content-description">
                        <p>${dayVideos.infoContainer}</p>
                    </div>
                </div>
                
                <a href="${dayVideos.havedoubt}" target="_blank" class="register-btn">
                    <div style="border: 1px solid black;" class="sm-btn" id="start_Exam">
                        <div  id="how-link" class="get-started">Have a doubt</div>
                        <i class="fa-regular fa-arrow-right"></i>
                    </div>
                </a>
            </div>
        </div>
    </div>
  `;
}
const awsVideosListContainer = document.querySelector(".Course_contentdaily");

classVideos.forEach((dayVideosaws) => {
  const classSessions = createDaysessions(dayVideosaws);
  awsVideosListContainer.innerHTML += classSessions;
});

// blocking inspect
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
document.addEventListener("keydown", function (e) {
  // Block F12
  if (e.key === "F12") {
    e.preventDefault();
  }
  // Block Ctrl+Shift+I
  if (e.ctrlKey && e.shiftKey && e.key === "I") {
    e.preventDefault();
  }
  // Block Ctrl+Shift+J
  if (e.ctrlKey && e.shiftKey && e.key === "J") {
    e.preventDefault();
  }
  // Block Ctrl+U (View Source)
  if (e.ctrlKey && e.key === "u") {
    e.preventDefault();
  }
});
