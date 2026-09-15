# Cyber-Luxury 3D Portfolio

## Goal
Build a polished, recruiter-ready portfolio for Abhishek K R that feels like one connected futuristic developer workspace while keeping every section readable, responsive, accessible, and truthful to the supplied content.

## Experience
- Create a single scrolling portfolio with a fixed floating navigation bar linking to Home, About, Skills, Projects, Education, and Contact.
- Establish the first viewport with Abhishek’s name, Full Stack Developer title, supplied statement, two actions, and a lightweight interactive 3D workstation scene.
- Carry the same visual world through the page using scroll-reactive camera staging, geometric objects, technical lines, controlled particles, and restrained violet lighting.
- Use dark charcoal surfaces, cool white typography, subtle glass panels, and violet only for hierarchy, active states, and lighting.

## Sections
- **Home:** cinematic entrance, interactive workstation, clear identity, Explore My Work, View Resume placeholder state, and scroll cue.
- **About:** supplied biography presented in short readable blocks beside a developer-profile workstation view.
- **Technical Arsenal:** interactive 3D constellation separating Comfortable With from Currently Learning; hover/focus reveals technology and category without invented scores.
- **What I Build:** expandable showcases for Calculator and the in-development LTL Store, including accurate descriptions, stack labels, and honest “link coming soon” states.
- **How I Build:** compact Learn → Experiment → Build → Solve → Improve progression plus the four supplied principles.
- **Education & Development:** expandable futuristic timeline seeded only with Full Stack Development as an active direction.
- **Contact:** networking-inspired visual, placeholder social contact rows, and a validated contact form that prepares an email locally without pretending a message service exists.
- **Footer:** minimal identity, placeholder social states, and the supplied closing line.

## 3D and Motion
- Use React Three Fiber and Three.js with procedural geometry instead of heavy downloaded models or textures.
- Build one persistent full-page scene whose camera, light, and object emphasis respond to scroll position.
- Add cursor parallax, object hover response, subtle card tilt, and restrained section transitions.
- Keep motion short and intentional; disable nonessential movement under reduced-motion settings.
- Reduce geometry, particles, pixel density, and camera movement on smaller screens; provide a polished CSS fallback when WebGL is unavailable.

## Responsive and Accessible Behavior
- Keep content in semantic HTML above the visual scene, with strong contrast and visible keyboard focus.
- Replace desktop navigation with an accessible animated mobile menu.
- Make interactive skill nodes, project panels, and form controls keyboard usable with clear labels and states.
- Preserve readable content order and simplify spatial layouts rather than shrinking the desktop composition.

## Technical Details
- Install only the required 3D packages: `three`, `@react-three/fiber`, and `@react-three/drei`.
- Keep the browser-only 3D scene isolated behind hydration-safe lazy loading.
- Create reusable navigation, scene, section, project, skill, timeline, and contact components.
- Define the complete visual system as semantic OKLCH tokens in the global stylesheet and load a readable professional webfont in the document head.
- Add route-specific title, description, Open Graph, Twitter card, semantic headings, and accessible 3D labeling.
- Validate desktop and mobile layouts, interaction states, WebGL rendering, reduced-motion behavior, and console output in the live preview.

## Authenticity Boundaries
- Do not add employers, clients, dates, credentials, percentages, metrics, testimonials, social handles, or links not supplied by the user.
- Mark unavailable resume, project, email, and social destinations as editable placeholders rather than fabricating destinations.
