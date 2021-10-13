import React from "react";
import "./style.css";

const Footer = (props) => {
  return (
    <div id="footer" className="w-100 row mx-0 mt-3">
      <div className="col-md-4 d-flex align-items-start justify-content-center">
        <div className="d-flex align-items-center justify-content-center">
          <div
            className="px-3 py-2 fw-bold text-center"
            style={{
              borderRadius: 8,
              backgroundColor: "#1a1a74",
              color: "white",
              fontSize: 46,
            }}
          >
            MK
          </div>
          <div
            className="fw-bold w-50 text-center ms-2"
            style={{ fontSize: 46 }}
          >
            Market
          </div>
        </div>
      </div>
      <div className="col-md-4 my-3 my-md-0 d-flex flex-column align-items-center justify-content-center">
        <div className="w-50 text-center text-md-start">
          <div className="footer__item footer__label">Liên hệ</div>
          <div className="footer__item">Thông tin</div>
          <div className="footer__item">Blog</div>
        </div>
      </div>
      <div className="col-md-4 d-flex my-3 my-md-0 flex-column align-items-center justify-content-start">
        <div className="w-100 text-center text-md-start d-flex flex-column align-items-center align-items-md-start">
          <div className="footer__label">Đăng ký để nhận khuyến mãi</div>
          <div className="footer__item footer__input-group py-1 d-flex align-items-center w-75">
            <input
              type="email"
              className="footer__input w-100"
              placeholder="Email"
              aria-label="Email"
              autoComplete="none"
            />
            <span className="">
              <button className="footer_input-btn btn">
                <i className="fas fa-paper-plane"></i>
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
