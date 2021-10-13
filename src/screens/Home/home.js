import axios from "axios";
import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";

import Caruosels from "../../components/UI/Carousel/Carousel";
import Item from "../../components/UI/Item/Item";

import banner1 from "../../images/GMMK_Compact.png";
import banner2 from "../../images/GMMK_Lifestyle.png";
import banner3 from "../../images/GMMK_Pro.png";
import "./style.css";

function Home(props) {
  const [categories, setCategories] = useState([]);
  const [hotItems, setHotItems] = useState([]);

  const items = [{ src: banner1 }, { src: banner2 }, { src: banner3 }];

  useEffect(() => {
    axios({
      method: "get",
      url: "https://fakestoreapi.com/products/categories",
    }).then((res) => {
      setCategories(res.data);
    });

    axios({
      method: "get",
      url: "https://fakestoreapi.com/products",
      params: { limit: 8 },
    }).then((res) => {
      setHotItems(res.data);
    });
  }, []);

  return (
    <div>
      <div id="banner">
        <Caruosels items={items} />
      </div>
      <section id="category" className="mt-5">
        <div className="text-center label-text border-bottom pb-3">
          Danh mục sản phẩm
        </div>
        <div className="row mx-0 mt-2">
          {categories.map((cat, index) => {
            return (
              <div key={index} className="px-2 col-md btn">
                <div className="my-2 py-3 btn-category">
                  {`${cat[0].toUpperCase()}${cat.slice(1)}`}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section id="category" className="mt-5">
        <div className="border-bottom pb-3 mx-0 row">
          <a href="/products" className=" label-text pb-2 btn-link">
            Sản phẩm HOT
          </a>
        </div>
        <div className="row mx-0 mt-2">
          {hotItems.map((item, index) => {
            return (
              <div key={index} className="col-6 col-lg-4 col-xl-3">
                <Item data={item} />
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

Home.propTypes = {};

export default Home;
