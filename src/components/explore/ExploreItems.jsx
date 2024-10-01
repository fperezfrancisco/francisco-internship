import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import Skeleton from "../UI/Skeleton";
import CountdownTimer from "../CountdownTimer";

const ExploreItems = () => {
  const [exploreList, setExploreList] = useState();
  const [currDate, setCurrDate] = useState(Date.now());
  const [lastIndex, setLastIndex] = useState(0);
  const [noBtn, setNoBtn] = useState(false);

  async function getExploreList() {
    return await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/explore"
    );
  }

  async function getFilteredList(value) {
    return await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${value}`
    );
  }

  const handleLoadMore = () => {
    if (lastIndex === 8) {
      setLastIndex(12);
    } else if (lastIndex === 12) {
      setLastIndex(16);
      setNoBtn(true);
    }
  };

  const handleFilterList = (filterValue) => {
    if (filterValue === "") {
      getDefaultList();
    } else {
      const apiResp = getFilteredList(filterValue);
      apiResp
        .then((resp) => {
          setExploreList(resp.data);
        })
        .catch((err) => console.log(err));

      return;
    }
  };

  const getDefaultList = () => {
    const apiResp = getExploreList();
    apiResp
      .then((resp) => {
        setExploreList(resp.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDefaultList();
    setLastIndex(8);
  }, []);

  //does this work
  return (
    <>
      <div>
        <select
          id="filter-items"
          defaultValue=""
          onChange={(e) => handleFilterList(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {!exploreList
        ? new Array(8).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to="/author"
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Creator: Monica Lucas"
                  >
                    <Skeleton width="60px" height="60px" borderRadius="999px" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="de_countdown">
                  <Skeleton width="10%" height="24px" />
                </div>

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>

                  <Link to="/item-details">
                    <Skeleton
                      width="100%"
                      height="200px"
                      borderRadius="0.5rem"
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <Skeleton width="75%" height="24px" />
                  </Link>
                  <Skeleton width="50%" height="24px" />
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>69</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        : exploreList.slice(0, lastIndex).map((element) => (
            <div
              key={element.id}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <div className="nft__item">
                <div className="author_list_pp">
                  <Link
                    to={`/author/${element.authorId}`}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                  >
                    <img className="lazy" src={element.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                {element.expiryDate - currDate > 0 && (
                  <div className="de_countdown">
                    <CountdownTimer targetDate={element.expiryDate} />
                  </div>
                )}

                <div className="nft__item_wrap">
                  <div className="nft__item_extra">
                    <div className="nft__item_buttons">
                      <button>Buy Now</button>
                      <div className="nft__item_share">
                        <h4>Share</h4>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-facebook fa-lg"></i>
                        </a>
                        <a href="" target="_blank" rel="noreferrer">
                          <i className="fa fa-twitter fa-lg"></i>
                        </a>
                        <a href="">
                          <i className="fa fa-envelope fa-lg"></i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <Link to="/item-details">
                    <img
                      src={element.nftImage}
                      className="lazy nft__item_preview"
                      alt=""
                    />
                  </Link>
                </div>
                <div className="nft__item_info">
                  <Link to="/item-details">
                    <h4>{element.title}</h4>
                  </Link>
                  <div className="nft__item_price">{element.price} ETH</div>
                  <div className="nft__item_like">
                    <i className="fa fa-heart"></i>
                    <span>{element.likes}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

      {!noBtn && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={handleLoadMore}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;
