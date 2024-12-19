const classVideos = [
  {
    _id: 1,
    day: "Day 1",
    ClassHeader: "aws class",
    SecondHeader: "Today class session",
    infoContainer: "hello class",
    iframeVideo: "",
    havedoubt: "",
  },
  {
    _id: 2,
    day: "Day 2",
    ClassHeader: "aws class",
    SecondHeader: "Today class session",
    infoContainer: "hello class",
    iframeVideo: "",
    havedoubt: "",
  },
];

function createDaysessions(dayVideos) {
  return `
    <div class="Course_contentdaily">
        <div class="course-sectionDemo">
            <div class="video-container">
               <a href="${dayVideos.iframeVideo}" target="_blank" rel="noopener noreferrer">
                    <div class="placeholder">
                        <svg class="placeholder-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14V8l6 4-6 4z"/>
                        </svg>
                        <p>${dayVideos.ClassHeader}</p>
                    </div>
                </a> 
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
