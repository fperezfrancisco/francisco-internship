import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import AuthorImage from "../images/author_thumbnail.jpg";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [currAuthor, setCurrAuthor] = useState();
  const [followers, setFollowers] = useState();
  const [unfollowBtn, setUnfollowBtn] = useState(false);

  async function getAuthor(authorId) {
    return await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
    );
  }

  const handleFollow = () => {
    setFollowers(followers + 1);
    setUnfollowBtn(true);
  };

  const handleUnfollow = () => {
    setFollowers(followers - 1);
    setUnfollowBtn(false);
  };

  useEffect(() => {
    const apiResp = getAuthor(id);
    apiResp
      .then((resp) => {
        setCurrAuthor(resp.data);
        setFollowers(resp.data.followers);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {currAuthor ? (
                        <img src={currAuthor.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="999px"
                        />
                      )}

                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {!currAuthor ? (
                            <Skeleton width="200px" height="32px" />
                          ) : (
                            currAuthor.authorName
                          )}

                          <span className="profile_username">
                            {!currAuthor ? (
                              <Skeleton width="100px" height="32px" />
                            ) : (
                              `@${currAuthor.tag}`
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {!currAuthor ? (
                              <Skeleton width="200px" height="32px" />
                            ) : (
                              currAuthor.address
                            )}
                          </span>
                          {currAuthor && (
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {!currAuthor ? (
                        <Skeleton width="200px" height="50px" />
                      ) : (
                        <>
                          <div className="profile_follower">
                            {currAuthor && followers} followers
                          </div>
                          {currAuthor && !unfollowBtn ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={handleFollow}
                            >
                              Follow
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={handleUnfollow}
                            >
                              Unfollow
                            </Link>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {currAuthor ? (
                    <AuthorItems
                      authorCollection={currAuthor.nftCollection}
                      authorImage={currAuthor.authorImage}
                      authorId={id}
                    />
                  ) : (
                    <AuthorItems />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
