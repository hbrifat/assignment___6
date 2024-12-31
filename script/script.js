const loadCategories = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
};

const displayCategories = (categories) => {
  // console.log(categories);
  const categoryContainer = document.getElementById("pet-categories");

  categories.forEach((element) => {
    // console.log(element);

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
  for(let btn of btnGroup) {
    btn.classList.remove("active");
  }
}

const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

const displayAllPets = (pets) => {
  // console.log(pets)
  const petShowcase = document.getElementById("pet-showcase");

  petShowcase.innerHTML = "";

  if (pets.length !== 0) {
    petShowcase.classList.add("grid");

    pets.forEach((element) => {
      // console.log(element);
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
                        element.breed
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
                        element.price
                      }$</P>
  
                    <div class="divider"></div>
  
                    <div class="card-actions justify-between">
                        <button id="like-btn" class="btn btn-xs sm:btn-sm md:btn-md">
                          <i class="fa-regular fa-thumbs-up"></i>
                        </button>
                        <button id="adopt-btn" class="btn btn-xs sm:btn-sm md:btn-md">Adopt</button>
                        <button id="details-btn" class="btn btn-xs sm:btn-sm md:btn-md">Details</button>
                    </div>
                  </div>
          `;
      petShowcase.append(div);
    });
  } else {
    const div = document.createElement("div");
    div.classList.add("card", "bg-gray-300", "shadow-sm", "border", "min-h-screen", "text-center", "px-5", "space-y-5");

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

const getBirthYear = (birth) => {
  let date = new Date(birth);
  let year = date.getFullYear();
  return year;
};

const loadPetsByCategory = (category) => {
  fetch(`https://openapi.programming-hero.com/api/peddy/category/${category}`)
    .then((res) => res.json())
    .then((data) => displayAllPets(data.data))
    .catch((error) => console.log(error));
};

// const myObj = {
//   petId: 1,
//   breed: "Golden Retriever",
//   category: "Dog",
//   date_of_birth: "2023-01-15",
//   price: 1200,
//   image: "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//   gender: "Male",
//   pet_details:
//     "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//   vaccinated_status: "Fully",
//   pet_name: "Sunny",
// };




loadCategories();
loadAllPets();
