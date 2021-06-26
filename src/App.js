import React, { useEffect } from "react";
import "./App.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
function App() {
	useEffect(() => {
		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".p1",
					scrub: true,
					pin: ".m1, .p1",
					start: "center center",
					toggleActions: "play reverse play reverse",
				},
			})
			.to(".p1", { opacity: 1 })
			.to(".p1", { opacity: 0 });

		gsap.set(".p2", { opacity: 0 });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".p2",
					scrub: true,
					pin: ".m2, .p2",
					start: "center center",
					toggleActions: "play reverse play reverse",
				},
			})
			.to(".p2", { opacity: 1 })
			.to(".p2", { opacity: 0 });

		gsap.set(".p3", { opacity: 0 });

		gsap
			.timeline({
				scrollTrigger: {
					trigger: ".p3",
					scrub: true,
					pin: ".m3, .p3",
					start: "center center",
					toggleActions: "play reverse play reverse",
				},
			})
			.to(".p3", { opacity: 1 })
			.to(".p3", { opacity: 0 });

		const areas = document.querySelectorAll("main");
		const highlighted = document.querySelector(".highlight");
		const sideNavigation = document.querySelector(".left");
		const options = {
			threshold: 0.7,
		};
		const checkObserver = (entries) => {
			entries.forEach((entry) => {
				const className = entry.target.className;
				const current = document.querySelector(`[data-link=${className}]`);
				const coords = current.getBoundingClientRect();
				const direction = {
					height: coords.height,
					width: coords.width,
					top: coords.top,
					left: coords.left,
				};
				if (entry.isIntersecting) {
					highlighted.style.setProperty("left", `${direction.left}px`);
					highlighted.style.setProperty("top", `${direction.top}px`);
					highlighted.style.setProperty("width", `${direction.width}px`);
					highlighted.style.setProperty("height", `${direction.height}px`);
				}
			});
		};

		let observer = new IntersectionObserver(checkObserver, options);

		areas.forEach((area) => {
			observer.observe(area);
		});

		function checkPosition() {
			let windowY = window.scrollY;
			if (windowY < 200 || windowY > window.innerHeight * 4.8) {
				sideNavigation.classList.add("is-hidden");
				sideNavigation.classList.remove("is-visible");
			} else {
				sideNavigation.classList.add("is-visible");
				sideNavigation.classList.remove("is-hidden");
			}
		}

		window.addEventListener("scroll", checkPosition);
	}, []);
	return (
		<>
			<div className="left">
				<ul>
					<li>
						<a href={"/"} data-link="m1">
							haider
						</a>
					</li>
					<li>
						<a href={"/"} data-link="m2">
							haider
						</a>
					</li>
					<li>
						<a href={"/"} data-link="m3">
							haider
						</a>
					</li>
					<div className="highlight"></div>
				</ul>
			</div>
			<div className="right">
				<div className="image"></div>
				<div className="side">
					<main className="m1">
						<p className="p1">
							Five Little Ducks Went Swimming One Day, Over The Hills & Far Away
						</p>
					</main>
					<main className="m2">
						<p className="p2">
							Mummy Duck Said Quack Quack Quack Quack But Only Four Little Ducks
							Came Back
						</p>
					</main>
					<main className="m3">
						<p className="p3">
							Five Little Ducks Went Swimming One Day, Over The Hills & Far Away
						</p>
					</main>
				</div>
			</div>
			<div className="image"></div>
		</>
	);
}

export default App;
