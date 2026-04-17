// home.js
import {htm} from "../../bits/utility.js";

export default function Contact(tags) {
  return htm(tags,htm(tags,[
    htm(tags,"Name / Given Name","label"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined, "hr"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined, "input", {placeholder:"Ex: John Doe / Jane Doe",class:"form-input",type:"text",name:"givenName",required:true}),
    htm(tags,"Phone","label"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined, "hr"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined, "input",{placeholder:"1+ (000)-000-0000",class:"form-input",type:"tel",name:"phone",required:true}),
    htm(tags,"Email","label"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined, "hr"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined, "input",{placeholder:"Username@Website.Ext",class:"form-input",type:"email",name:"email",required:true}),
    htm(tags,"Message","label"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined, "hr"),
    htm(tags, undefined, "div", {class: "divider"}),
    htm(tags, undefined,"textarea",{placeholder:"I am interested in the services you offer...",class:"form-input",maxlength:"960",minlength:"0",name:"message",required:true}),
    htm(tags, undefined, "div", {class:"h-captcha","data-sitekey":"32fc2452-4eae-4de2-b216-ce1c8840d704","data-theme":"dark","data-size":"compact"}),
    htm(tags,"SUBMIT","button",{class:"pure-button pure-button-primary"}),
  ], "form", {action:"/go/contact-javy",method:"POST",type:"multipart/form-data",class: "pure-form pure-form-stacked pure-form-aligned"}),"div",{class:"full-width-form"});
}