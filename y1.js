//https://youtube.googleapis.com/youtube/v3/search?q=tesla&key=[YOUR_API_KEY]

let API = "AIzaSyAYpJQUUQrsVnGbv8NXKkAiOttR8IK_wh4";

let search_results_div = document.getElementById("search_results");

async function searchVideos() {
  try {
    let inp = document.getElementById("search").value;

    let res = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?q=${inp}&key=${API}&type=video&maxResults=30&part=snippet`
    );

    let data = await res.json();
    console.log("data:", data);

    let array_of_videos = data.items;

    appendVideos(array_of_videos);
  } catch (err) {
    console.log("err:", err);
  }
}

const appendVideos = (arr) => {
  arr.forEach(({ snippet, id: { videoId } }) => {
    console.log("snippet", snippet);
    let div = document.createElement("div");
    let url = snippet.thumbnails.medium.url;
    let img = document.createElement("img");

    img.src = url;
    let title = snippet.title;
    let h4 = document.createElement("h4");
    h4.innerText = title;

    let video_data = {
      snippet,
      videoId,
    };

    div.onclick = () => {
      showVideo(video_data);
    };

    // let iframe = document.createElement("iframe");
    // iframe.src = `https://www.youtube.com/embed/${videoId}`;
    // iframe.width = "460px";
    // iframe.height = "260px";
    // //iframe.allowfullscreen = "true";

    // iframe.setAttribute("allowfullscreen", true);

    div.append(img, h4);

    search_results_div.append(div);
  });
};

// expection click on video
// expection play on next page

// function showVideo() {
// alert("click on video")
// }
const showVideo = (video_data) => {
  alert("click on video");
  console.log("video_data", video_data);

  localStorage.setItem("click_video", JSON.stringify(video_data));

  // window.location.href="video.html";

  window.open("video.html");
};

var new_data = JSON.parse(localStorage.getItem("login"));
console.log("new_data", new_data);

let user_div = document.getElementById("user");
let div = document.createElement("div");
user_div.appendChild(div);

let username1 = document.createElement("p");
username1.innerText = "welcome on YouTube " + new_data.username;

div.append(username1);
