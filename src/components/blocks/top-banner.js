import React, {useState, useEffect} from 'react';
import TopBannerSVG from "./svg/top-banner.svg";
import ArrowToDown from "./svg/arrow_to_down.svg";
import "./style/departure-board.less"

const TopBanner = () => {

  useEffect(() => {
    //initBanner();
  });

//   const initBanner = () => {
//     let cities = [
//       "NEW DENSU",
//       "NEW VIEW",
//       "OLD MARKETING",
//       "NEW AD",
//     ].map(d => d.padEnd(14));
//
//     d3.shuffle(cities);
//
//     let cycle = {};
//
//     for (let i = 65; i < 90; i++) {
//       cycle[String.fromCharCode(i)] = String.fromCharCode(i + 1);
//     }
//
//     cycle["Z"] = " ";
//     cycle[" "] = "A";
//
//     let rows = d3.select(".banner-container")
//       .selectAll(".row")
//       .data(cities.splice(0, 3))
//       .enter()
//       .append("div")
//       .attr("class", "row")
//       .style("top", (d, i) => i * 144 + "px");
// console.log(rows);
//     let flaps = rows.selectAll("div")
//       .data(city => city.split(""))
//       .enter()
//       .append("div")
//       .attr("class", "flap")
//       .style("left", (d, i) => i * 118 + "px");
//
//     ["next", "prev", "back", "front"].forEach(d => {
//       if (d === "front") {
//         flaps.append("div")
//           .attr("class", "divider");
//       }
//
//       flaps.append("div")
//         .attr("class", "half " + d)
//         .append("span")
//         .text(letter => letter);
//     });
//
//     cities.push(...rows.data());
//     flip();
//
//     function flip() {
//       d3.timeout(() => {
//         let q = d3.queue();
//         rows.each(function() {
//           d3.select(this)
//             .selectAll(".flap")
//             .each(function(fromLetter, i) {
//               let toLetter = cities[0][i],
//                 flap = d3.select(this);
//               if (fromLetter !== toLetter) {
//                 q.defer(flipLetter, flap.datum(toLetter), fromLetter, toLetter);
//               }
//             });
//           cities.push(cities.shift());
//         });
//         q.awaitAll(function(err) {
//           if (err) {
//             throw err;
//           }
//           flip();
//         });
//       }, 500);
//     }
//
//     function flipLetter(flap, fromLetter, toLetter, cb) {
//       let current = fromLetter,
//         next = cycle[fromLetter],
//         prevFlaps = flap.selectAll(".prev span, .front span"),
//         nextFlaps = flap.selectAll(".back span, .next span"),
//         fast;
//
//       flap.select(".front").on("animationiteration", function() {
//         if (next === toLetter) {
//           flap.classed("animated fast", false)
//             .selectAll("span")
//             .text(toLetter);
//           return cb();
//         }
//
//         if (!fast) {
//           fast = flap.classed("fast", true);
//         }
//
//         prevFlaps.text(next);
//
//         current = next;
//         next = cycle[next];
//
//         setTimeout(function() {
//           nextFlaps.text(next);
//         }, 0);
//       });
//
//       flap.classed("animated", true);
//
//       nextFlaps.text(next);
//     }
//   }

  const scrollToDown = () => {
    window.scrollTo(0, window.innerHeight);
  }

  return (
    <div className="banner-block">
      {/*<div className="banner-block__title">Новая конференция dentsu</div>*/}
      {/*<img className="banner-block__svg-banner" src={TopBannerSVG}/>*/}
      <div style={{width: '460px', height: '220px', border: '0px solid red'}}>
        <iframe src="https://brandnewconference.ru/images/daprture-board.html" height="100%" width="100%"/>
      </div>
      <img className="arrow-to-down" src={ArrowToDown} onClick={scrollToDown}/>
    </div>
  );
};

export default TopBanner;