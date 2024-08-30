
const socket = io();
const productsList = document.getElementById("productsList");
const addproduct = document.getElementById("addForm");
const deleteForm = document.getElementById("deleteForm");

addForm.addEventListener("submit", async (e) => {

  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const code = document.getElementById("code").value;
  const category = document.getElementById("category").value;
  const stock = document.getElementById("stock").value;
  const price = document.getElementById("price").value;

  await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({title, price, description, code, stock, category})
  })

  addproduct.reset();

})

deleteForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("id").value;
  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  deleteForm.reset();
})


socket.on("products", (data) => {
  productsList.innerHTML = "";
  data.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "18rem";
    card.innerHTML = `
      <div class= "containerCard">
          <h5>${product.title}</h5>
          <p class="itemsList">Descripcion: ${product.description}</p>
          <p class="itemsList">Codigo: ${product.code}</p>
          <p class="itemsList">Precio: ${product.price}</p>
          <p class="itemsList">Stock: ${product.stock}</p>
          <p class="itemsList">Categoria: ${product.category}</p>
          <p class="itemsList">ID: ${product.id}</p>
        </div>
    `;

    productsList.appendChild(card);
  })
})