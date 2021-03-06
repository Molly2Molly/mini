import 'normalize.css';
import './css/mobile.css';
import './js/mobile.js';
import './css/index.less';
import $ from 'jquery';
import _ from 'lodash';
import * as d3 from "d3";
import {runtimeLibrary} from '@observablehq/notebook-stdlib/src/index';
import './css/d3-style.css';

// import Arrow from '../images/arrow.svg';
// import Data from '../data/data.xml';
// import Data2 from '../data/data.json';
// import printMe from './print.js';

// import { cube,test } from './js/math.js';
// import _helloworld from "./svg/helloworld.svg";
// import _shapes from "./svg/shapes.svg";
// import _path from "./svg/path.svg";
// import _fillandstroke from "./svg/fillandstroke.svg";
// import _style from "./svg/style.svg";
// import _lineargradient from "./svg/lineargradient.svg";
// import _radialgradient from "./svg/radialgradient.svg";
// import _pattern from "./svg/pattern.svg";
// import _text from "./svg/text.svg";
// import _g from "./svg/g.svg";
// import _clipping from "./svg/clipping.svg";
// import _image from "./svg/image.svg";

if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

if (module.hot) {
	module.hot.accept('./js/print.js', function() {
	  console.log('Accepting the updated printMe module!');
	 //  document.body.removeChild(element);
	 //  element = component();
		// document.body.appendChild(element);
	})
}

// function component() {
//   var element = document.createElement('div');
//   var btn = document.createElement('button');

//   //element.innerHTML = _.join(['Hello', 'webpack'], ' ');
// 	element.innerHTML = [
// 	'Hello webpack 4!',
// 	'5 cubed is equal to ' + cube(5)
// 	].join('\n\n');
//   element.classList.add('hello');

// 	// var myIcon = new Image();
// 	// myIcon.src = Arrow;
// 	// element.appendChild(myIcon);

// 	// console.log(Data);
// 	// console.log(Data2);

// 	btn.innerHTML = 'Click me and check the console!';
// 	//btn.onclick = printMe;

// 	// Lazy Loading
// 	btn.onclick = e => import(/* webpackChunkName: "print" */ './js/print').then((module) => {
//      var print = module.default;
//      print();
//   });

// 	element.appendChild(btn);

// 	console.log(test());

//   return element;

// }



// let element = component();
// document.body.appendChild(element);

// async function getCountries() {
//   let countries = (await d3.tsv("https://unpkg.com/world-atlas@1/world/110m.tsv"))
//     .sort((a, b) => b.pop_est - a.pop_est) // Sort by descending estimated population.
//     .slice(0, 10) // Take the top ten.
//   return countries;
// }
// console.log(getCountries());



// let data = d3.csv("https://gist.githubusercontent.com/mbostock/ddc6d50c313ebe6edb45519f43358c6c/raw/c443ed14c34c5c1b544949a546dd9d0acd05bad3/temperatures.csv").then(function(result){
// 	console.log(result)
// });

// const library = runtimeLibrary();
// library.DOM.download(
//   new Blob([JSON.stringify({hello: "world"})], {type: "application/json"}),
//   "hello.json", // optional file name
//   "Click to Download" // optional button label
// )


// $('<object data="'+_helloworld+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_shapes+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_path+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_fillandstroke+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_style+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_lineargradient+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_radialgradient+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_pattern+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_text+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_g+'" type="image/svg+xml" />').appendTo($("body"));
// $('<object data="'+_image+'" type="image/svg+xml" />').appendTo($("body"));


// $(document).ready(function(){
// 	let _p = 40;
// 	setInterval(function(){
// 		_p = _p+1 > 50 ? 40 : _p+1;
// 		$(".shapes-path").attr("d",'M20,230 Q'+_p+',205 50,230 T90,230');
// 	},500);
// });


function printNest(nest, out, i) {
    if(i === undefined) i = 0;

    var tab = ""; for(var j = 0; j < i; ++j) tab += "&nbsp;";

    nest.forEach(function (e) {
        if (e.key)
            out += tab + e.key + "<br>";
        else
            out += tab + printObject(e) + "<br>";

        if (e.values)
            out = printNest(e.values, out, ++i);
        else
            return out;
    });

    return out;
}

function printObject(obj) {
    var s = "{";
    for (var f in obj) {
        s += f + ": " + obj[f] + ", ";
    }
    s += "}";
    return s;
}

String.prototype.firstUpperCase = function(){  
   return this.replace(/\b(\w)/g, function($1){  
       return $1.toUpperCase();  
   });  
} 

		var w = 1280, h = 800, r = 4.5,
        nodes = [],
        force = d3.forceSimulation()
                .velocityDecay(0.8)
                .alphaDecay(0)
                .force("collision", d3.forceCollide(r + 0.5).strength(1));

    var svg = d3.select("body")
        .append("svg")
            .attr("width", w)
            .attr("height", h);

    force.on("tick", function () {
        svg.selectAll("circle")
            .attr("cx", function (d) {return d.x;})
            .attr("cy", function (d) {return d.y;});
    });

    svg.on("mousemove", function () {
        var point = d3.mouse(this),
            node = {x: point[0], y: point[1]}; 

        svg.append("circle")
                .data([node])
            .attr("class", "node")
            .attr("cx", function (d) {return d.x;})
            .attr("cy", function (d) {return d.y;})
            .attr("r", 1e-6)
        .transition()
            .attr("r", r)
        .transition()
            .delay(7000)
            .attr("r", 1e-6)
            .on("end", function () {
                nodes.shift();
                force.nodes(nodes);
            })
            .remove();

        nodes.push(node); 
        force.nodes(nodes);
    });

    function noForce(){
        force.force("charge", null);
        force.force("x", null);
        force.force("y", null);
        force.restart();
    }
    window.noForce = noForce;

    function repulsion(){
        force.force("charge", d3.forceManyBody().strength(-10));
        force.force("x", null);
        force.force("y", null);
        force.restart();
    }
    window.repulsion = repulsion;

    function gravity(){
        force.force("charge", d3.forceManyBody().strength(1));
        force.force("x", null);
        force.force("y", null);
        force.restart();
    }
    window.gravity = gravity;

    function positioningWithGravity(){
        force.force("charge", d3.forceManyBody().strength(0.5));
        force.force("x", d3.forceX(w / 2));
        force.force("y", d3.forceY(h / 2));
        force.restart();
    }
    window.positioningWithGravity = positioningWithGravity;

    function positioningWithRepulsion(){
        force.force("charge", d3.forceManyBody().strength(-20));
        force.force("x", d3.forceX(w / 2));
        force.force("y", d3.forceY(h / 2));
        force.restart();
    }
    window.positioningWithRepulsion = positioningWithRepulsion;



