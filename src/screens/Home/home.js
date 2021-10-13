import axios from "axios";
import React, { useState, useEffect } from "react";

import Swipers from "../../components/UI/Swiper/Swipers";
import Caruosels from "../../components/UI/Carousel/Carousel";
import Item from "../../components/UI/Item/Item";

import banner1 from "../../images/GMMK_Compact.png";
import banner2 from "../../images/GMMK_Lifestyle.png";
import banner3 from "../../images/GMMK_Pro.png";
import "./style.css";

function Home(props) {
  const [categories, setCategories] = useState([]);
  const [hotItems, setHotItems] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [users, setUsers] = useState([]);

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
      url: "https://randomuser.me/api/?results=4",
    }).then((res) => {
      // console.log(res.data);
      setUsers(res.data.results);
    });

    axios({
      method: "get",
      url: "https://fakestoreapi.com/products/category/electronics",
    }).then((res) => {
      setElectronics(res.data);
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
        <div className="text-center border-bottom pb-3">
          <span className="label-text">Danh mục sản phẩm</span>
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
          <a href="/hots" className=" pb-2 home__label-btn">
            <span className="label-text">Sản phẩm HOT</span>
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
      <section id="electronics" className="mt-5">
        <div className="border-bottom pb-3 mx-0 row">
          <a href="/electronics" className=" pb-2 home__label-btn">
            <span className="label-text">Đồ điện tử</span>
          </a>
        </div>
        <div className="w-100 px-2">
          <Swipers data={electronics} />
        </div>
      </section>
      <section id="supplier" className="mt-5">
        <div className=" pb-3 mx-0 row">
          <span className="supplier__label text-center">
            Nhà phân phối chính thức
          </span>
        </div>
        <div className="w-100 px-2 d-flex">
          {users.map((user, index) => {
            return (
              <div key={index} className="w-25">
                {user.cell}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
