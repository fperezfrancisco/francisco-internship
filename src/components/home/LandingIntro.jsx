import React from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const LandingIntro = () => {
  return (
    <section id="section-intro" className="no-top no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i
                className="bg-color-2 i-boxed icon_wallet"
                data-aos="fade-up"
                data-aos-offset="50"
                data-aos-delay="0"
                data-aos-duration="1200"
                data-aos-easing="ease"
                data-aos-once="true"
              ></i>
              <div className="text">
                <h4 className="">Set up your wallet</h4>
                <p
                  data-aos="fade-up"
                  data-aos-offset="50"
                  data-aos-delay="150"
                  data-aos-duration="1500"
                  data-aos-easing="ease"
                  data-aos-once="true"
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_wallet"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i
                className="bg-color-2 i-boxed icon_cloud-upload_alt"
                data-aos="fade-up"
                data-aos-offset="50"
                data-aos-delay="0"
                data-aos-duration="1200"
                data-aos-easing="ease"
                data-aos-once="true"
              ></i>
              <div className="text">
                <h4 className="">Add your NFT's</h4>
                <p
                  data-aos="fade-up"
                  data-aos-offset="50"
                  data-aos-delay="150"
                  data-aos-duration="1500"
                  data-aos-easing="ease"
                  data-aos-once="true"
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_cloud-upload_alt"></i>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 mb-sm-30">
            <div className="feature-box f-boxed style-3">
              <i
                className="bg-color-2 i-boxed icon_tags_alt"
                data-aos="fade-up"
                data-aos-offset="50"
                data-aos-delay="0"
                data-aos-duration="1200"
                data-aos-easing="ease"
                data-aos-once="true"
              ></i>
              <div className="text">
                <h4 className="">Sell your NFT's</h4>
                <p
                  data-aos="fade-up"
                  data-aos-offset="50"
                  data-aos-delay="150"
                  data-aos-duration="1500"
                  data-aos-easing="ease"
                  data-aos-once="true"
                >
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem.
                </p>
              </div>
              <i className="wm icon_tags_alt"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingIntro;
