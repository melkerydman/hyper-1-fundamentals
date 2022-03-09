# Hyper Island - Fundamentals 1

My first project for FED23 at Hyper Island. A site that fetches images from Unsplash's API and presents them in two different ways.

### :briefcase: Brief:

Design and develop a personal portfolio or blog... or whatever you like. The primary objective was to build upon our fundamental HTML, CSS and JavaScript skills.

### :mantelpiece_clock: Time frame:

6 weeks.

### :dart: Goals:

I didn't really have a clear cut idea while going into the project but knew I wanted to:

- Play around with visual elements and animation.
- Find source of inspiration and try to recreate it in my own way.
- Find a base recipe for folder structure to keep code organized.
- Explore JS and challenge myself.

### :fountain: Idea:

Looking around for inspiration I found Studio Push (https://studio-push.com/) and Studio Otto (https://studio-otto.com/) and went from there. I realized that I would need a source for images, which first meant hard-coding images in a JSON file before eventually incorporating the Unsplash API.

The images are then presented as "click and drag" on HTML Canvas in page "explore", and as infinitely scrollable columns in "gallery", which display info as well as pausing scroll on hover.

In the background there is a rolling sky full of stars created purely with JS.

### :mount_fuji: Challenges:

While responsive design wasn't my primary focus I knew that I would like to make sure the columns with images adapted to the width of the screen, going from five to two on smaller screens. Writing the JavaScript for this turned out to be one of the biggest challenges I faced. There is probably a lot of room for improvement here to make the code both more streamlined and dynamic.

Another challenge was the infinite auto-scroll functionality of the columns. I used a tutorial (https://www.youtube.com/watch?v=6qf3_KAAVQA&ab_channel=ConorBailey) for the infinite scroll and reached out to my good friend Google for hints on how to solve the auto-scroll issue.

Having no real prior experience of async JavaScript I also struggled quite a bit when it came to fetching the images from the Unsplash API, primarily while trying to break down the JavaScript files into multiple ones. However it became a good lesson on both JS Modules and async/await.

Since Unsplash restricts the amount of requests you're allowed to make I was forced to store the images in some way which led to me using Local Storage, which was a good challenge in itself.

Setting up Webpack and .env-file to hide API key was also quite the struggle, having no prior experience doing that.

### :spiral_notepad: Learnings:

- JavaScript modules
- Async/await
- Fetching data
- Storing data in Local Storage
- Mobile first makes responsive design so much easier - the other way around makes it harder...
- Having an idea and planning beforehand trumphs a "do as you go" approach.
- Documentation should be done continously.

<<<<<<< HEAD
### :sparkle: Updates:

- Added backend server
- Deployed frontend to Netlify and backend to Heroku

### :peacock: Future updates:

- Single-page layout for consistent background animation
- Rework of JS file structure - better use of modules
- Design update
- Change the data retrieved from Unsplash, e.g. currently location often returns null

### :computer: Tech used:

- Figma
- GitHub
- HTML
- CSS
- SASS
- JavaScript
- JSON
- Unsplash API
- Webpack
