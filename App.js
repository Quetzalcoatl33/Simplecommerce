
//Creation of class
class Product {
    constructor(name, price, year) {
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI {
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');

        //here we define the element that we put in product list
        element.innerHTML = `
        <div class= "card text-center mb-4">
            <div class= "card-body">
                <strong>Product Name</strong>: ${product.name}
                <strong>Product Price</strong> ${product.price}
                <strong> Product Year</strong> ${product.year}
                <a href="#" class="btn btn-danger" name="delete"> Delete</a>
            </div>
        </div>
        `;
        productList.appendChild(element);

    }

    // considering the situation that I need the Form turn back empty, I need reset it.
    resetForm() {
        document.getElementById('product-form').reset();
    }
    // create the event that delete the element
    deleteProduct(element) {
        if (element.name === 'delete') {

            //with this part of code I take the firs div all parentElement help to take one div up.
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Delete Successfully', 'danger');
        }
    }

    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        // whit this I can show div first of app 
        container.insertBefore(div, app);
        setTimeout(function () {
            document.querySelector('.alert').remove();

        }, 3000);
    }
}


//Events of Dom (Document Object Model)

document.getElementById('product-form')
    .addEventListener('submit', function (e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;
        // Creation of new Product
        const product = new Product(name, price, year);

        const ui = new UI();

        if(name ==='' || price ===''|| year===''){
            return ui.showMessage('Fields cannot be empty', 'danger');
        }

        ui.addProduct(product);
        ui.resetForm();
        ui.showMessage('Product Added Successfully', 'success');



        // with this I can stop the refresh of the page so the data stay on the form
        e.preventDefault()

    });

document.getElementById('product-list')
    .addEventListener('click', function (e) {
        const ui = new UI();
        ui.deleteProduct(e.target);

    })
