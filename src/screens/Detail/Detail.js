import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import NumberFormat from "react-number-format";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
// import PropTypes from "prop-types";

import style from "./style.module.scss";

function Detail(props) {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [count, setCount] = useState(1);
  const [tab, setTab] = useState(0);
  const [img, setImg] = useState("https://via.placeholder.com/150");

  const [description, setDescription] = useState({});
  const [information, setInformation] = useState({});

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  // const changeCount = (val) => {
  //   if (count < 10) {
  //     if (count > 1) {
  //       setCount(count + val);
  //     } else if (val > 0) {
  //       setCount(count + val);
  //     }
  //   } else if (count === 10 && val < 0) {
  //     setCount(count + val);
  //   }
  // };

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

  const getRamdomParagraph = async () => {
    try {
      const res = await axios.get(
        "https://random-data-api.com/api/lorem_ipsum/random_lorem_ipsum"
      );
      setDescription(res.data);
    } catch (error) {
      //handle error
    }
  };

  const getRamdomData = async () => {
    try {
      const res = await axios.get(
        "https://random-data-api.com/api/code/random_code"
      );
      setInformation(res.data);
    } catch (error) {
      //handle error
    }
  };

  const getRamdomImg = async () => {
    try {
      const res = await axios({
        method: "get",
        url: "https://random-data-api.com/api/crypto_coin/random_crypto_coin",
      });
      setImg(res.data.logo);
    } catch (error) {
      // //handle error
      // setError(error);
    }
  };

  useEffect(() => {
    getRamdomParagraph();
    getRamdomData();
    const id = getIdFromParam();
    getProductDetail({
      id,
    });
    getRamdomImg();
    return () => {
      setProduct([]);
    };
  }, []);

  const addId = (index) => {
    return {
      id: `tab-${index}`,
      "aria-controls": `tabpanel-${index}`,
    };
  };

  const defaulContent = (
    <div
      className="text-center h3"
      style={{
        color: `rgba(0,0,0,0.5)`,
      }}
    >
      <p>Chưa cập nhật</p>
      <div>
        <i class="fas fa-archive" style={{ fontSize: 120 }}></i>
      </div>
    </div>
  );

  const tabPanel = (index, content = defaulContent) => {
    return (
      <div
        role="tabpanel"
        hidden={tab !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
      >
        {tab === index && <Box className="py-3">{content}</Box>}
      </div>
    );
  };

  const detail = (
    <div className="w-100">
      <p>{product.description}</p>
      {description.paragraphs
        ? description.paragraphs.map((para, index) => <p key={index}>{para}</p>)
        : null}
      <p>{description.very_long_sentence}</p>
      <p>{description.short_sentence}</p>
    </div>
  );

  const renderRow = Object.keys(information).map((prop) => {
    return (
      <tr key={prop}>
        <th scope="col">{prop}</th>
        <td className="col">{information[prop]}</td>
      </tr>
    );
  });

  const info = (
    <div className="w-100 text-center">
      <div className="mt-2 h1" style={{ marginBottom: 30 }}>
        Thông số kĩ thuật
      </div>
      <table class="table table-bordered text-center">
        <thead>
          <tr>
            <th scope="col">Tên sản phẩm</th>
            <th scope="col">{product.title}</th>
          </tr>
          {renderRow}
        </thead>
        <tbody></tbody>
      </table>
    </div>
  );

  return (
    <div
      style={{
        minHeight: window.innerHeight,
      }}
    >
      <nav className={`breadcrumb ${style.breadcrumb__detail}`}>
        <ol className="breadcrumb">
          <li class="breadcrumb-item">
            <a href="/"> Trang chủ </a>{" "}
          </li>{" "}
          <li class="breadcrumb-item ">
            <a href={`/categories?cat=${product.category}`}>
              {" "}
              {`${product.category}`}{" "}
            </a>{" "}
          </li>{" "}
          <li class="breadcrumb-item active"> {product.title} </li>{" "}
        </ol>{" "}
      </nav>{" "}
      <div
        style={{
          minHeight: window.innerHeight,
        }}
        className={`row mx-0 align-items-start justify-content-center`}
      >
        {loading ? (
          <div
            className="w-100 px-0 row mx-0"
            style={{
              minHeight: "100%",
            }}
          >
            <div className="row mx-0">
              <div className="col-md-5 d-flex justify-content-center">
                <img src={product.image} alt={product.image} />{" "}
              </div>{" "}
              <div className="col-md d-flex flex-column">
                <p className="h5"> {product.title} </p>{" "}
                <div className="d-flex my-1 flex-column flex-md-row">
                  <div
                    className="me-3"
                    style={{
                      color: `rgba(0,0,0,0.5)`,
                    }}
                  >
                    Mã sản phẩm: {product.id}{" "}
                  </div>
                  <div
                    className="ms-0 ms-md-2 mt-1 mt-md-0"
                    style={{
                      color: `rgba(0,0,0,0.5)`,
                    }}
                  >
                    Kho: {Math.floor(Math.random() * 100)}
                  </div>
                </div>
                <p
                  className=""
                  style={{
                    color: `rgba(0,0,0,0.5)`,
                  }}
                >
                  Khuyến mãi: tặng mã giảm 10% tổng giá trị đơn hàng, tối đa{" "}
                  <NumberFormat
                    value={300000}
                    displayType={"text"}
                    thousandSeparator={true}
                  />
                  ₫. Chương trình kéo dài đến 30/11/2021. Số lượng có hạn!
                </p>
                <p className="mv-1 h2">
                  Giá:
                  <NumberFormat
                    value={product.price * 23000}
                    displayType={"text"}
                    thousandSeparator={true}
                    className="mx-2"
                  />
                  ₫
                </p>
                <div className="d-flex flex-column flex-md-row border-top py-3 mt-2 align-items-center">
                  <img
                    src={img}
                    style={{
                      height: 100,
                      width: 100,
                    }}
                    alt="logo"
                    className="h-100"
                  />
                  <p
                    style={{
                      color: `rgba(0,0,0,0.5)`,
                    }}
                    className="px-3"
                  >
                    {product.category} Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Corporis eos alias cupiditate iste, harum
                    accusantium, adipisci corrupti pariatur illo facere aperiam,
                    esse provident? Eligendi, impedit ducimus deleniti placeat
                    labore possimus!
                  </p>
                </div>
                {/* <div className="detail__btn-count input-group">
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
                              style={{ width: "25%" }}
                            />
                            <button
                              class="btn btn-outline-secondary"
                              type="button"
                              onClick={() => changeCount(1)}
                            >
                              +
                            </button>{" "}
                          </div> */}{" "}
                {/* <div className="mt-2">
                  <div className="my-2">
                    <button className={style.add + ` me-md-2 me-0`}>
                      Thêm vào giỏ hàng{" "}
                    </button>{" "}
                  </div>{" "}
                  <button className={style.add}> Mua ngay </button>{" "}
                </div>{" "} */}
              </div>{" "}
            </div>{" "}
            <div className="my-4 ">
              <Box sx={{ width: "100%" }}>
                <Box
                  sx={{ borderBottom: 1, borderColor: "divider" }}
                  className="text-center"
                >
                  <Tabs
                    value={tab}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    centered
                  >
                    <Tab label="Mô Tả" {...addId(0)} />
                    <Tab label="Thông số" {...addId(1)} />
                    <Tab label="Đánh giá" {...addId(2)} />
                  </Tabs>
                </Box>
                {tabPanel(0, detail)}
                {tabPanel(1, info)}
                {tabPanel(2)}
              </Box>
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
        )}{" "}
      </div>{" "}
    </div>
  );
}

// Detail.propTypes = {};

export default Detail;
