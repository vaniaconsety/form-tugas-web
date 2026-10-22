//jsnya digabung 
function updateCartCount() {
    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const totalQty = cart.reduce(function (sum, item) {
            return sum + Number(item.qty || 0);
        }, 0);

        cartCount.innerText = totalQty;
    }
}

//search
const searchInput = document.getElementById("searchInput");

if (searchInput) {

    searchInput.addEventListener("keyup", function () {

        const keyword = this.value.toLowerCase();

        const pets = document.querySelectorAll(".pet-card");

        pets.forEach(function (card) {

            const type = card.getAttribute("data-type") || "";
            const text = card.innerText.toLowerCase();

            if (
                type.toLowerCase().includes(keyword) ||
                text.includes(keyword)
            ) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

//data paw
const petData = {

    "Loly.html": {
        pet: "Loly",
        price: 1500000
    },

    "Olav.html": {
        pet: "Olav",
        price: 23000000
    },

    "Rocky.html": {
        pet: "Rocky",
        price: 800000
    },

    "Ello.html": {
        pet: "Ello",
        price: 1800000
    },

    "Milo.html": {
        pet: "Milo",
        price: 3500000
    },

    "Dolly.html": {
        pet: "Dolly",
        price: 10000000
    },

    "DOLLY.html": {
        pet: "Dolly",
        price: 10000000
    },

    "Moci.html": {
        pet: "Moci",
        price: 2200000
    },

    "Pip.html": {
        pet: "Pip",
        price: 1500000
    },

    "Bella.html": {
        pet: "Bella",
        price: 700000
    },

    "White.html": {
        pet: "White",
        price: 3000000
    }
};

// nambah paw
const addCartBtn = document.getElementById("addCart");

if (addCartBtn) {
    addCartBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const page = window.location.pathname
            .split("/")
            .pop();

        const data = petData[page];

        if (data) {
            let cart =
                JSON.parse(localStorage.getItem("cart")) || [];
            cart.push({
                pet: data.pet,
                price: data.price,
                qty: 1
            });
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );
            alert(
                data.pet +
                " berhasil ditambahkan ke keranjang!"
            );
            window.location.href = "Cart.html";
        }
    });
}

//form adopt
const petSelect1 = document.getElementById("pet1");
const priceInput1 = document.getElementById("price1");

if (petSelect1 && priceInput1) {
    petSelect1.addEventListener("change", function () {
        priceInput1.value =
            petSelect1.options[
                petSelect1.selectedIndex
            ].dataset.price;

    });

    priceInput1.value =
        petSelect1.options[
            petSelect1.selectedIndex
        ].dataset.price;
}

const petSelect2 = document.getElementById("pet2");
const priceInput2 = document.getElementById("price2");
const fullPrice = document.getElementById("fullPrice");

if (
    petSelect2 &&
    priceInput2 &&
    fullPrice
) {
    petSelect2.addEventListener("change", function () {
        const price =
            petSelect2.options[
                petSelect2.selectedIndex
            ].dataset.price;

        priceInput2.value = price;

        fullPrice.textContent =
            "Rp " +
            parseInt(price).toLocaleString("id-ID");

    });

    const defaultPrice =
        petSelect2.options[
            petSelect2.selectedIndex
        ].dataset.price;

    priceInput2.value = defaultPrice;

    fullPrice.textContent =
        "Rp " +
        parseInt(defaultPrice).toLocaleString("id-ID");
}

//jumlah produk
function changeQty(id, delta) {

    const input =
        document.getElementById("qty-" + id);

    if (!input) {
        return;
    }
    let value =
        parseInt(input.value) + delta;

    if (value < 1) {
        value = 1;
    }
    input.value = value;
}

//tambah produk
function addToCart(name, price, id) {

    const input =
        document.getElementById("qty-" + id);

    const stockEl =
        document.getElementById("stock-" + id);

    if (!input || !stockEl) {
        return;
    }

    const qty =
        parseInt(input.value);

    const stock =
        parseInt(stockEl.innerText);

    if (qty > stock) {
        alert("Stok tidak cukup!");
        return;
    }

    stockEl.innerText = //kurangi stok
        stock - qty;

    let cart = //ambil cart
        JSON.parse(localStorage.getItem("cart")) || [];

    //menambahkan produk */
    cart.push({
        pet: name,
        price: price,
        qty: qty
    });

    //menyimpan di cart
    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(
        name +
        " berhasil ditambahkan ke keranjang!"
    );
    window.location.href = "Cart.html";
}

//halaman cart
const cartItems =
    document.getElementById("cartItems");

const totalPrice =
    document.getElementById("totalPrice");

if (cartItems && totalPrice) {
    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];
    let total = 0;
    cartItems.innerHTML = "";

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <tr>
                <td colspan="5">
                    Keranjang masih kosong.
                </td>
            </tr>
        `;
    } 
    else {
        cart.forEach(function (item) {
            const subtotal =
                item.price * item.qty;
            total += subtotal;

            const row =
                document.createElement("tr");
            row.innerHTML = `
                <td>-</td>
                <td>${item.pet}</td>

                <td>
                    Rp ${item.price.toLocaleString("id-ID")}
                </td>

                <td>
                    ${item.qty}
                </td>

                <td>
                    Rp ${subtotal.toLocaleString("id-ID")}
                </td>
            `;
            cartItems.appendChild(row);
        });
    }
    totalPrice.innerText =
        total.toLocaleString("id-ID");
}

//halaman paymant
const paymentInfo =
    document.getElementById("paymentInfo");

if (paymentInfo) {
    const cart =
        JSON.parse(localStorage.getItem("cart")) || [];
    //cart
    if (cart.length > 0) {
        let total = 0;
        let detailHTML = `
            <h2>Rincian Pesanan</h2>
            <table class="payment-table">
                <thead>
                    <tr>
                        <th>Hewan</th>
                        <th>Harga</th>
                        <th>Qty</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
        `;

        cart.forEach(function (item) {
            const subtotal =
                item.price * item.qty;
            total += subtotal;

            detailHTML += `
                <tr>
                    <td>
                        ${item.pet}
                    </td>

                    <td>
                        Rp ${item.price.toLocaleString("id-ID")}
                    </td>

                    <td>
                        ${item.qty}
                    </td>

                    <td>
                        Rp ${subtotal.toLocaleString("id-ID")}
                    </td>
                </tr>
            `;
        });

        //diskon
        let discount = 0;

        if (cart.length === 1) {
            discount = 0;
        }
        else if (cart.length >= 2 && cart.length <= 4) {
            discount = 500000;
        }
        else if (cart.length > 4) {
            discount = 1000000;
        }

        /* Total setelah diskon */
        const finalTotal =
            Math.max(0, total - discount);

        detailHTML += `
                </tbody>
            </table>

            <div class="payment-summary">
                <p>
                    <span>
                        Jumlah Hewan
                    </span>

                    <span>
                        ${cart.length}
                    </span>
                </p>

                <p>
                    <span>
                        Total Harga
                    </span>

                    <span>
                        Rp ${total.toLocaleString("id-ID")}
                    </span>
                </p>

                <p>
                    <span>
                        Diskon
                    </span>
                    <span>
                        - Rp ${discount.toLocaleString("id-ID")}
                    </span>
                </p>
                <hr>
                <h3>
                    <span>
                        Total Bayar
                    </span>

                    <span>
                        Rp ${finalTotal.toLocaleString("id-ID")}
                    </span>
                </h3>
            </div>
        `;
        paymentInfo.innerHTML =
            detailHTML;
    }

    //adopi langsung
    else {
        const urlParams =
            new URLSearchParams(
                window.location.search
            );

        const pet =
            urlParams.get("pet");

        const mode =
            urlParams.get("mode");

        const price =
            parseInt(
                urlParams.get("price")
            ) || 0;

        let totalBayar = 0;
        let info = "";

        if (mode === "dp") {
            totalBayar = 500000;
            info =
                "Ambil di Tempat (DP Rp 500.000)";

        } else {
            totalBayar = price;
            info =
                "Diantar (Bayar Full)";
        }

        paymentInfo.innerHTML = `
            <h2>Rincian Pesanan</h2>
            <table class="payment-table">
                <thead>
                    <tr>
                        <th>Hewan</th>
                        <th>Opsi</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>
                            ${pet || "Hewan"}
                        </td>
                        <td>
                            ${info}
                        </td>
                        <td>
                            Rp ${totalBayar.toLocaleString("id-ID")}
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="payment-summary">
                <h3>
                    <span>
                        Total Bayar
                    </span>
                    <span>
                        Rp ${totalBayar.toLocaleString("id-ID")}
                    </span>
                </h3>
            </div>
        `;
    }
}
//opsi metode bayar
const paymentOption =
    document.getElementById("paymentOption");

const paymentMethod =
    document.getElementById("paymentMethod");

const selectedPaymentInfo =
    document.getElementById(
        "selectedPaymentInfo"
    );

const userForm =
    document.getElementById("userForm");


if (
    paymentOption &&
    selectedPaymentInfo
) {

    paymentOption.addEventListener(
        "change",
        function () {

            const cart =
                JSON.parse(
                    localStorage.getItem("cart")
                ) || [];

            let total = 0;

            cart.forEach(function (item) {

                total +=
                    item.price * item.qty;

            });

            //diskon
            let discount = 0;
            if (cart.length === 1) {
                discount = 0;
            }
            else if (
                cart.length >= 2 &&
                cart.length <= 4
            ) {
                discount = 500000;
            }
            else if (cart.length > 4) {
                discount = 1000000;
            }

            const finalTotal =
                Math.max(
                    0,
                    total - discount
                );

            let html = "";

            //dp
            if (
                this.value ===
                "pickup_dp"
            ) {
                const remaining =
                    Math.max(
                        0,
                        finalTotal - 500000
                    );
                html = `
                <p>
                    <strong>Ambil di Tempat - DP</strong>
                </p>
                <p>Bayar sekarang: Rp 500.000</p>
                <p>Sisa pembayaran:Rp ${remaining.toLocaleString("id-ID")}</p>
                `;
            }
            //full
            else if (
                this.value ===
                "pickup_full"
            ) {

                html = `
                    <p>
                    <strong>Ambil di Tempat - Full Payment</strong>
                    </p>
                    <p>
                        Bayar sekarang:
                        Rp ${finalTotal.toLocaleString("id-ID")}
                    </p>
                `;
            }
            //dikirim
            else if (
                this.value ===
                "delivery_full"
            ) {

                html = `
                    <p>
                        <strong>
                                Dikirim - Full Payment
                        </strong>
                    </p>
                    <p>
                        Bayar sekarang:
                        Rp ${finalTotal.toLocaleString("id-ID")}
                    </p>
                `;
            }

            selectedPaymentInfo.innerHTML =
                html;
        }
    );

}

//paymant
if (userForm) {
    userForm.addEventListener(
        "submit",
        function (e) {
            e.preventDefault();
            if (
                !paymentOption ||
                !paymentOption.value
            ) {
                alert(
                    "Silakan pilih opsi pembayaran terlebih dahulu."
                );
                return;
            }
            if (
                !paymentMethod ||
                !paymentMethod.value
            ) {
                alert(
                    "Silakan pilih metode pembayaran terlebih dahulu."
                );
                return;
            }
            alert(
                "Pembayaran berhasil! Terima kasih telah berbelanja di Pawtopia."
            );
            localStorage.removeItem("cart");
            updateCartCount();
            window.location.href =
                "Branda.html";

        }
    );

}
updateCartCount();