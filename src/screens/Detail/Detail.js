import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
// import PropTypes from "prop-types";

import "./style.module.scss";
import style from "./style.module.scss";

function Detail(props) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(1);

  const changeCount = (val) => {
    if (count <= 10) {
      if (count > 1) {
        setCount(count + val);
      } else if (val > 0) {
        setCount(count + val);
      }
    }
  };

  const getIdFromParam = () => {
    let param = new URLSearchParams(window.location.search);
    const id = param.get(`id`);
    if (id !== null) {
      return id;
    }
    return null;
  };

  const getProductDetail = async (params) => {
    try {
      const res = await productApi.getProductDetail(params);
      setProduct(res);
      setTimeout(() => {
        setLoading(true);
      }, process.env.REACT_APP_TIMEOUT);
    } catch (error) {
      //handle error
    }
  };

  useEffect(() => {
    const id = getIdFromParam();
    getProductDetail({ id });
    return () => {
      setProduct([]);
    };
  }, []);

  return (
    <div style={{ minHeight: window.innerHeight }}>
      <nav className={`breadcrumb ${style.breadcrumb__detail}`}>
        <ol className="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/">Trang chủ</a>
          </li>
          <li class="breadcrumb-item ">
            <a
              href={`/categories?cat=${product.category}`}
            >{`${product.category}`}</a>
          </li>
          <li class="breadcrumb-item">{product.title}</li>
        </ol>
      </nav>
      <div
        style={{
          minHeight: window.innerHeight,
        }}
        className={`row mx-0 align-items-center justify-content-center`}
      >
        {" "}
        {loading ? (
          <div
            className="w-100 px-0 row mx-0"
            style={{
              minHeight: window.innerHeight,
            }}
          >
            <div className="row mx-0">
              <div className="col-md-5 d-flex justify-content-center">
                <img src={product.image} alt={product.image} />
              </div>
              <div className="col-md d-flex flex-column">
                <h5 className="">{product.title}</h5>
                <p style={{ color: `rgba(0,0,0,0.5)` }}>
                  Mã sản phẩm: {product.id}
                </p>
                <div className="detail__btn-count input-group">
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={() => changeCount(-1)}
                  >
                    -
                  </button>

                  <input
                    type="number"
                    name="count"
                    value={count}
                    onChange={(e) => setCount(e.value)}
                    className="input-group-text"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    onClick={() => changeCount(1)}
                  >
                    +
                  </button>
                </div>
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
    </div>
  );
}

// Detail.propTypes = {};

export default Detail;
