
# Full-Width Video Scroll Animation

A captivating web project that transforms a passive video into an interactive storytelling experience. By linking the video's playback to the user's scroll position, this project creates an immersive and engaging journey.

## Live Demo

A live demonstration and a detailed explanation of the code can be found in the accompanying article on Medium:

[**Interactive Storytelling: Scroll-linked Video Animations with GSAP**](https://medium.com/@i_72880/interactive-storytelling-scroll-linked-video-animations-with-gsap-87bdf8fb045b)

## How It Works

The project uses the GreenSock Animation Platform (GSAP) to link the browser's scroll position to the video's current time. Specifically, it leverages GSAP's ScrollTrigger plugin to scrub the video's timeline as the user scrolls.

The core logic involves:

1. Creating a GSAP timeline that controls the video playback.

2. Using ScrollTrigger to bind this timeline to the page's scroll progress.

3. Mapping the scroll position to the video's duration, so that a full scroll completes the video playback.

## Technologies Used

* **Next.js:** The React framework used for the project structure.
* **HTML5:** For the page structure and the `<video>` element.
* **CSS3:** For styling the page and ensuring the video is full-width and responsive.
* **JavaScript:** To handle the GSAP integration and video element.
* **GSAP (GreenSock Animation Platform):** The powerful animation library used to create the scroll-linked video scrubbing effect.
* **ScrollTrigger Plugin:** A GSAP plugin that makes it easy to create scroll-based animations.

## Installation and Usage

To get started with this project, follow these simple steps:

1. **Clone the repository:**

```

git clone [https://github.com/danielalbinsson/fullwidth-video-scroll.git]

```

2. **Navigate to the project directory:**

```

cd fullwidth-video-scroll

```

3. **Install dependencies:**

```

pnpm install

```

4. **Run the development server:**

```

pnpm dev

```

## Credits

This project and the accompanying Medium article were both created by [Daniel Albinsson](https://github.com/danielalbinsson).

## License

This project is licensed under the MIT License.
```
