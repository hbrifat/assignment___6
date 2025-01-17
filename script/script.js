const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  const categoryContainer = document.getElementById("pet-categories");

  categories.forEach((element) => {

    const btn = document.createElement("button");
    btn.classList.add(
      "btn",
      "btn-sm",
      "md:btn-md",
      "lg:btn-lg",
      "h-full",
      "py-3",
      `btn-${element.category}`,
      "btn-group"
    );

    btn.innerHTML = `
                <img src= ${element.category_icon} class=""/>
                <p>${element.category}</p>
        `;
    categoryContainer.appendChild(btn);

    document
      .getElementsByClassName(`btn-${element.category}`)[0]
      .addEventListener("click", function () {
        loadPetsByCategory(`${element.category}`);

        removeActiveClass();

        btn.classList.add("active");
      });
  });
};

const removeActiveClass = () => {
  const btnGroup = document.getElementsByClassName("btn-group");
  for (let btn of btnGroup) {
    btn.classList.remove("active");
  }
};


const loadSpinner = (returnedObject) => {
  const petShowcase = document.getElementById("pet-showcase");
  petShowcase.innerHTML = "";

  const spinnerSection = document.getElementById("spinner-section");
  spinnerSection.classList.remove('hidden');

  setTimeout(() => {
    spinnerSection.classList.add('hidden');
    displayAllPets(returnedObject);
  }, 2000);
}

const loadAllPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => {
      sortPricing(data.pets);

      removeActiveClass();

      loadSpinner(data.pets);

    })
    .catch((error) => console.log(error));
};


const displayAllPets = (pets) => {
  const petShowcase = document.getElementById("pet-showcase");

  petShowcase.innerHTML = "";

  if (pets.length !== 0) {
    petShowcase.classList.add("grid");

    pets.forEach((element) => {
      const div = document.createElement("div");
      div.classList.add("card", "bg-base", "shadow-sm", "border");
      div.innerHTML = `
                  <figure class="p-5">
                          <img
                          src=${element.image}
                          alt="pets"
                          class="rounded-xl"
                          />
                  </figure>
                  <div class="card-body p-5">
                      <h6 class="card-title">${element.pet_name}</h6>
                      <p><i class="fa-solid fa-table-cells-large"></i>  Breed: ${
                        !element?.breed ? "N/A" : `${element.breed}`
                      }</P>
                      <p><i class="fa-solid fa-calendar-days"></i>  Birth: ${
                        !element?.date_of_birth
                          ? "N/A"
                          : `${getBirthYear(element.date_of_birth)}`
                      }</P>
                      <p><i class="fa-solid fa-venus-mars"></i>  Gender: ${
                        !element?.gender ? "N/A" : `${element.gender}`
                      }</P>
                      <p><i class="fa-solid fa-dollar-sign"></i>  Price: ${
                        !element?.price ? "N/A" : `${element.price}$`
                      }</P>
  
                    <div class="divider"></div>
  
                    <div class="card-actions justify-around">
                        <button class="btn btn-xs xl:btn-md" onclick=showThumbnail('${
                          element.image
                        }')>
                          <i class="fa-regular fa-thumbs-up"></i>
                        </button>
                        <button id="adopt-btn-${element.petId}" class="btn btn-xs xl:btn-md" onclick=showCountdown(this.id)>Adopt</button>
                        <button class="btn btn-xs xl:btn-md" onclick=loadPetDetails('${
                          element.petId
                        }')>Details</button>
                    </div>
                  </div>
          `;
      petShowcase.append(div);
    });
  } else {
    const div = document.createElement("div");
    div.classList.add(
      "card",
      "bg-gray-300",
      "shadow-sm",
      "border",
      "min-h-screen",
      "text-center",
      "px-5",
      "space-y-5"
    );

    petShowcase.classList.remove("grid");

    div.innerHTML = `
    <figure class="p-5">
            <img
            src="./assets/images/error.webp"
            alt="error"
            class="rounded-xl"
            />
    </figure>
    <div class="space-y-5">
        <h6 class="text-xl md:text-3xl font-bold leading-snug">No Information Available</h6>
        <p>I apologize for the inconvenience you are experiencing. 
        I'll look into it right now and get back to you with more details.</P>
    </div>
`;
    petShowcase.append(div);
  }
};


const showCountdown = (buttonID) => {
  console.log("Adopt button clicked", buttonID);

  const myModal = document.getElementById("myModal");
  myModal.show();

  myModal.innerHTML = `
  <div class="modal-box max-w-md">
    <div class="card-body p-0.5 md:p-1 mb-2 items-center space-y-1 md:space-y-3">
        <figure class="p-1">
           <i class="fa-solid fa-handshake text-2xl md:text-4xl"></i>
        </figure>
        <h6 class="card-title text-xl md:text-4xl">Congrats!</h6>
        <p class="text-sm md:text-lg"> Adoption process is Start for your pet! </p>
        <span class="countdown font-mono text-2xl md:text-4xl">
          <span id="counterElement" style="--value: 3;"></span>
        </span>
    </div>
  </div>
  `;

  // countdown using js
  let counter = 3;
  setInterval(() => {
      if(counter >= 1) {
        counter--;
      }
      document.getElementById("counterElement").style.setProperty('--value', counter);
  }, 1000)

  setTimeout(() => {
    myModal.close();
    document.getElementById(buttonID).innerText = "Adopted";
    document.getElementById(buttonID).setAttribute("disabled", true);
  }, 3000);

}

const showThumbnail = (image) => {
  const petAside = document.getElementById("pet-aside");
  const span = document.createElement("span");
  span.innerHTML = `
    <img src=${image} class="rounded-2xl p-2"/>
  `;

  petAside.appendChild(span);
};

const getBirthYear = (birth) => {
  let date = new Date(birth);
  let year = date.getFullYear();
  return year;
};

const loadPetsByCategory = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => {
      sortPricing(data.data);

      loadSpinner(data.data);

    })
    .catch((error) => console.log(error));
};

const loadPetDetails = (petId) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/pet/${petId}`)
    .then((res) => res.json())
    .then((data) => displayPetDetails(data.petData))
    .catch((error) => console.log(error));
};

const displayPetDetails = (petData) => {
  const petDetailsModal = document.getElementById("myModal");

  petDetailsModal.showModal();

  petDetailsModal.innerHTML = `
    <div class="modal-box w-11/12 md:max-w-2xl">
                  <figure class="p-1">
                          <img
                          src=${petData.image}
                          alt="pets"
                          class="rounded-xl w-full" 
                          />
                  </figure>
                  <div class="card-body p-1 mb-2">
                      <h6 class="card-title md:3xl">${petData.pet_name}</h6>
                      
                      <div class="grid grid-cols-2 gap-1">
                        <p><i class="fa-solid fa-table-cells-large"></i>  Breed: ${
                          !petData?.breed ? "N/A" : `${petData.breed}`
                        }</P>
                        <p><i class="fa-solid fa-venus-mars"></i>  Gender: ${
                          !petData?.gender ? "N/A" : `${petData.gender}`
                        }</P>
                        <p><i class="fa-solid fa-venus-mars"></i> Vaccinated Status: ${
                          !petData?.vaccinated_status
                            ? "N/A"
                            : `${petData.vaccinated_status}`
                        }</P>
                        <p><i class="fa-solid fa-calendar-days"></i>  Birth: ${
                          !petData?.date_of_birth
                            ? "N/A"
                            : `${getBirthYear(petData.date_of_birth)}`
                        }</P>
                        <p><i class="fa-solid fa-dollar-sign"></i>  Price: ${
                          !petData?.price ? "N/A" : `${petData.price}$`
                        }</P>
                      </div>
  
                    <div class="divider"></div>

                    <div class="space-y-2">
                        <h5 class="font-semibold text-lg">Details Information</h5>
                        <p>${!petData?.pet_details ? "N/A" : `${petData.pet_details}`}</p>
                    </div>
                  </div>

        <form method="dialog">
          <button class="btn btn-block">Cancel</button>
        </form>

    </div>
    
    `;
};

const sortPricing = (returnedValue) => {
  document.getElementById("sorting-btn")
      .addEventListener("click", function(){

        returnedValue.sort(function(a, b){return b.price - a.price});

        loadSpinner(returnedValue);
  })
}




loadCategories();

loadAllPets();

