import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import nftImage from "../images/nftImage.jpg";
import Skeleton from "../components/UI/Skeleton";
import axios from "axios";

const ItemDetails = () => {
  const [item, setItem] = useState();
  const { id } = useParams();

  async function getItem(id) {
    return await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    //get item call
    const apiResp = getItem(id);
    apiResp
      .then((resp) => {
        setItem(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {item ? (
                  <img
                    src={item.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="100%" />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {item ? (
                    <h2>
                      {item.title} #{item.tag}
                    </h2>
                  ) : (
                    <Skeleton width="50%" height="36px" />
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      {item ? (
                        <>
                          <i className="fa fa-eye"></i>
                          {item.views}
                        </>
                      ) : (
                        <div className="fakeText">Hi world</div>
                      )}
                    </div>
                    <div className="item_info_like">
                      {item ? (
                        <>
                          <i className="fa fa-heart"></i> {item.likes}
                        </>
                      ) : (
                        <div className="fakeText">Hi world</div>
                      )}
                    </div>
                  </div>
                  {item ? (
                    <p>{item.description}</p>
                  ) : (
                    <Skeleton width="100%" height="100px" />
                  )}

                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {item ? (
                            <Link to={`/author/${item.ownerId}`}>
                              {" "}
                              <img
                                className="lazy"
                                src={item.ownerImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>{" "}
                            </Link>
                          ) : (
                            <Skeleton
                              width="48px"
                              height="48px"
                              borderRadius="999px"
                            />
                          )}
                        </div>
                        <div className="author_list_info">
                          {item ? (
                            <Link to={`/author/${item.ownerId}`}>
                              {" "}
                              {item.ownerName}{" "}
                            </Link>
                          ) : (
                            <Skeleton width="150px" height="20px" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          {item ? (
                            <Link to={`/author/${item.creatorId}`}>
                              {" "}
                              <img
                                className="lazy"
                                src={item.creatorImage}
                                alt=""
                              />
                              <i className="fa fa-check"></i>{" "}
                            </Link>
                          ) : (
                            <Skeleton
                              width="48px"
                              height="48px"
                              borderRadius="999px"
                            />
                          )}
                        </div>
                        <div className="author_list_info">
                          {item ? (
                            <Link to={`/author/${item.creatorId}`}>
                              {item.creatorName}
                            </Link>
                          ) : (
                            <Skeleton width="150px" height="20px" />
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {item ? (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{item.price}</span>
                        </>
                      ) : (
                        <Skeleton width="100px" height="24px" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
