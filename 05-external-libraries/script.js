document.addEventListener("DOMContentLoaded", function() {
  // Initialize MicroModal
  MicroModal.init({
    disableScroll: true,
    awaitOpenAnimation: true,
    awaitCloseAnimation: true
  });

  const modalTitle = document.getElementById("modalGeneral-title");
  const modalImage = document.getElementById("modalGeneral-image");
  const modalDescription = document.getElementById("modalGeneral-description");

  function showModal(title, description) {
    modalTitle.textContent = title;
    modalDescription.textContent = description;
    modalImage.style.display = "none"; // hide image by default
    MicroModal.show("modalGeneral");
  }

  // Button events
  document.getElementById("btnSyrups").addEventListener("click", () => {
    showModal("Syrups", "Vanilla, Caramel, Hazelnut, Sugar Free Vanilla, Pumpkin (seasonal)");
  });

  document.getElementById("btnMilks").addEventListener("click", () => {
    showModal("Milks", "Whole, Skim, Almond, Oat, Soy");
  });

  document.getElementById("btnSize").addEventListener("click", () => {
    showModal("Size", "Small, Medium, Large, X-Large");
  });

  document.getElementById("btnToppings").addEventListener("click", () => {
    showModal("Toppings", "Whipped Cream, Cocoa Powder, Caramel Drizzle, Cinnamon");
  });
});

document.querySelectorAll('.card').forEach(card => {
  let flipped = false; 

  card.addEventListener('click', () => {
    if (!flipped) {
      gsap.to(card.querySelector('.card-inner'), { duration: 0.1, rotationY: 180, ease: "power2.inOut" });
    } else {
      gsap.to(card.querySelector('.card-inner'), { duration: 0.1, rotationY: 0, ease: "power2.inOut" });
    }
    flipped = !flipped;
  });
});