import React from "react";
import PropTypes from "prop-types";
import NumberFormat from "react-number-format";

function Item(props) {
  return (
    <div className="w-100 mx-2 my-2 row home-item">
      <div className="row ">
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
      <div className="w-100 item__btn-block  mx-0 py-1 px-2 row justify-content-around align-items-center">
        <div className="d-flex justify-content-around">
          <div className="">
            <a href="" className="btn btn-link item__btn-link">
              Xem chi tiết
            </a>
          </div>
          <div className="">
            <button className="btn item__btn">Đặt hàng</button>
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
