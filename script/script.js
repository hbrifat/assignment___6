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
    btn.classList.add("btn", "btn-sm", "md:btn-md", "lg:btn-lg", "h-full");
    btn.innerHTML = `
                <img src= ${element.category_icon} class=""/>
                <p>${element.category}</p>
        `;
    categoryContainer.appendChild(btn);
  });
};

const loadAllPets = () => {
  fetch("https://openapi.programming-hero.com/api/peddy/pets")
    .then((res) => res.json())
    .then((data) => displayAllPets(data.pets))
    .catch((error) => console.log(error));
};

const displayAllPets = (pets) => {
  // console.log(pets)
  const petShowcase = document.getElementById("pet-showcase");

  pets.forEach((element) => {
    // console.log(element);
    const div = document.createElement("div");
    div.classList.add('card', 'bg-base', 'shadow-sm', 'border');
    div.innerHTML = `
                <figure class="px-3 pt-3">
                        <img
                        src=${element.image}
                        alt="Shoes"
                        class="rounded-xl"
                        />
                </figure>
                <div class="card-body">
                    <h6 class="card-title">${element.pet_name}</h6>
                    <p><i class="fa-solid fa-table-cells-large"></i>  Breed: ${element.breed}</P>
                    <p><i class="fa-solid fa-calendar-days"></i>  Birth: ${!element?.date_of_birth ? "N/A" : `${getBirthYear(element
                        .date_of_birth)}`}</P>
                    <p><i class="fa-solid fa-venus-mars"></i>  Gender: ${!element?.gender ? "N/A" : `${element.gender}`}</P>
                    <p><i class="fa-solid fa-dollar-sign"></i>  Price: ${element.price}$</P>

                <div class="card-actions">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
                </div>
        `;
    petShowcase.append(div);
  });
};

const getBirthYear = (birth) => {
    let date = new Date(birth);
    let year = date.getFullYear();
    return year;
}

const myObj = {
  petId: 1,
  breed: "Golden Retriever",
  category: "Dog",
  date_of_birth: "2023-01-15",
  price: 1200,
  image: "https://i.ibb.co.com/p0w744T/pet-1.jpg",
  gender: "Male",
  pet_details:
    "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
  vaccinated_status: "Fully",
  pet_name: "Sunny",
};

loadCategories();
loadAllPets();
