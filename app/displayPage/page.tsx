"use client";

import "../styles/mdb.min.css";
import "../styles/snippet.css";
import "../styles/wheel.css";

/*
import {
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBCardTitle,
  MDBCarousel,
  MDBCarouselItem,
  MDBCheckbox,
  MDBCol,
  MDBCollapse,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalContent,
  MDBModalDialog,
  MDBModalFooter,
  MDBModalHeader,
  MDBModalTitle,
  MDBNavbar,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarNav,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBRipple,
  MDBRow,
  MDBTextArea,
  MDBTypography,
} from "mdb-react-ui-kit";
*/
import {
  MDBBtn,
  MDBCarousel,
  MDBContainer,
  MDBFooter,
  MDBIcon,
} from "mdb-react-ui-kit";
import Select from "react-select";
import Link from "next/link";
import styled from "styled-components";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ReadonlyURLSearchParams, useSearchParams } from "next/navigation";

import { gql, useQuery } from "@apollo/client";

interface Style {
  name: string;
}

interface Artist {
  name: string;
}

interface WorkOfArt {
  fileName: String;
  creationDate: Date;
  width: number;
  height: number;
  title: String;
  creator: Artist;
  style: Style;
  url: String;
}

interface WorkOfArtData {
  workOfArts: WorkOfArt[];
}

const WhiteLink = styled.a`
  color: white;
  &:hover {
    color: white;
  }
`;

var savedData: WorkOfArtData;

const sliderImageUrl = [
  //First image url
  {
    url: "https://i2.wp.com/www.geeksaresexy.net/wp-content/uploads/2020/04/movie1.jpg?resize=600%2C892&ssl=1",
  },
  {
    url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-kids-movies-2020-call-of-the-wild-1579042974.jpg?crop=0.9760858955588091xw:1xh;center,top&resize=480:*",
  },
  //Second image url
  {
    url: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/best-movies-for-kids-2020-sonic-the-hedgehog-1571173983.jpg?crop=0.9871668311944719xw:1xh;center,top&resize=480:*",
  },
  //Third image url
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQS82ET2bq9oTNwPOL8gqyoLoLfeqJJJWJmKQ&usqp=CAU",
  },

  //Fourth image url

  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTdvuww0JDC7nFRxiFL6yFiAxRJgM-1tvJTxA&usqp=CAU",
  },
];

var imageUrl: Array<{ url: string }> = [];

const WORKS_BY_ARTIST_QUERY = gql`
  query WorksByArtist($artist: String!) {
    workOfArts(where: { creator_SOME: { name: $artist } }) {
      width
      height
      title
      creationDate
      fileName
      style {
        name
      }
      url
    }
  }
`;

const WORKS_BY_STYLE_QUERY = gql`
  query WorksByStyle($style: String!) {
    workOfArts(where: { style_SOME: { name: $style } }) {
      title
      width
      height
      creator {
        name
      }
      creationDate
      fileName
      url
    }
  }
`;

export default function DisplayPage() {
  const carouselResponsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const searchParams = useSearchParams();
  console.log("artist is " + searchParams.get("artist"));
  console.log("style is " + searchParams.get("style"));
  const style = searchParams.get("style");
  const artist = searchParams.get("artist");

  var styleOrArtist: string;

  if (searchParams.has("style")) {
    styleOrArtist = "style";
    //StyleDisplay();
  } else {
    styleOrArtist = "artist";
    // ArtistDisplay();
  }

  const query =
    styleOrArtist === "artist" ? WORKS_BY_ARTIST_QUERY : WORKS_BY_STYLE_QUERY;

  const { loading, error, data, refetch } = useQuery(query, {
    variables: styleOrArtist === "artist" ? { artist } : { style },
  });
  if (loading) console.log("Loading Works data ...");
  if (error) console.log(`Works useQuery error: ${error.message}`);

  imageUrl = sliderImageUrl;
  console.log("in StyleDisplay(); data is " + JSON.stringify(data));
  console.log(
    "in StyleDisplay(); data.workOfArts is " + JSON.stringify(data?.workOfArts)
  );

  /*
  const [domLoaded, setDomLoaded] = useState(false);
  
  useEffect(() => {
    setDomLoaded(true);
  }, []);
  if (!domLoaded) {

    return <></>;
  } else */ {
    return (
      <>
        <header>
          {/* Sidenav */}

          <nav
            id="sidenav-4"
            className="sidenav bg-glass opacity-100"
            data-mdb-color="light"
            data-mdb-mode="side"
            data-mdb-slim="true"
            data-mdb-slim-collapsed="true"
            data-mdb-content="#slim-content"
            style={{
              top: "115px",
              width: "70px",
              height: "100vh",
              position: "fixed",
              transition: "0.3s linear",
              transform: "translateX(0%)",
            }}
          >
            <div className="sidenav-item mb-2">
              <a
                id="slim-toggler"
                className="sidenav-link d-flex justify-content-center border-bottom ripple-surface ripple-surface-light"
              >
                <i className="fas fa-chevron-circle-right"></i>
              </a>
            </div>

            <ul className="sidenav-menu">
              <li className="sidenav-item">
                <a className="sidenav-link">
                  <i className="fas fa-chart-area fa-fw me-3"></i>
                  <span data-mdb-slim="false">Website traffic</span>
                </a>
              </li>
              <li className="sidenav-item">
                <a className="sidenav-link">
                  <i className="fas fa-chart-line fa-fw me-3"></i>
                  <span data-mdb-slim="false">Analytics</span>
                </a>
              </li>
              <li className="sidenav-item">
                <a className="sidenav-link">
                  <i className="fas fa-chart-pie fa-fw me-3"></i>
                  <span data-mdb-slim="false">SEO</span>
                </a>
              </li>
              <li className="sidenav-item">
                <a className="sidenav-link">
                  <i className="fas fa-money-bill fa-fw me-3"></i>
                  <span data-mdb-slim="false">Sales</span>
                </a>
              </li>
              <li className="sidenav-item">
                <a className="sidenav-link">
                  <i className="fas fa-users fa-fw me-3"></i>
                  <span data-mdb-slim="false">Users</span>
                </a>
              </li>
            </ul>
          </nav>
        </header>
        {loading ? (
          <p>Loading . . .</p>
        ) : (
          <main style={{ position: "relative", top: "0px" }}>
            <MDBContainer
              style={{ position: "relative" }}
              fluid
              className="fixed-top mt-4 mb-1"
            >
              <Carousel
                className="h-100"
                responsive={carouselResponsive}
                swipeable={false}
                draggable={false}
                centerMode={false}
                //showDots={true}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                //autoPlay={this.props.deviceType !== "mobile" ? true : false}
                //deviceType={this.props.deviceType}

                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {data.workOfArts.map((w: any, index: any) => {
                  return (
                    <div key={index} style={{ marginTop: "0", marginBottom: "0" }}>
                      <h2 className="fw-bold text-center">{w.title}</h2>

                      {styleOrArtist === "artist" ? (
                        <h6 className="fw-bold text-center">
                          {artist} (Dates)
                        </h6>
                      ) : (
                        <h6 className="fw-bold text-center">
                          {w.creator[0].name} (Dates)
                        </h6>
                      )}

                      <div
                        style={{
                          display: "flex",
                          height: "100vh",
                          position: "relative",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        className="slider"
                        key={index}
                      >
                        <Image
                          alt="image"
                          //width={w.width}
                          //height={w.height}
                          sizes="100vw"
                          style={{
                            objectFit: "contain",
                            //display: "flex",
                            //margin: "auto",
                            //maxWidth: '100%',
                            //height: "auto",
                            //width: "auto",
                            //width: "100%",
                          }}
                          fill={true}
                          //src={imageUrl.url}
                          //src={`http://192.168.2.45/wikiartImages/${w.fileName}.jpg`}
                          src={`https://virtualmusem.s3.amazonaws.com/${w.fileName}.jpg`}
                          //src={`https://uploads3.wikiart.org/images/marc-chagall/untitled-1.jpg!Large.jpg`}
                          //src={`${w.url}`}
                        />
                      </div>
                      <h6 className="fw-bold text-center">Created in 1900</h6>
                      <h6 className="fw-bold text-center">
                        Example of [ ] Style(s)
                      </h6>
                    </div>
                  );
                })}
              </Carousel>
            </MDBContainer>
          </main>
        )}
        <MDBFooter
          style={{ position: "relative", marginTop: "25px" }}
          className="text-center"
        >
          <div className="text-center p-3" style={{ backgroundColor: "black" }}>
            <Link href="/">
              <WhiteLink>Back to Search page</WhiteLink>
            </Link>
            <br></br>© 2024 Wayne Mareci
          </div>
        </MDBFooter>
      </>
    );
  }
}
