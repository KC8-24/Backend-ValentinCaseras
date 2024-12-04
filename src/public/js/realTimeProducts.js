const socket = io()

const newProductForm = document.getElementById("newProductForm")
const productsContainer = document.getElementById("productsContainer")

newProductForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    const data = new FormData(newProductForm)
    const newObjectProduct = {}
    data.forEach((value, key) => newObjectProduct[key] = value)

    try {
        const response = await fetch("/api/products", {
            method: 'POST',
            body: JSON.stringify(newObjectProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.status === 201) {
            const product = await response.json()
            socket.emit("newProduct", product.data)
            alert("Producto agregado con éxito")
            newProductForm.reset() 
        } else {
            console.error("Error al agregar producto:", response.status)
            alert("ERROR! al agregar el producto. Verifica los datos.")
        }
    } catch (error) {
        console.error("Error en el envío", error)
        alert("ERROR! al intentar agregar el producto")
    }
})

const handleDeleteButtons = () => {
    const deleteBtns = document.getElementsByClassName("deleteButton")
    const arrayDeleteBtns = Array.from(deleteBtns)

    if (!arrayDeleteBtns.length == 0) {
        arrayDeleteBtns.forEach(el => {
            el.addEventListener("click", e => {
                socket.emit("deletedProduct", el.id)
            })
        })
    }
}

const getElementsBySocket = () => {
    socket.on("allProducts", data => {
        productsContainer.innerHTML = ""
        data.forEach (el => {
            productsContainer.innerHTML += `
                <div class="productCard">
                    <p>${el.title}</p>
                    <p>${el.description}</p>
                    <p>$ ${el.price}</p>
                    <button class="deleteButton" id=${el.id}>
                        Eliminar
                    </button>
                </div>
            `
        })

        handleDeleteButtons()
    })
}

getElementsBySocket()