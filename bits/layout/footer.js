import {htm} from "../utility.js";

export default function Footer(tags) {
  // Left column: Phone + Email + Copyright
  const leftContent = htm(
    tags,
    [
      htm(tags, "Phone", "span", {class: "footer-heading"}),
      htm(tags, "+1 (832)-489-1554", "a", {href: "tel:+18324891554"}),
      htm(tags, "Email", "span", {class: "footer-heading"}),
      htm(tags, ["JavyGoodTimes",htm(tags,undefined,"br"),"@Gmail.com"], "a", {href: "mailto:JavyGoodTimes@Gmail.com?subject=Catering%20Inquiry&body=Hello%2C%20I%20am%20interested%20in%20catering."}),
      // Copyright section
      htm(
        tags,
        htm(
          tags,
          [
            htm(tags, "Copyright (C) Ducote Industry", "span"),
          ],
          "span",
          {class: "footer-copyright-text"}
        ),
        "div",
        {class: "footer-copyright"}
      )
    ],
    "div",
    {class: "footer-content"}
  );

  // Center column: Vector.svg brand logo
  const centerLogo = htm(
    tags,
    htm(tags, undefined, "img", {
      src: "/web/icons/javylogocolor.png",
      class: "footer-img footer-img-center",
      alt: "Javy Good Times"
    }),
    "div",
    {class: "footer-img-container footer-img-center-container"}
  );

  // Right column: placeholder image
  const rightPlaceholder = htm(
    tags,
    htm(tags, undefined, "img", {
      src: "/web/icons/QR_Code.svg",
      class: "footer-img",
      alt: ""
    }),
    "div",
    {class: "footer-img-container footer-img-right-container"}
  );

  return htm(
    tags,
    htm(
      tags,
      htm(
        tags,
        [leftContent, centerLogo, rightPlaceholder],
        "div",
        {class: "footer-main"}
      ),
      "div",
      {class: "wrapper", style: "width: 100%; height: auto; position: relative;"}
    ),
    "div",
    // Keep the fixed positioning from the previous step
    {style: "position: fixed; bottom: 0; left: 0; width: 100%; z-index: 100; pointer-events: none;"}
  );
}
