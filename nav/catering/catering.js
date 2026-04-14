import {htm} from "../../bits/utility.js";

export default function Catering(tags) {
  const items = ["Catering", "Pop-up events", "Bars", "Private events", "Weddings"];
  const listItems = items.map(label =>
    htm(tags, label, "li", {class: "service-item"})
  );

  const card = htm(tags, [
    htm(tags, "Services", "h2", {class: "services-heading"}),
    htm(tags, undefined, "hr"),
    htm(tags, listItems, "ul", {class: "services-list"})
  ], "div", {class: "text-card"});

  return htm(tags, [card], "section", {id: "catering"});
}
