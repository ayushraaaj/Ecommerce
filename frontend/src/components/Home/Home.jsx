import React, { Fragment } from "react";
import { CgMouse } from "react-icons/cg";
import './Home.css'
import Product from "./Product";

const product = {
    name: 'Blue Tshirt',
    price: '₹4000',
    images: [{ url: 'https://m7clothing.in/admin/images/m73171076384540467.jpg' }],
    _id: '1234567890'
}

const Home = () => {
    return (
        <Fragment>
            <div className="banner">
                <p>Welcome to Ecommerce</p>
                <h1>FIND AMAZING PRODUCTS BELOW</h1>

                <a href="#container">
                    <button>
                        Scroll <CgMouse />
                    </button>
                </a>
            </div>

            <h2 className="homeHeading">Featured Products</h2>

            <div className="container" id="container">
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
                <Product product={product} />
            </div>
        </Fragment>
    );
}

export default Home;