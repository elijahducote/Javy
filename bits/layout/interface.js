import van from "vanjs-core";
import {Instagram, Mail} from "vanjs-feather";
import {htm,capitalize} from "../utility.js";
import {siteIndex} from "../../sitemap.json";
import {collectPaths} from "../../lib/utility.js";

function moveItem(arr, fromIndex) {
  const toIndex = Math.floor(arr.length/2);
  // 1. Create a copy to avoid side-effects
  const newArr = [...arr]; 
  
  // 2. Remove the item from the 'fromIndex'
  // .splice returns an array of removed items, so we take the first [0]
  const [movedItem] = newArr.splice(fromIndex, 1);
  
  // 3. Insert the item at the 'toIndex'
  newArr.splice(toIndex, 0, movedItem);
  
  return newArr;
}

export default function Interface (tags,tab,nomer) {
  const svgs = {
    home: htm(tags,
      htm(tags,
        undefined,
        "path",
        {
          d: "M44.75 20.91 25.93 2.1a4.17 4.17 0 0 0-5.89 0L1.22 20.91A4.14 4.14 0 0 0 4.17 28h2.4v13.46c0 2.01 1.6 3.64 3.62 3.64h3.2V32.93c0-.93.77-1.65 1.7-1.65h6.22c.93 0 1.67.72 1.67 1.65V45.1h12.8a3.6 3.6 0 0 0 3.62-3.64V28h2.4a4.15 4.15 0 0 0 2.95-7.09"
      }
      ),
      "svg",
      {
        "xmlns": "https://www.w3.org/2000/svg",
        "xml:space": "preserve",
        "width": "800",
        "height": "800",
        "viewBox": "0 0 45.97 45.97",
        "fill": "#0FF"
      }
    ),
    shop: htm(tags, 
       htm(tags, undefined, "path", {d:"M7 0H6L0 3v6l4-1v12h12V8l4 1V3l-6-3h-1a3 3 0 0 1-6 0z"})
    , "svg", {fill:"#0FF",width:"800",height:"800","viewBox":"0 0 20 20",xmlns:"http://www.w3.org/2000/svg",class:"nav-icon"}),
    contact: htm(tags,
          htm(tags,[
            htm(tags, undefined, "path", {d: "M235.7 290.3c5 5 13 5 18 0l195.1-195a12.8 12.8 0 0 0-9-21.9H49.6a12.8 12.8 0 0 0-9 21.9z"}),
          htm(tags, undefined, "path", {d: "M484.5 119.3a8 8 0 0 0-8.6 1.8L274 323a41 41 0 0 1-58.3 0L13.6 121A7.9 7.9 0 0 0 0 126.7v256.7c0 18 14.6 32.6 32.6 32.6h424.2c18 0 32.6-14.6 32.6-32.6V126.6c0-3.1-2-6-4.9-7.3"})
          ],"g",{fill: "#0FF"})
          , "svg", {xmlns: "http://www.w3.org/2000/svg", "xml:space": "preserve", width: "800", height: "800", viewBox: "0 0 489.4 489.4",class:"nav-icon"}),
    bio: htm(tags,
          [
            htm(tags, undefined, "circle", {cx: "12", cy: "7", r: "5"}),
            htm(tags, undefined, "path", {d: "M12 14c-5.5 0-10 2.7-10 6v2h20v-2c0-3.3-4.5-6-10-6z"})
          ], "svg", {fill: "#0FF", xmlns: "http://www.w3.org/2000/svg", width: "800", height: "800", viewBox: "0 0 24 24", class: "nav-icon"}),
    catering: htm(tags,
          htm(tags, [
            htm(tags, [
              htm(tags, undefined, "path", {d: "M15.471,8.076 L0.49,8.076 C0.219,8.076 0.001,8.283 0.001,8.537 C0.001,8.793 0.22,9 0.49,9 L15.471,9 C15.742,9 15.961,8.793 15.961,8.537 C15.961,8.283 15.741,8.076 15.471,8.076 L15.471,8.076 Z"}),
              htm(tags, undefined, "path", {d: "M7.987,0.201 C4.148,0.201 1.037,3.209 1.037,6.919 L14.937,6.919 C14.938,3.209 11.825,0.201 7.987,0.201 L7.987,0.201 Z"})
            ], "g", {transform: "translate(0,1)"}),
            htm(tags, undefined, "rect", {x: "7", y: "0", width: "1.969", height: "1.969"})
          ], "g", {transform: "translate(1,3)", fill: "#0FF"})
          , "svg", {xmlns: "http://www.w3.org/2000/svg", width: "800", height: "800", viewBox: "0 -0.5 17 17", class: "nav-icon"})
  },
  paths = collectPaths(siteIndex),
  nth = paths.length;
  let itR8 = nth,
  cur,
  newpaths;
  for (;itR8;--itR8) {
    cur = nth - itR8;
    if (nomer === paths[cur]) {
      newpaths = moveItem(paths,cur);
      break;
    }
  }

  
  const navItems = [];
  let navI = newpaths.length;
  for (;navI;--navI) {
    cur = newpaths.length - navI;
    navItems.push(
      htm(tags, [svgs[newpaths[cur]], htm(tags, capitalize(newpaths[cur]), "h2")], "div", {"data-link": newpaths[cur]})
    );
  }
  // Social links — vanjs-feather icons (shared across all pages)
  const igGradient = htm(tags, [
    htm(tags, undefined, "stop", {offset: "0%",   style: "stop-color:#405de6;"}),
    htm(tags, undefined, "stop", {offset: "20%",  style: "stop-color:#5851db;"}),
    htm(tags, undefined, "stop", {offset: "40%",  style: "stop-color:#833ab4;"}),
    htm(tags, undefined, "stop", {offset: "60%",  style: "stop-color:#c13584;"}),
    htm(tags, undefined, "stop", {offset: "80%",  style: "stop-color:#e1306c;"}),
    htm(tags, undefined, "stop", {offset: "100%", style: "stop-color:#fd1d1d;"})
  ], "linearGradient", {
    id: "gradi-ig",
    "data-gradient-angle": "45",
    x1: "14.64%",
    y1: "85.36%",
    x2: "85.36%",
    y2: "14.64%"
  });

  const mailGradient = htm(tags, [
    htm(tags, undefined, "stop", {offset: "0%",   style: "stop-color:#00c6ff;"}),
    htm(tags, undefined, "stop", {offset: "100%", style: "stop-color:#0072ff;"})
  ], "linearGradient", {
    id: "gradi-mail",
    x1: "0%",
    y1: "0%",
    x2: "100%",
    y2: "100%"
  });

  const gradientSvg = htm(tags,
    htm(tags, [igGradient, mailGradient], "defs"),
    "svg",
    {style: "visibility:hidden;opacity:0;width:0;height:0;border:none;margin:0;padding:0"}
  );

  const igSvg = Instagram({class: "icon", id: "instagram", "aria-hidden": "true"});
  igSvg.children[0].setAttribute("stroke", "none");

  const igAnchor = htm(tags, igSvg, "a", {
    class: "newmedia social-instagram",
    href: "HTTPS://INSTAGRAM.COM/JAVYGOODTIMES",
    target: "_blank",
    rel: "noopener noreferrer",
    "aria-label": "Instagram"
  });

  const mailSvg = Mail({class: "icon", id: "mail", "aria-hidden": "true"});

  const mailAnchor = htm(tags, mailSvg, "a", {
    class: "newmedia social-email",
    href: "mailto:JavyGoodTimes@Gmail.com?subject=Catering%20Inquiry&body=Hello%2C%20I%20am%20interested%20in%20catering.",
    "aria-label": "Email"
  });

  const socialLinks = htm(tags, [igAnchor, mailAnchor], "div", {class: "social-links"});

  const tabMenu = htm(tags, navItems, "div", {
      class: "wrapper topnav",
      style: "margin-bottom:0;margin-top:0"
    }),

  mainContent = htm(tags,tab,"div",{class: "wrapper tab-list", style: "margin-bottom:0"}),

  container = htm(tags,undefined,"div",{class: "container", style: "margin-bottom:0;margin-top:0"});

  van.add(container, tabMenu);
  van.add(container, gradientSvg);
  van.add(container, socialLinks);
  van.add(container, mainContent);

  return container;
};