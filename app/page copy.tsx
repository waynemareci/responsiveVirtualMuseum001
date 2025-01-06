"use client";

import "./styles/mdb.min.css";
import "./styles/snippet.css";
import "./styles/wheel.css";

import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

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
  MDBContainer,
  MDBFooter,
  MDBRow,
  MDBIcon,
  MDBCol,
  MDBNavbar,
  MDBTextArea,
} from "mdb-react-ui-kit";
import Select from "react-select";
import Link from "next/link";

import Image from "next/image";
import brandIcon from "../public/exploragraph3.png";
import { Montserrat } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

//import dynamic from "next/dynamic";
/*
const Wheel = dynamic(
  () => import("react-custom-roulette").then((mod) => mod.Wheel),
  { ssr: false }
);
*/

import Globe from "./globe";
import SpinWheel from "./SpinWheel";

import { gql, useQuery } from "@apollo/client";

/*
interface ArrayObjectSelectState {
  selectedInstrument: Instrument | null;
}
*/

interface Style {
  name: string;
}

interface Artist {
  name: string;
}

const segments = [
  { segmentText: " ", segColor: "red" },
  { segmentText: " ", segColor: "#FBC31C" },
  { segmentText: " ", segColor: "lime" },
  { segmentText: " ", segColor: "green" },
  { segmentText: " ", segColor: "#14BED4" },
  { segmentText: " ", segColor: "blue" },
  { segmentText: " ", segColor: "#7249BA" },
  { segmentText: " ", segColor: "green" },
  // Add more segments as needed
];

const GET_ARTISTS_QUERY = gql`
  query AllArtists {
    artists {
      name
    }
  }
`;

const GET_STYLES_QUERY = gql`
  query AllStyles {
    styles(options: { sort: { name: ASC } }) {
      name
    }
  }
`;

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");

  var artistOptionsForRandom: Artist[] = [];
  var styleOptionsForRandom: Style[] = [];

  function RandomChoice() {
    var randomBoolean = Math.random() < 0.5;
    if (randomBoolean) {
      const randomStyle = Math.floor(
        Math.random() * (styleOptionsForRandom.length + 1)
      );
      console.log(
        "I've got " +
          styleOptionsForRandom.length +
          " styles; choosing number " +
          randomStyle
      );
      router.push(
        `/displayPage?style=${styleOptionsForRandom[randomStyle].name}`
      );
    } else {
      const randomArtist = Math.floor(
        Math.random() * (artistOptionsForRandom.length + 1)
      );
      console.log(
        "I've got " +
          artistOptionsForRandom.length +
          " artists; choosong number " +
          randomArtist
      );
      router.push(
        `/displayPage?artist=${artistOptionsForRandom[randomArtist].name}`
      );
    }
  }

  function ArtistSelect() {
    let { loading, error, data, refetch } = useQuery(GET_ARTISTS_QUERY);
    if (loading) return "Loading Artists data ...";
    if (error) return `Artists useQuery error: ${error.message}`;
    const artistOptions = data.artists.map((artist: Artist) => ({
      value: artist.name,
      label: artist.name,
    }));
    artistOptionsForRandom = data.artists;
    return (
      <Select
        name={"artistSelect"}
        placeholder={"Search..."}
        options={artistOptions}
        unstyled
        isSearchable={true}
        onChange={(choice: any) =>
          router.push(`/displayPage?artist=${choice.value}`)
        }
      />
    );
  }

  function StyleSelect() {
    let { loading, error, data, refetch } = useQuery(GET_STYLES_QUERY);
    if (loading) return "Loading Styles data ...";
    if (error) return `Styles useQuery error: ${error.message}`;
    const styleOptions = data.styles.map((style: Style) => ({
      value: style.name,
      label: style.name,
    }));
    styleOptionsForRandom = data.styles;
    //console.log("stringified styleSoptions:" + JSON.stringify(styleOptions));

    return (
      <Select
        name={"sytleSelect"}
        placeholder={"Search..."}
        unstyled
        options={styleOptions}
        isSearchable={true}
        onChange={(choice: any) =>
          router.push(`/displayPage?style=${choice.value}`)
        }
      ></Select>
    );
  }

  const router = useRouter();
  return (
    <>
  
  <header>
        <MDBContainer className="fixed-top mt-3" style={{ zIndex: -1 }}>
          <MDBRow>
            <MDBCol>
              <h2 className="fw-bold text-center">
                Use a Graph Database to
                <br />
                Explore The World&apos;s Visual Art
              </h2>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </header>

      <main /*style={{ position: "relative", left: "75px" }}*/>
        {/* Sidenav */}

        <MDBNavbar
          id="sidenav-4"
          className="d-none d-sm-block sidenav bg-glass opacity-100"
          data-mdb-color="light"
          data-mdb-mode="side"
          data-mdb-slim="true"
          data-mdb-slim-collapsed="true"
          data-mdb-content="#slim-content"
          style={{
            top: "128px",
            width: "70px",
            height: "100vh",
            position: "fixed",
            transition: "0.3s linear",
            transform: "translateX(0%)",
            marginRight: "30px",
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
        </MDBNavbar>

        <MDBContainer className="py-4 mt-20">
          <div className="row g-0">
            <div className="col-lg-6 col-md-12 mb-4">
              {/* Card */}
              <div className="bg-glass shadow-4-strong h-75 mt-6">
                {/* Card header */}

                <div className="p-4">
                  <div className="row align-items-center">
                    <div>
                      <h3 className="text-center mb-2">Time and Place</h3>
                      <h6 className="text-center mb-2">(under construction)</h6>
                    </div>
                  </div>
                </div>

                <Globe />
              </div>
              {/* Card */}
            </div>

            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="row g-0 mb-5">
                {/* Card */}
                <div
                  style={{
                    borderColor: "#26395A",
                    borderStyle: "none none none solid",
                    borderWidth: "25px",
                  }}
                  className="bg-glass shadow-4-strong mt-4"
                >
                  {/* Card header */}
                  <div className="p-4 pb-0">
                    <div className="row align-items-center">
                      <div className="mb-4 mb-md-0">
                        <h3 className="text-center mb-2">Pick an Artist</h3>
                      </div>
                    </div>
                  </div>
                  {/* Card header */}

                  {/* Card body */}
                  <div style={{ height: "100px" }} className="p-4 pb-0">
                    <ArtistSelect />
                  </div>
                  {/* Card body */}
                </div>
                {/* Card */}
              </div>
              <div className="row g-0 mb-5">
                {/* Card */}
                <div
                  style={{
                    borderColor: "#26395A",
                    borderStyle: "none none none solid",
                    borderWidth: "25px",
                  }}
                  className="bg-glass shadow-4-strong"
                >
                  {/* Card header */}

                  <div className="p-4 pb-0">
                    <div className="row align-items-center">
                      <div className="mb-4 mb-md-0">
                        <h3 className="text-center mb-2">Choose a Style</h3>
                      </div>
                    </div>
                  </div>

                  {/* Card header */}

                  {/* Card body */}
                  <div style={{ height: "100px" }} className="p-4 pb-0">
                    <StyleSelect />
                  </div>
                  {/* Card body */}
                </div>
                {/* Card */}
              </div>
              <div className="row g-0 mb-5">
                {/* Card */}
                <div
                  style={{
                    borderColor: "#26395A",
                    borderStyle: "none none none solid",
                    borderWidth: "25px",
                  }}
                  className="bg-glass shadow-4-strong"
                >
                  {/* Card header */}
                  <div className="p-4">
                    <div className="row align-items-center">
                      <div className="mb-4 mb-md-0">
                        <h3 className="text-center mb-1">Spin the Wheel</h3>
                        <h6 className="text-center mb-2">
                          for a random discovery!
                        </h6>
                      </div>
                    </div>
                  </div>
                  {/* Card header */}

                  {/* Card body */}
                  <div
                    style={{
                      marginLeft: "40%",
                      marginTop: "-10px",
                      marginBottom: "40px",
                    }}
                  >
                    <SpinWheel
                      segments={segments}
                      onFinished={() => {
                        //router.push("/displayPage");
                        RandomChoice();
                      }}
                    />
                  </div>
                  {/* Card body */}
                </div>
                {/* Card */}
              </div>
            </div>
          </div>
        </MDBContainer>
      </main>
      <MDBFooter
        style={{ position: "relative", marginTop: "25px" }}
        className="text-center"
      >
        <MDBContainer className="py-4">
          <MDBRow>
            <MDBCol size="1">
              <Image
                style={{ marginBottom: "0px" }}
                unoptimized
                alt="brandIcon"
                width={50}
                height={50}
                src={brandIcon}
              />
            </MDBCol>
            <MDBCol size="5">
              <h1
                style={{ fontWeight: "bolder" }}
                className={montserrat.className}
              >
                exploragraph
              </h1>
            </MDBCol>
            <MDBCol size="5">
              <MDBBtn
                href="#!"
                style={{ backgroundColor: "#3b5998" }}
                floating
                className="m-2"
              >
                <MDBIcon fab size="2x" icon="facebook-f" />
              </MDBBtn>
              <MDBBtn
                href="#!"
                style={{ backgroundColor: "black" }}
                floating
                className="m-2"
              >
                <span className="[&>svg]:h-10 [&>svg]:w-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="-80 0 500 512"
                  >
                    <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
                  </svg>
                </span>
              </MDBBtn>
              <MDBBtn
                href="#!"
                style={{ backgroundColor: "#ac2bac" }}
                floating
                className="m-2"
              >
                <MDBIcon fab size="2x" icon="instagram" />
              </MDBBtn>
              <MDBBtn
                href="#!"
                style={{ backgroundColor: "#0082ca" }}
                floating
                className="m-2"
              >
                <MDBIcon fab size="2x" icon="linkedin-in" />
              </MDBBtn>
              <MDBBtn
                href="#!"
                style={{ backgroundColor: "#222222" }}
                floating
                className="m-2"
              >
                <MDBIcon fab size="2x" icon="github" />
              </MDBBtn>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <div className="text-center p-3" style={{ backgroundColor: "black" }}>
          © 2024 Wayne Mareci
        </div>
      </MDBFooter>
    </>
  );
}
