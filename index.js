document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("guest-form");
  const guestInput = document.getElementById("guest-name");
  const guestList = document.getElementById("guest-list");

  let guests = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = guestInput.value.trim();

    if (guests.length >= 10) {
      alert("Maximum of 10 guests allowed.");
      return;
    }

    if (name === "") return;

    const guest = {
      id: Date.now(),
      name: name,
      attending: true,
      addedAt: new Date().toLocaleTimeString()
    };

    guests.push(guest);
    addGuestToList(guest);
    guestInput.value = "";
  });

  function addGuestToList(guest) {
    const li = document.createElement("li");
    li.dataset.id = guest.id;

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${guest.name} — Added at ${guest.addedAt}`;

    const rsvpBtn = document.createElement("button");
    rsvpBtn.textContent = "Attending";
    rsvpBtn.className = "rsvp";
    rsvpBtn.addEventListener("click", () => {
      guest.attending = !guest.attending;
      updateRSVP(rsvpBtn, guest.attending);
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.addEventListener("click", () => {
      guests = guests.filter(g => g.id !== guest.id);
      li.remove();
    });

    li.append(nameSpan, rsvpBtn, deleteBtn);
    guestList.appendChild(li);
  }

  function updateRSVP(button, attending) {
    if (attending) {
      button.textContent = "Attending";
      button.classList.remove("not-attending");
    } else {
      button.textContent = "Not Attending";
      button.classList.add("not-attending");
    }
  }
});
