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
      }, process.env.REACT_APP_TIMEOUT);
    } catch (error) {
      // //handle error
      // setError(error);
    }
  };

  const sortItems = (type) => {
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
        <Item data={item} rowStyle={false} />
      </div>
    ) : (
      <div key={index} className={`w-100`}>
        <Item data={item} rowStyle={!row} />
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

    return () => {
      setItems([]);
    };
  }, [category]);

  const getParam = async () => {
    let param = new URLSearchParams(window.location.search);
    const cat = param.get(`cat`);
    console.log(cat);
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
      style={{ minHeight: window.innerHeight }}
      className={`row mx-0 align-items-center justify-content-center`}
    >
      {loading ? (
        <div
          className="w-100 px-0"
          style={{ minHeight: window.innerHeight, marginTop: 30 }}
        >
          <div className="row d-block d-lg-none mx-0 ">
            <div className=" px-0">
              <Button
                id="toggler"
                className={`products__category products__category-active`}
                style={{ borderRadius: 0 }}
              >
                <i className="fas fa-bars me-2"></i>Danh mục sản phẩm
              </Button>
              <UncontrolledCollapse toggler="#toggler">
                <button
                  className={`products__category ${
                    category === "" ? "products__category-active " : ""
                  }`}
                  onClick={() => catToggle("")}
                >
                  Tất cả sản phẩm
                </button>
                {allCategory.map((cat) => (
                  <button
                    key={cat}
                    className={`products__category ${
                      category === cat ? "products__category-active" : ""
                    }`}
                    onClick={() => catToggle(cat)}
                  >{`${cat[0].toUpperCase()}${cat.slice(1)}`}</button>
                ))}
              </UncontrolledCollapse>
            </div>
          </div>
          <div
            className="row d-block d-lg-none mx-0 py-2 align-items-center justity-content-center"
            style={{ backgroundColor: "rgba(0, 0, 0,0.1)" }}
          >
            <div className="col"> Sắp xếp theo</div>{" "}
          </div>
          <div className="row align-items-center py-0 mx-0 ">
            <div className="col-md-3 h-100 px-0 d-lg-block d-none ">
              <button
                className={`products__category ${
                  category === "" ? "products__category-active " : ""
                }`}
                onClick={() => catToggle("")}
              >
                <i className="fas fa-bars me-2 my-2"></i>Tất cả sản phẩm
              </button>
            </div>
            <div
              className="col-md"
              style={{ backgroundColor: "rgba(0, 0, 0,0.1)" }}
            >
              <div className="w-100 h-100 d-flex align-items-center justify-content-between my-2 py-2">
                <div className="">
                  <span className="me-3">Sắp xếp theo</span>
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
                      Giá thấp nhất <i className="fas fa-arrow-up mx-1"></i>
                    </button>
                  </span>
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
                      Giá cao nhất <i className="fas fa-arrow-down mx-1"></i>
                    </button>
                  </span>
                </div>
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
                      <i className="fas fa-th"></i>
                    </button>
                  </span>
                  <span>
                    <button
                      className={`btn products__sort-flag mx-1 ${
                        !row ? "products__sort-flag-active" : null
                      }`}
                      onClick={() => {
                        changeDisplay(false);
                      }}
                    >
                      <i className="fas fa-list"></i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row mx-0">
            <div className="col-md-3 px-0 d-lg-block d-none">
              {allCategory.map((cat) => (
                <button
                  key={cat}
                  className={`products__category ${
                    category === cat ? "products__category-active" : ""
                  }`}
                  onClick={() => catToggle(cat)}
                >{`${cat[0].toUpperCase()}${cat.slice(1)}`}</button>
              ))}
            </div>
            <div className=" col-lg-9 px-0">
              <div className="row mx-0 mt-2">{renderItem}</div>
            </div>
          </div>
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
      )}
    </div>
  );
}
