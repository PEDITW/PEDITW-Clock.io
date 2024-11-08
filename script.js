const hourHand=document.querySelector(".hand.hour");const minuteHand=document.querySelector(".hand.minute");const secondHand=document.querySelector(".hand.second");const indicator=document.querySelector(".indicator");let isSpinning=!1;let clockDisabled=!1;let currentTime;function updateClockHands(){if(clockDisabled)return;const secToDeg=(currentTime.seconds/60)*360;const minToDeg=((currentTime.minutes*60+currentTime.seconds)/3600)*360;const hrToDeg=((currentTime.hours%12*3600+currentTime.minutes*60+currentTime.seconds)/43200)*360;secondHand.style.transform=`rotate(${secToDeg}deg)`;minuteHand.style.transform=`rotate(${minToDeg}deg)`;hourHand.style.transform=`rotate(${hrToDeg}deg)`}
function updateTime(){const now=new Date();currentTime={hours:now.getHours(),minutes:now.getMinutes(),seconds:now.getSeconds()};updateClockHands()}
function startClock(){updateTime();if(!clockDisabled){requestAnimationFrame(clockTick)}}
function clockTick(timestamp){if(clockDisabled)return;updateTime();requestAnimationFrame(clockTick)}
function disableClock(){clockDisabled=!0;minuteHand.style.display='none';secondHand.style.display='none'}
function enableClock(){clockDisabled=!1;minuteHand.style.display='';secondHand.style.display='';startClock()}
//function spin(){if(isSpinning)return;isSpinning=!0;disableClock();const minRotations=3;const maxAdditionalRotations=5;const totalRotations=minRotations+Math.random()*maxAdditionalRotations;const spinDuration=5000;const startTime=performance.now();const startRotation=getCurrentRotation(hourHand);function spinAnimation(currentTime){const elapsedTime=currentTime-startTime;const progress=Math.min(elapsedTime/spinDuration,1);const easedProgress=1-Math.pow(1-progress,3);const additionalRotation=easedProgress*totalRotations*360;const newRotation=startRotation+additionalRotation;hourHand.style.transform=`rotate(${newRotation}deg)`;if(progress<1){requestAnimationFrame(spinAnimation)}else{isSpinning=!1;const nearestHour=Math.round(newRotation/30)%12;currentTime={hours:nearestHour===0?12:nearestHour,minutes:0,seconds:0};updateClockHands();enableClock()}}
//requestAnimationFrame(spinAnimation)}
function getCurrentRotation(element){const style=window.getComputedStyle(element);const matrix=new DOMMatrix(style.transform);return Math.atan2(matrix.b,matrix.a)*(180/Math.PI)}
indicator.addEventListener("click",()=>{if(!isSpinning){spin()}});startClock();

function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupText = document.getElementById("popup-text");
    popupText.textContent = message; // Đặt nội dung cho popup
    popup.style.display = "block";   // Hiển thị popup
    setTimeout(() => {
        popup.style.display = "none"; // Ẩn popup sau 3 giây
    }, 3000); // Popup sẽ ẩn sau 3 giây
}

function spin() {
    if (isSpinning) return;
    isSpinning = true;
    disableClock();
    const minRotations = 3;
    const maxAdditionalRotations = 5;
    const totalRotations = minRotations + Math.random() * maxAdditionalRotations;
    const spinDuration = 5000;
    const startTime = performance.now();
    const startRotation = getCurrentRotation(hourHand);

    function spinAnimation(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / spinDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        const additionalRotation = easedProgress * totalRotations * 360;
        const newRotation = startRotation + additionalRotation;
        hourHand.style.transform = `rotate(${newRotation}deg)`;

        if (progress < 1) {
            requestAnimationFrame(spinAnimation);
        } else {
            isSpinning = false;

            // Xác định giờ gần nhất mà kim chỉ đến
            const nearestHour = Math.round(newRotation / 15) % 24 + 1; // Điều chỉnh để tính đúng giá trị --i
            console.log("nearestHour:", nearestHour); // Kiểm tra giá trị nearestHour

            // Lấy label có giá trị --i tương ứng
            const targetLabel = document.querySelector(`.clock label[style*="--i: ${nearestHour}"]`);

            if (targetLabel) {
                // Lấy nội dung của <p> hoặc <span> trong label
                const targetText = targetLabel.querySelector("p") ? targetLabel.querySelector("p").textContent : ""; 
                showPopup(targetText); // Hiển thị popup với nội dung
            } else {
                showPopup("Không tìm thấy nội dung"); // Phòng trường hợp không tìm thấy label
            }

            enableClock();
        }
    }

    requestAnimationFrame(spinAnimation);
}
