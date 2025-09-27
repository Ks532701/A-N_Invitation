function CountdownTracker(label, value) {
  var el = document.createElement('span');
  el.className = 'flip-clock__piece';
  el.innerHTML = `
    <b class="flip-clock__card card">
      <b class="card__top"></b>
      <b class="card__bottom"></b>
      <b class="card__back">
        <b class="card__bottom"></b>
      </b>
    </b>
    <span class="flip-clock__slot">${label}</span>
  `;
  this.el = el;
  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');
  this.update = function(val) {
    val = ('0' + val).slice(-2);
    if (val !== this.currentValue) {
      if (this.currentValue >= 0) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);
      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  };
  this.update(value);
}

function getTimeRemaining(endtime) {
  var t = Date.parse(endtime) - Date.parse(new Date());
  return {
    'Total': t,
    'Days': Math.floor(t / (1000 * 60 * 60 * 24)),
    'Hours': Math.floor((t / (1000 * 60 * 60)) % 24),
    'Minutes': Math.floor((t / 1000 / 60) % 60),
    'Seconds': Math.floor((t / 1000) % 60)
  };
}

function Clock(countdown, callback) {
  countdown = countdown ? new Date(Date.parse(countdown)) : false;
  callback = callback || function () { };
  var updateFn = countdown ? getTimeRemaining : getTime;
  this.el = document.createElement('div');
  this.el.className = 'flip-clock';
  var trackers = {},
      t = updateFn(countdown),
      key, timeinterval;

  for (key in t) {
    if (key === 'Total') continue;
    trackers[key] = new CountdownTracker(key, t[key]);
    this.el.appendChild(trackers[key].el);
  }

  var i = 0;
  function updateClock() {
    timeinterval = requestAnimationFrame(updateClock);
    if (i++ % 10) return;
    var t = updateFn(countdown);
    if (t.Total < 0) {
      cancelAnimationFrame(timeinterval);
      for (key in trackers) {
        trackers[key].update(0);
      }
      callback();
      return;
    }
    for (key in trackers) {
      trackers[key].update(t[key]);
    }
  }

  updateClock(); // Start immediately
}

// ✅ Set target: 2 Nov 2025, 09:00 CET = 08:00 UTC
var deadline = new Date(Date.UTC(2025, 10, 2, 8, 0, 0)); // Months are 0-based

var countdown = new Clock(deadline, function () {
  alert('Nedtællingen er færdig!');
});

document.getElementById('countdown-section').appendChild(countdown.el);
// hero test - split image // 

// window.addEventListener('load', () => {
//   const section = document.querySelector('.herotest');

//   setTimeout(() => {
//     section.classList.add('animate');

//     // Efter 1.5s (animationens varighed), skjul overlay-maskerne
//     setTimeout(() => {
//       const article = section.querySelector('article');
//       article.style.display = 'none';
//     }, 1500);

//   }, 5000); // vent 5 sekunder før animation starter
// });


// FORMULAREN _ AZHAI DESIGN FREMADRETTET // 

  const attendanceSelect = document.getElementById("attendance");
  const detailsSection = document.getElementById("attendance-details");
  const guestCountInput = document.getElementById("guest-count");
  const nameFieldsWrapper = document.getElementById("name-fields");

  // Vis/skjul navn/antal-sektion baseret på valg
  attendanceSelect.addEventListener("change", () => {
    if (attendanceSelect.value === "ja") {
      detailsSection.style.display = "block";
    } else {
      detailsSection.style.display = "none";
      nameFieldsWrapper.innerHTML = "";
      guestCountInput.value = "";
    }
  });

  // Opret navnefelter baseret på antal gæster
  guestCountInput.addEventListener("input", () => {
    const count = parseInt(guestCountInput.value, 10);
    nameFieldsWrapper.innerHTML = "";

    if (!isNaN(count) && count > 0 && count <= 10) {
      for (let i = 1; i <= count; i++) {
        const label = document.createElement("label");
        label.textContent = `Navn på deltager ${i}:`;
        label.setAttribute("for", `guest-name-${i}`);

        const input = document.createElement("input");
        input.type = "text";
        input.name = `guest-name-${i}`;
        input.id = `guest-name-${i}`;
        input.placeholder = `Navn ${i}`;
        input.required = true;

        nameFieldsWrapper.appendChild(label);
        nameFieldsWrapper.appendChild(input);
      }
    }
  });

