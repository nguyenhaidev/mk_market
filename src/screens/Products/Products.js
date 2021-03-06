import React, { useState, useEffect } from "react";
import { UncontrolledCollapse, Button } from "reactstrap";
import Item from "../../components/UI/Item/Item";
import { useHistory } from "react-router-dom";
import "./style.css";

import categoryApi from "../../api/categoryApi";
import productApi from "../../api/productApi";

export default function Products() {
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [sort, setSort] = useState(null);
  const [row, setRow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [product_loading, setProduct_loading] = useState(false);

  let history = useHistory();

  const changeDisplay = (val) => setRow(val);

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = (e) => {
    const windowSize = window.innerWidth;
    setWidth(windowSize);
  };

  const toggleSort = (val) => setSort(val);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [width]);

  const getAllCategory = async () => {
    try {
      const res = await categoryApi.getAll();
      setAllCategory(res);
      setTimeout(() => {
        setLoading(true);
      }, process.env.REACT_APP_TIMEOUT);
    } catch (error) {
      // //handle error
      // setError(error);
    }
  };

  //Get products in category
  const getProductsInCat = async (cat, setData) => {
    try {
      const res = await productApi.getInCat(`${cat}`);
      setData(res);
      setTimeout(() => {
        setLoading(true);
        setProduct_loading(true);
      }, process.env.REACT_APP_TIMEOUT);
    } catch (error) {
      // //handle error
    }
  };

  const sortItems = async (type) => {
    switch (type) {
      case "asc": {
        let itemLst = [...items];
        setItems(
          itemLst.sort((a, b) => {
            return a.price - b.price;
          })
        );
        break;
      }
      case "dec": {
        let itemLst = [...items];
        setItems(
          itemLst
            .sort((a, b) => {
              return a.price - b.price;
            })
            .reverse()
        );
        break;
      }
      default: {
      }
    }
  };

  const renderItem = items.map((item, index) => {
    return row ? (
      <div key={index} className={width >= 1400 ? "col-lg-4" : "col-md-6"}>
        <Item data={item} rowStyle={false} />{" "}
      </div>
    ) : (
      <div key={index} className={`w-100`}>
        <Item data={item} rowStyle={!row} />{" "}
      </div>
    );
  });

  const catToggle = (val) => {
    setCategory(val);
    val !== ""
      ? history.push(`/categories?cat=${val}`)
      : history.push(`/categories`);
  };

  useEffect(() => {
    getParam();
    getProductsInCat(category, setItems);
    setProduct_loading(false);
    return () => {
      setItems([]);
    };
  }, [category]);

  const getParam = () => {
    let param = new URLSearchParams(window.location.search);
    const cat = param.get(`cat`);
    if (cat !== null) {
      setCategory(cat.toLocaleLowerCase());
      return cat.toLocaleLowerCase();
    }
    return "";
  };

  useEffect(() => {
    const cat = getParam();
    getAllCategory();
    getProductsInCat(cat, setItems);
  }, []);

  return (
    <div
      style={{
        minHeight: window.innerHeight,
      }}
      className={`row mx-0 align-items-center justify-content-center`}
    >
      {" "}
      {loading ? (
        <div
          className="w-100 px-0"
          style={{
            minHeight: window.innerHeight,
            marginTop: 30,
          }}
        >
          <div className="row d-block d-lg-none mx-0 ">
            <div className=" px-0">
              <Button
                id="toggler"
                className={`products__category products__category-active`}
                style={{
                  borderRadius: 0,
                }}
              >
                <i className="fas fa-bars me-2"> </i>Danh m???c s???n ph???m{" "}
              </Button>{" "}
              <UncontrolledCollapse toggler="#toggler">
                <button
                  className={`products__category ${
                    category === "" ? "products__category-active " : ""
                  }`}
                  onClick={() => catToggle("")}
                >
                  T???t c??? s???n ph???m{" "}
                </button>{" "}
                {allCategory.map((cat) => (
                  <button
                    key={cat}
                    className={`products__category ${
                      category === cat ? "products__category-active" : ""
                    }`}
                    onClick={() => catToggle(cat)}
                  >
                    {" "}
                    {`${cat[0].toUpperCase()}${cat.slice(1)}`}{" "}
                  </button>
                ))}{" "}
              </UncontrolledCollapse>{" "}
            </div>{" "}
          </div>{" "}
          <div className="row align-items-center py-0 mx-0 ">
            <div className="col-md-3 h-100 px-0 d-lg-block d-none ">
              <button
                className={`products__category ${
                  category === "" ? "products__category-active " : ""
                }`}
                onClick={() => catToggle("")}
              >
                <i className="fas fa-bars me-2 my-2"> </i>T???t c??? s???n ph???m{" "}
              </button>{" "}
            </div>{" "}
            <div
              className="col-md d-none d-lg-block"
              style={{
                backgroundColor: "rgba(0, 0, 0,0.1)",
              }}
            >
              <div className="w-100 h-100 d-flex align-items-center justify-content-between my-2 py-2 ">
                <div className="align-self-center">
                  <span className="me-3"> S???p x???p theo </span>{" "}
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 ${
                        sort === "asc" ? "products__sort-flag-active" : null
                      }`}
                      onClick={() => {
                        toggleSort("asc");
                        sortItems("asc");
                      }}
                    >
                      Gi?? th???p nh???t <i className="fas fa-arrow-up mx-1"> </i>{" "}
                    </button>{" "}
                  </span>{" "}
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 ${
                        sort === "dec" ? "products__sort-flag-active" : null
                      }`}
                      onClick={() => {
                        toggleSort("dec");
                        sortItems("dec");
                      }}
                    >
                      Gi?? cao nh???t <i className="fas fa-arrow-down mx-1"> </i>{" "}
                    </button>{" "}
                  </span>{" "}
                </div>{" "}
                <div className="">
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 ${
                        row ? "products__sort-flag-active" : null
                      }`}
                      onClick={() => {
                        changeDisplay(true);
                      }}
                    >
                      <i className="fas fa-th"> </i>{" "}
                    </button>{" "}
                  </span>{" "}
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 ${
                        !row ? "products__sort-flag-active" : null
                      }`}
                      onClick={() => {
                        changeDisplay(false);
                      }}
                    >
                      <i className="fas fa-list"> </i>{" "}
                    </button>{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>
            <div
              className="col-md d-block d-lg-none"
              style={{
                backgroundColor: "rgba(0, 0, 0,0.1)",
              }}
            >
              <div className="w-100 h-100 d-flex align-items-center justify-content-between my-2 py-2 ">
                <div className="align-self-center">
                  <span className="me-3"> S???p x???p theo </span>{" "}
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 `}
                      onClick={async () => {
                        toggleSort(sort === `asc` ? "dec" : `asc`);
                        sortItems(sort === `asc` ? "dec" : `asc`);
                      }}
                    >
                      Gi??{" "}
                      {sort === `asc` ? (
                        <i className="fas fa-arrow-up mx-1"> </i>
                      ) : (
                        <i className="fas fa-arrow-down mx-1"> </i>
                      )}{" "}
                    </button>{" "}
                  </span>{" "}
                  {/* <span>
                              <button
                                className={`btn products__sort-flag mx-1 ${
                                  sort === "dec" ? "products__sort-flag-active" : null
                                }`}
                                onClick={() => {
                                  toggleSort("dec");
                                  sortItems("dec");
                                }}
                              >
                                Gi?? <i className="fas fa-arrow-down mx-1"></i>
                              </button>
                            </span> */}{" "}
                </div>{" "}
                <div className="">
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 ${
                        row ? "products__sort-flag-active" : null
                      }`}
                      onClick={() => {
                        changeDisplay(true);
                      }}
                    >
                      <i className="fas fa-th"> </i>{" "}
                    </button>{" "}
                  </span>{" "}
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 ${
                        !row ? "products__sort-flag-active" : null
                      }`}
                      onClick={() => {
                        changeDisplay(false);
                      }}
                    >
                      <i className="fas fa-list"> </i>{" "}
                    </button>{" "}
                  </span>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </div>
          <div className="row mx-0">
            <div className="col-md-3 px-0 d-lg-block d-none">
              {" "}
              {allCategory.map((cat) => (
                <button
                  key={cat}
                  className={`products__category ${
                    category === cat ? "products__category-active" : ""
                  }`}
                  onClick={() => catToggle(cat)}
                >
                  {" "}
                  {`${cat[0].toUpperCase()}${cat.slice(1)}`}{" "}
                </button>
              ))}{" "}
            </div>{" "}
            <div className=" col-lg-9 px-0">
              <div className="row mx-0 mt-2">
                {" "}
                {!product_loading ? (
                  <div
                    className="row justify-content-center align-items-center"
                    style={{ minHeight: window.innerHeight / 2 }}
                  >
                    <div
                      class="spinner-border text-dark"
                      role="status"
                      style={{
                        height: window.innerHeight / 5,
                        width: window.innerHeight / 5,
                      }}
                    ></div>
                  </div>
                ) : (
                  renderItem
                )}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </div>
      ) : (
        <div
          class="spinner-border text-dark"
          role="status"
          style={{
            height: window.innerHeight / 5,
            width: window.innerHeight / 5,
          }}
        ></div>
      )}{" "}
    </div>
  );
}
