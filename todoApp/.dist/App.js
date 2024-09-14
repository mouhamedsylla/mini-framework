
import { mountDOM } from "../../_lib/core/vdom/vdom.js";
            
const appRoot = document.getElementById('App'); 
mountDOM({
  "tag": "div",
  "props": {},
  "children": [
    {
      "tag": "p",
      "props": {},
      "children": [
        {
          "value": "Logged in as John Doe",
          "type": "text"
        }
      ],
      "type": "element"
    },
    {
      "tag": "ul",
      "props": {},
      "children": [
        {
          "tag": "li",
          "props": {},
          "children": [
            {
              "value": "item1",
              "type": "text"
            }
          ],
          "type": "element"
        },
        {
          "tag": "li",
          "props": {},
          "children": [
            {
              "value": "item2",
              "type": "text"
            }
          ],
          "type": "element"
        },
        {
          "tag": "li",
          "props": {},
          "children": [
            {
              "value": "item3",
              "type": "text"
            }
          ],
          "type": "element"
        }
      ],
      "type": "element"
    },
    {
      "tag": "p",
      "props": {},
      "children": [
        {
          "value": "Hello, John Doe",
          "type": "text"
        }
      ],
      "type": "element"
    },
    {
      "tag": "li",
      "props": {},
      "children": [
        {
          "value": "1",
          "type": "text"
        }
      ],
      "type": "element"
    },
    {
      "tag": "li",
      "props": {},
      "children": [
        {
          "value": "2",
          "type": "text"
        }
      ],
      "type": "element"
    },
    {
      "tag": "li",
      "props": {},
      "children": [
        {
          "value": "3",
          "type": "text"
        }
      ],
      "type": "element"
    },
    {
      "tag": "p",
      "props": {},
      "children": [
        {
          "value": "John Doe",
          "type": "text"
        }
      ],
      "type": "element"
    }
  ],
  "type": "element"
}, appRoot);
            