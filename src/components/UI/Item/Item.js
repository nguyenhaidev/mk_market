import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

function Item(props) {
  return (
    <div className="w-100 mx-0 my-2 row home-item justify-content-center">
      <div className="row flex-column flex-md-row d-flex">
        <div className="col-md-5">
          <img
            className="w-100 item-img pt-2"
            src={props.data.image}
            alt={props.data.title}
          />
        </div>
        <div className="col-md-7 d-flex flex-column justify-content-center">
          <p className="item-title ">{props.data.title}</p>
          <p className="item-price ">
            Giá:
            <NumberFormat
              value={props.data.price * 23000}
              displayType={"text"}
              thousandSeparator={true}
              className="mx-1"
            />
            Đồng
          </p>
        </div>
      </div>
      <div className="py-2 w-100 item__btn-block  mx-0 py-1 px-2 row justify-content-around align-items-center">
        <div className="d-flex justify-content-around flex-column flex-md-row ">
          <div className="my-2 text-center text-md-start">
            <a href="/" className=" item__btn-link ">
              Xem chi tiết
            </a>
          </div>
          <div className="">
            <button className="btn w-100 item__btn">Đặt hàng</button>
          </div>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Item;
