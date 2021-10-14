import React, { useState, useEffect } from "react";
// import { Collapse, Button, CardBody, Card } from "reactstrap";
import Item from "../../components/UI/Item/Item";
import { useHistory } from "react-router-dom";
import axios from "axios";
import "./style.css";
// import { render } from "@testing-library/react";

export default function Products() {
  const [allCategory, setAllCategory] = useState([]);
  const [category, setCategory] = useState("");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState([]);
  const [sort, setSort] = useState(null);
  let history = useHistory();

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
    return (
      <div key={index} className="col-6 col-md-4">
        <Item data={item} />
      </div>
    );
  });

  const catToggle = (val) => {
    setCategory(val);
    console.log(category);
    val !== ""
      ? history.push(`/categories?cat=${val}`)
      : history.push(`/categories`);
  };

  useEffect(() => {
    let param = new URLSearchParams(window.location.search);
    if (param.get(`cat`) !== null) {
      setCategory(param.get(`cat`));
    }
    axios({
      method: "get",
      url:
        category === ""
          ? "https://fakestoreapi.com/products/"
          : `https://fakestoreapi.com/products/category/${category}`,
    }).then((res) => {
      setItems(res.data);
    });

    return () => {
      setItems([]);
    };
  }, [category]);

  useEffect(() => {
    setLoading(true);
    axios({
      method: "get",
      url: "https://fakestoreapi.com/products/categories",
    }).then((res) => {
      setAllCategory(res.data);
    });

    axios({
      method: "get",
      url: "https://fakestoreapi.com/products",
    }).then((res) => {
      setItems(res.data);
    });
    setLoading(false);
  }, []);

  return (
    <div
      className="w-100"
      style={{ minHeight: window.innerHeight, marginTop: 30 }}
    >
      <div className="row align-items-center py-0 mx-0">
        <div className="col-md-3 h-100 px-0">
          <button
            className={`products__category ${
              category === "" ? "products__category-active" : ""
            }`}
            onClick={() => catToggle("")}
          >
            <i className="fas fa-bars me-2"></i>Tất cả sản phẩm
          </button>
        </div>
        <div
          className="col-md-9 "
          style={{ backgroundColor: "rgba(0, 0, 0,0.1)" }}
        >
          <div className="w-100 h-100 d-flex align-items-center my-2">
            <span className="me-3">Sắp xếp theo</span>
            <span>
              <button
                className={`btn products__sort-flag mx-1 ${
                  sort === "asc" ? "products__sort-flag-active" : null
                }`}
                onClick={() => {
                  setSort("asc");
                  sortItems("asc");
                }}
              >
                Giá thấp nhất <i class="fas fa-arrow-up mx-1"></i>
              </button>
            </span>
            <span>
              <button
                className={`btn products__sort-flag mx-1 ${
                  sort === "dec" ? "products__sort-flag-active" : null
                }`}
                onClick={() => {
                  setSort("dec");
                  sortItems("dec");
                }}
              >
                Giá cao nhất <i class="fas fa-arrow-down mx-1"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
      <div className="row mx-0">
        {loading && <div>Test</div>}
        <div className="col-md-3 px-0">
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
        <div className="col-md-9 ">
          <div className="row mx-0 mt-2">{renderItem}</div>
        </div>
      </div>
    </div>
  );
}
