import {htm} from "../../bits/utility.js";

export default function Home(tags) {
  const logoSvg = htm(tags,
    undefined,
    "img", {
      src: "/web/icons/Vector.svg",
      style: "width:8em;height:auto"
    }
  );

  const logoContainer = htm(tags, logoSvg, "div", {
    style: "display:flex;justify-content:center;padding:0.5em 0"
  });

  const hero = htm(tags, undefined, "img", {
    src: "./cdn/home/home.png",
    alt: "",
    class: "cover"
  });

  const card = htm(tags, [
    logoContainer,
    htm(tags, "Javy Good Times", "h1", {class: "video-title"}),
    htm(tags, undefined, "hr"),
    htm(tags, "Casual Dining \u00b7 Fresh Food \u00b7 Good Times", "p"),
    hero,
    htm(tags, "Our Mission", "h2"),
    htm(tags, undefined, "hr"),
    htm(tags, [
      "To be ",
      htm(tags, "always", "em"),
      " ",
      htm(tags, "fresh", "b"),
      ", ",
      htm(tags, "always", "em"),
      " ",
      htm(tags, "good", "b"),
      ", ",
      htm(tags, "always", "em"),
      " ",
      htm(tags, "friendly.", "b"),
      " ",
      htm(tags, undefined, "br"),
      htm(tags, undefined, "br"),
      "Javy Good Times ",
      htm(tags, "strives", "em"),
      " to allow our customers to ",
      htm(tags, "enjoy", "u"),
      " a ",
      htm(tags, "great", "b"),
      "tasting meal, in a ",
      htm(tags, "great", "b"),
      " atmosphere, at a ",
      htm(tags, "great", "b"),
      " price."
    ], "blockquote")
  ], "div", {class: "text-card"});

  return htm(tags, [card], "section", {id: "home"});
}
