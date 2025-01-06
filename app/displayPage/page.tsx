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
import { Integer } from "neo4j-driver";

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
      creator {
        name
        birthday
        deathday
      }
    }
  }
`;

const WORKS_BY_STYLE_QUERY = gql`
  query WorksByStyle($style: String!) {
    workOfArts(
      options: { sort: [{ creationDate: ASC }] }
      where: { style_SOME: { name: $style } }
    ) {
      title
      width
      height
      creator {
        name
        birthday
        deathday
      }
      creationDate
      fileName
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
  //console.log("displaying " + styleOrArtist + "; data is " + JSON.stringify(data));
  //console.log("data.workOfArts is " + JSON.stringify(data?.workOfArts));

  function yearToString(year: number): String {
    if (year <= 0) {
      return year.toString().replace("-", "").concat(" BC");
    } else if (year > 2024) {
      return "";
    } else return year.toString();
  }

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
        {loading ? (
          <p>Loading . . .</p>
        ) : (
          <main style={{ position: "relative", top: "0px" }}>
            <div
              style={{ position: "relative" }}
              /*fluid*/
              className="container fixed-top mt-4 mb-1"
            >
              <Carousel
                className="h-100"
                responsive={carouselResponsive}
                swipeable={true}
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
                removeArrowOnDeviceType={["mobile"]}
                //autoPlay={this.props.deviceType !== "mobile" ? true : false}
                //deviceType={this.props.deviceType}

                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
              >
                {data.workOfArts.map((w: any, index: any) => {
                  var bd = yearToString(
                    new Date(w.creator[0].birthday).getFullYear()
                  );
                  var dd = yearToString(
                    new Date(w.creator[0].deathday).getFullYear()
                  );
                  var cd = yearToString(new Date(w.creationDate).getFullYear());

                  return (
                    <div
                      key={index}
                      style={{ marginTop: "0", marginBottom: "0" }}
                    >
                      <h2 className="fw-bold text-center">{w.title}</h2>

                      <h6 className="fw-bold text-center">
                        {w.creationDate !== null ? (
                          <span>
                            Created in {cd} by {w.creator[0].name} ({bd} - {dd}){" "}
                          </span>
                        ) : (
                          <span>
                            Artist: {w.creator[0].name} ({bd} - {dd}) Creation
                            date unknown
                          </span>
                        )}
                      </h6>

                      <div
                        style={{
                          display: "flex",
                          height: "75vh",
                          position: "relative",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "10px",
                        }}
                        className="slider"
                        key={index}
                      >
                        <Image
                          unoptimized
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
                          src={`https://virtualmusem.s3.amazonaws.com/${w.fileName}.jpg`}
                        />
                      </div>
                      <h6 className="fw-bold text-center">
                        {styleOrArtist === "artist" ? (
                          w.style.length > 2 ? (
                            <span>
                              Styles:
                              {w.style.map((style: any, index: any) => {
                                if (index != w.style.length - 1)
                                  return (
                                    <span key={index}>&nbsp;{style.name},</span>
                                  );
                                else
                                  return (
                                    <span key={index}>
                                      &nbsp;and &nbsp;{style.name}
                                    </span>
                                  );
                              })}
                            </span>
                          ) : w.style.length > 1 ? (
                            <span>
                              Styles: {w.style[0].name} and {w.style[1].name}{" "}
                            </span>
                          ) : w.style.length === 1 ? (
                            <span>Style: {w.style[0].name}</span>
                          ) : (
                            <span></span>
                          )
                        ) : (
                          <span>Style: {style}</span>
                        )}
                      </h6>
                    </div>
                  );
                })}
              </Carousel>
            </div>
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
