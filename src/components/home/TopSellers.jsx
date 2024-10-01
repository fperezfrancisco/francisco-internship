import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const TopSellers = () => {
  const [sellersList, setSellersList] = useState();

  async function getSellers() {
    return await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
  }

  useEffect(() => {
    const apiResp = getSellers();
    apiResp
      .then((resp) => {
        setSellersList(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade-in"
                data-aos-duration="1000"
                data-aos-easing="ease"
                data-aos-once="true"
              >
                Top Sellers
              </h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <div
            className="col-md-12"
            data-aos="fade-in"
            data-aos-duration="1000"
            data-aos-easing="ease"
            data-aos-delay="100"
            data-aos-once="true"
          >
            <ol className="author_list">
              {!sellersList
                ? new Array(12).fill(0).map((_, index) => (
                    <li key={index}>
                      <div className="author_list_pp">
                        <Link to="/author">
                          <Skeleton
                            width="48px"
                            height="48px"
                            borderRadius="999px"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">
                          <Skeleton width="75%" height="24px" />
                        </Link>
                        <span>
                          <Skeleton width="25%" height="24px" />
                        </span>
                      </div>
                    </li>
                  ))
                : sellersList.map((element) => (
                    <li key={element.id}>
                      <div className="author_list_pp">
                        <Link to={`/author/${element.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={element.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to={`/author/${element.authorId}`}>
                          {element.authorName}
                        </Link>
                        <span>{element.price} ETH</span>
                      </div>
                    </li>
                  ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
