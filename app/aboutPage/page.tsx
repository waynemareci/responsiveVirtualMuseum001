"use client";

//import "../styles/mdb.min.css";
import "../styles/about.css";
import "../styles/compiled-addons.min.css";
import styled from "styled-components";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { MDBFooter } from "mdb-react-ui-kit";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function ScrollToAnchor() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.location.hash) {
      const element = document.getElementById(window.location.hash.slice(1));
      if (element) {
        // Add small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [pathname]);

  return null;
}

const WhiteLink = styled.a`
  color: white;
  &:hover {
    color: white;
  }
`;

export default function AboutPage() {
  const form = useRef<HTMLFormElement>(null);
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.current) {
      form.current.user_name.value = form.current.user_name.value.split(" ")[0];
      emailjs
        .sendForm("contact_service", "contact_form", form.current, {
          publicKey: "aQGtHMIJbgq0vmL7L",
        })
        .then(
          () => {
            console.log(" emailjs SUCCESS!");
          },
          (error) => {
            console.log("emailjs FAILED...", error.text);
          }
        );
    } else console.log("form.current is null");
  };
  {
    return (
      <>
        <ScrollToAnchor />
        {/* Main Navigation */}
        <header>
          {/* Intro Section */}

          <div
            id="home"
            className="view jarallax"
            data-jarallax='{"speed": 0.2}'
            style={{
              // backgroundImage:
              //   "url(https://mdbootstrap.com/img/Photos/Others/img%20%2853%29.jpg)",
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center center",
            }}
          >
            <div className="mask rgba-stylish-light">
              <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="row pt-5 mt-3">
                  <div className="col-md-12 mb-3">
                    <div className="intro-info-content text-center">
                      <h1
                        className="display-3 white-text mb-5 wow fadeInDown"
                        data-wow-delay="0.3s"
                      >
                        ABOUT{" "}
                        <span className="white-text font-weight-bold">
                          EXPLORAGRAPH
                        </span>
                      </h1>

                      <h5
                        className="text-uppercase white-text mb-5 mt-1 font-weight-bold wow fadeInDown"
                        data-wow-delay="0.3s"
                      >
                        <div>
                          <span className="firstTagline">
                            advanced technology
                          </span>
                          <span className="secondTagline">
                            universal awareness
                          </span>
                          <span className="thirdTagline">unique solutions</span>
                        </div>
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {/* Main Navigation */}

        {/* Main Layout */}
        <main>
          <div className="container">
            <hr className="my-5" />

            <section
              id="about"
              className="text-center wow fadeIn"
              data-wow-delay="0.3s"
            >
              <h1 className="font-weight-bold text-center h1 my-5">
                Utilizing a graph database
                <br />
                to explore the history of the human mind
              </h1>

              <p className="text-center grey-text mx-auto w-responsive lead">
                Art is just the starting point. The graph makes it feasible to
                mine connections between people, objects, groups and concepts
                across time and space. Our mission is to make this type of
                exploration seamless&nbsp;and&nbsp;fruitful.
              </p>

              <h1 className="font-weight-bold text-center h1 my-5">
                Why a graph?
              </h1>

              <p className="text-center grey-text mb-5 mx-auto w-responsive lead">
                It&apos;s all about connections. The human mind thinks in
                patterns and connections. And the graph database is built for
                connections. It can help us uncover the most interesting
                stories: the stories that span centuries, continents and
                cultures. The stories that involve the greatest number of people
                and institutions, their thoughts and creations. The stories that
                make us think differently about art, history and&nbsp;ourselves.
              </p>
              {/* Grid row */}
              <div className="row mb-lg-4 text-center">
                {/* Grid column */}
                <div className="col mb-4">
                  <div className="mx-auto mb-md-0 mb-3">
                    <img
                      src="virtualMuseumGraph.png"
                      className="img-center"
                      alt="First sample avatar image"
                    />
                  </div>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}

              <p className="text-center grey-text mb-5 mx-auto w-responsive lead">
                The graph above illustrates how the data is organized in the
                virtual museum. Utilizing nodes that represent people, objects
                or concepts, and edges defining the relationships between those
                nodes, it describes a very simple use case, but it&apos;s all
                that&apos;s needed to fulfill queries like &quot;Find works of
                art created by a specified artist&quot; or &quot;Identify works
                of art that share a style&quot;.
              </p>
              <p className="text-center grey-text mb-5 mx-auto w-responsive lead">
                Associating properties like birth_date or creation_date or
                creation_place with the appropriate nodes allows for more
                complex queries like &quot;Find all works of art created by
                artists born in a specified year&quot; or &quot;Identify all
                works of art created in a specified place&quot; or &quot;Find
                all works of art created in a particular year&quot;.
              </p>
              <p className="text-center grey-text mb-5 mx-auto w-responsive lead">
                Ultimately, the intention is to create a digital universe that
                represents as much as possible of the entirety of the human
                experience. A more expansive graph might look something like the
                one below.
              </p>

              {/* Grid row */}
              <div className="row mb-lg-4 text-center">
                {/* Grid column */}
                <div className="col mb-4">
                  <div className="mx-auto mb-md-0 mb-3">
                    <img
                      src="Universe1.png"
                      className="img-center"
                      alt="First sample avatar image"
                    />
                  </div>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </section>

            <hr className="my-5" />

            <section
              id="technology"
              className="section wow fadeIn"
              data-wow-delay="0.3s"
            >
              <h1 className="font-weight-bold text-center h1 my-5">
                Architecture
              </h1>

              <p className="text-center grey-text mb-1 mx-auto w-responsive lead">
                The React frontend, built with Next.js, sends GraphQL queries to
                the backend API. Next.js API routes host the GraphQL server
                using GraphQL-Yoga, which processes incoming queries. The
                GraphQL server interacts with Neo4j using the Neo4j GraphQL
                Library to resolve queries and mutations. For image uploads, the
                frontend retrieves files directly from AWS S3 using pre-signed
                URLs. Neo4j stores data about images. The entire application is
                deployed on Vercel, which hosts both the frontend and backend.
              </p>
              {/* Grid row */}
              <div className="row mb-lg-4 text-center">
                {/* Grid column */}
                <div className="col mb-4">
                  <div className="mx-auto mb-md-0 mb-3">
                    <img
                      src="VirtualMuseum Architecture.png"
                      className="img-center"
                      alt="Virtualmuseum Architecture"
                    />
                  </div>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </section>

            <hr className="my-5" />

            {/* Section: Team v.3 */}

            <section
              id="team"
              className="section team-section mt-4 pb-4 wow fadeIn"
              data-wow-delay="0.3s"
            >
              <h2 className="font-weight-bold text-center h1 my-5">
                Presented by
              </h2>
              {/* Grid row */}
              <div className="row mb-lg-4 text-center text-md-left">
                {/* Grid column */}
                <div className="col-lg-12 col-md-12 mb-4">
                  <div className="col-md-6 float-left">
                    <div className="avatar mx-auto mb-md-0 mb-3">
                      <img
                        src="WayneByCraig.jpeg"
                        className="z-depth-1"
                        alt="Wayne Mareci portrait by Craig Bagno"
                      />
                    </div>
                  </div>

                  <div className="col-md-6 float-right bioSlug">
                    <h4>
                      <strong>Wayne Mareci</strong>
                    </h4>
                    <h6 className="font-weight-bold grey-text mb-4">
                      Chief Exploration Officer
                    </h6>
                    <div>
                      <ul className="grey-text">
                        <li>MIT education: Computer Science and Engineering</li>
                        <li>
                          Enterprise database software: Programmer, Manager,
                          Sales Engineer
                        </li>
                        <li>
                          Art: Internship and volunteer experience at the
                          Metropolitan Museum in New York
                        </li>
                        <li>
                          History: Tracking people, events, objects, concepts
                        </li>
                        <li>
                          Technology: Organizing and optimizing access to data
                        </li>
                        <li>
                          Finance: Strategic resource acquisition and allocation
                        </li>
                        <li>
                          Insight: Utilizing technology and knowledge of the
                          world to assist in making critical decisions
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                {/* Grid column */}
              </div>
              {/* Grid row */}
            </section>
            {/* Section: Team v.3 */}

            <section
              id="contact"
              className="section pb-5 wow fadeIn"
              data-wow-delay="0.3s"
            >
              {/* Section heading */}
              <h2 className="font-weight-bold text-center h1 my-5">
                Contact us
              </h2>
              {/* Section description */}
              <p className="text-center grey-text mb-5 mx-auto w-responsive">
                It&apos;s very simple.
              </p>

              <div className="row">
                {/* Grid column */}
                <div className="col-md-8 col-xl-9">
                  <form ref={form} onSubmit={sendEmail}>
                    {/* Grid row */}
                    <div className="row">
                      {/* Grid column */}
                      <div className="col-md-6">
                        <div className="md-form">
                          <label htmlFor="contact-name" className="">
                            Your name
                          </label>
                          <input
                            type="text"
                            name="user_name"
                            id="contact-name"
                            className="form-control"
                          />
                        </div>
                      </div>
                      {/* Grid column */}

                      {/* Grid column */}
                      <div className="col-md-6">
                        <div className="md-form">
                          <label htmlFor="contact-email" className="">
                            Your email
                          </label>
                          <input
                            type="text"
                            id="contact-email"
                            className="form-control"
                            name="user_email"
                          />
                        </div>
                      </div>
                      {/* Grid column */}
                    </div>
                    {/* Grid row */}
                    <div className="row mb-4">
                      {/* Grid column */}
                      <div className="col-md-12">
                        <div className="md-form">
                          <label htmlFor="contact-message">Your message</label>
                          <textarea
                            name="message"
                            id="contact-message"
                            className="md-textarea form-control"
                            rows={3}
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    {/* Grid row */}

                    <div className="text-center text-md-left mb-4">
                      <input
                        type="submit"
                        value="Send"
                        className="btn btn-light-blue"
                      />
                      {/*<a className="btn btn-light-blue">Send</a>*/}
                    </div>
                  </form>
                </div>
                {/* Grid column */}

                {/* Grid column */}
                <div className="col-md-4 col-xl-3">
                  <ul className="contact-icons text-center list-unstyled">
                    <li>
                      <i className="fas fa-map-marker fa-2x"></i>
                      <p>New York, NY 10016, USA</p>
                    </li>

                    <li>
                      <i className="fas fa-phone fa-2x"></i>
                      <p>+1 212 448 1045</p>
                    </li>

                    <li>
                      <i className="fas fa-envelope fa-2x"></i>
                      <p>wayne@mareci.com</p>
                    </li>
                  </ul>
                </div>
                {/* Grid column */}
              </div>
            </section>
            {/* Section: Contact v.2 */}
          </div>
        </main>
        {/* Main Layout */}
        <MDBFooter
          style={{
            position: "relative",
            marginBottom: "5px",
            marginTop: "5px",
          }}
          className="text-center"
        >
          <div
            className="text-center p-3"
            style={{ color: "white", backgroundColor: "black" }}
          >
            <WhiteLink title="Virtual Museum Search Page" href="/">
              Back to Search page
            </WhiteLink>
            <br></br>© {new Date().getFullYear()} Wayne Mareci
          </div>
        </MDBFooter>
      </>
    );
  }
}
