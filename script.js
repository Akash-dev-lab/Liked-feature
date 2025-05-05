const postImg = document.getElementById("post-img");
const bigHeart = document.getElementById("big-heart");
const likeIcon = document.getElementById("like-icon");

let likeTimeout;

const ball = document.createElement("div");
ball.style.position = "fixed";
ball.style.width = "24px";
ball.style.height = "24px";
ball.style.borderRadius = "50%";
ball.style.background = "#ff6600";
ball.style.boxShadow = "0 2px 12px #ff660088";
ball.style.pointerEvents = "none";
ball.style.zIndex = "99999";
ball.style.left = "0px";
ball.style.top = "0px";
ball.style.transform = "translate(-50%, -50%)";
ball.style.transition = "box-shadow 0.2s";
document.body.appendChild(ball);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let ballX = mouseX, ballY = mouseY;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateBall() {
  // Smooth follow with delay
  ballX += (mouseX - ballX) * 0.15;
  ballY += (mouseY - ballY) * 0.15;
  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  // Bouncing effect
  const bounce = Math.abs(Math.sin(Date.now() / 200)) * 10;
  ball.style.transform = `translate(-50%, -50%) translateY(-${bounce}px)`;

  requestAnimationFrame(animateBall);
}
animateBall();


postImg.addEventListener("dblclick", () => {
  // Show big heart animation
  bigHeart.classList.add("active");

  // Set to liked
  likeIcon.classList.remove("ri-heart-line");
  likeIcon.classList.add("ri-heart-fill", "liked");

  // Remove the big heart after a short delay
  clearTimeout(likeTimeout);
  likeTimeout = setTimeout(() => {
    bigHeart.classList.remove("active");
  }, 600);

  // Generate confetti
  for (let i = 0; i < 40; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.backgroundColor = getRandomColor();

    // Center of the post image
    const imgRect = postImg.getBoundingClientRect();
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    confetti.style.left = `${imgRect.left + imgRect.width / 2 + scrollLeft}px`;
    confetti.style.top = `${imgRect.top + imgRect.height / 2 + scrollTop}px`;

    // Random directions
    const x = Math.random() * 800 - 400 + "px";
    const y = Math.random() * 800 - 400 + "px";
    confetti.style.setProperty('--x', x);
    confetti.style.setProperty('--y', y);

    confetti.style.position = "absolute";
    confetti.style.pointerEvents = "none";

    document.body.appendChild(confetti);

    // Remove after animation
    setTimeout(() => {
      confetti.remove();
    }, 500000);
  }

});


function getRandomColor() {
    const colors = ["#f00", "#ff0", "#0f0", "#0ff", "#f0f", "#fff", "#ff6600"];
    return colors[Math.floor(Math.random() * colors.length)];
  }


// Optional: toggle like on bottom heart click too
likeIcon.parentElement.addEventListener("click", () => {
  const isLiked = likeIcon.classList.contains("liked");

    likeIcon.classList.add("ri-heart-line");
    likeIcon.classList.toggle("ri-heart-fill", !isLiked);
});
