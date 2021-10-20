import axios from "axios";
import React, { useState, useEffect } from "react";

import Swipers from "../../components/UI/Swiper/Swipers";
import Caruosels from "../../components/UI/Carousel/Carousel";
import Item from "../../components/UI/Item/Item";

import banner1 from "../../images/GMMK_Compact.png";
import banner2 from "../../images/GMMK_Lifestyle.png";
import banner3 from "../../images/GMMK_Pro.png";
import "./style.css";
import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";

function Home(props) {
  const [categories, setCategories] = useState([]);
  const [hotItems, setHotItems] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [women, setWomen] = useState([]);
  const [users, setUsers] = useState([]);
  // const [error, setError] = useState([]);

  // const toggleLoading = () => setLoading(!loading);

  const items = [{ src: banner1 }, { src: banner2 }, { src: banner3 }];

  useEffect(() => {

    //Get all category
    const getAllCategory = async () => {
      try {
        const res = await categoryApi.getAll();
        setCategories(res);
      } catch (error) {
        // //handle error
        // setError(error);
      }
    }

    //Get 4 random user's infomation
    const getRamdomUser = async () => {
      try {
        const res = await axios({
          method: "get",
          url: "https://randomuser.me/api/?results=4",
        })
        setUsers(res.data.results);
      } catch (error) {
        // //handle error
        // setError(error);
      }
    }

    //Get products in category
    const getProductsInCat = async (cat, setData) => {
      try {
        const res = await productApi.getInCat(`${cat}`);
        setData(res);
      } catch (error) {
        // //handle error
        // setError(error);
      }
    }

    //Get poducts base on input
    const getSomeItems = async (limit = 8) => {
      try {
        const res = await productApi.getAll({ limit });
        setHotItems(res);
      } catch (error) {
        // //handle error
        // setError(error);
      }
    }

    getProductsInCat('electronics', setElectronics);
    getProductsInCat(`women's clothing`, setWomen);
    getRamdomUser();
    getAllCategory();
    getSomeItems(8)
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
          <a
            href="/categories?cat=electronics"
            className=" pb-2 home__label-btn"
          >
            <span className="label-text">Đồ điện tử</span>
          </a>
        </div>
        <div className="w-100 px-2">
          <Swipers data={electronics} />
        </div>
      </section>
      <section id="women'sClothing" className="mt-5">
        <div className="border-bottom pb-3 mx-0 row">
          <a
            href="/categories?cat=women's clothing"
            className=" pb-2 home__label-btn"
          >
            <span className="label-text">Quần áo nữ</span>
          </a>
        </div>
        <div className="w-100 px-2">
          <Swipers data={women} />
        </div>
      </section>
      <section id="supplier" className="mt-5">
        <div className=" pb-3 mx-0 row">
          <span className="supplier__label text-center">
            Nhà phân phối chính thức
          </span>
        </div>
        <div className="w-100 px-2 row mt-2">
          {users.map((user, index) => {
            return (
              <div key={index} className="col-sm col-md-4 col-lg-3 text-center">
                <div className="w-100">
                  <img
                    src={user.picture.large}
                    className="card-img-top p-2 rounded-circle"
                    style={{ height: "75%", width: "75%" }}
                    alt={
                      user.name.title +
                      ". " +
                      user.name.first +
                      " " +
                      user.name.last
                    }
                  />
                  <div className="card-body">
                    <h5 className="card-title">
                      {user.name.title +
                        ". " +
                        user.name.first +
                        " " +
                        user.name.last}
                    </h5>
                    <p className="card-text">{user.email}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
