
import { InfographicStyle } from './types';
import { 
  PenTool, 
  Presentation, 
  BookOpen, 
  Cpu, 
  Search, 
  Binary, 
  Coffee, 
  Sparkles, 
  Gamepad2, 
  Hourglass, 
  Activity, 
  Box,
  MessageSquare,
  Map,
  Send,
  Scan,
  Lightbulb,
  Smile,
  Brush,
  Tv,
  Layout,
  Palette,
  Orbit,
  BarChart3,
  Grid3X3,
  ScrollText,
  Monitor
} from 'lucide-react';

export const INFOGRAPHIC_STYLES: InfographicStyle[] = [
  {
    id: 'miniature',
    name: 'Miniature Diorama',
    description: 'Tilt-shift toy world aesthetic. Tiny plastic figures, vibrant colors, and shallow depth of field.',
    icon: 'Grid3X3',
    promptModifier: "Render the infographic as a realistic, meticulously researched miniature diorama. The layout should mimic a professional urban planning model or a geographic relief map. Use a tilt-shift photography effect with a very shallow depth of field (blurred top/bottom, sharp center). Everything should look like high-quality plastic or resin miniatures. If the input relates to a location, use accurate architectural styles and street layouts as if it were a high-fidelity physical scale model. Integrate text and charts as physical signs, tiny billboards, or markings on the ground of the diorama."
  },
  {
    id: 'sac_phong',
    name: 'Royal Edict (Sắc Phong)',
    description: 'Official imperial decree style with dragon borders, calligraphy, and hierarchical layout.',
    icon: 'ScrollText',
    promptModifier: "Render the infographic as an authentic Vietnamese Royal Edict (Sắc Phong). The layout must be a long, vertical scroll on textured 'Giấy Long Đằng' (yellow dragon paper) with ornate dragon borders in gold and red. The content should be strictly hierarchical: 1. 'Concept' as the Decree Title in bold, faux-calligraphy. 2. 'Data' organized into ancient tables or diagrams within the scroll body. 3. 'Conclusion' stamped with a large, vermilion Royal Seal (Ấn Tín) at the bottom. Use traditional patterns (clouds, lotus) and maintain a regal, authoritative aesthetic."
  },
  {
    id: 'google_slide',
    name: 'Google Slide Deck',
    description: 'Modern, clean corporate presentation slides with Material Design aesthetics.',
    icon: 'Monitor',
    promptModifier: "Render the infographic as a high-fidelity Google Slide Deck slide. Use a clean, professional layout with a white background and Material Design elements (soft shadows, rounded corners, Roboto typography). Use the Google brand colors (Blue #4285F4, Red #DB4437, Yellow #F4B400, Green #0F9D58) for accents and data visualization. Structure the slide with a clear Title (Concept), a main content area with modern charts or bullet points (Data), and a highlighted 'Key Takeaway' footer or sidebar (Conclusion). The look should be corporate, polished, and presentation-ready."
  },
  {
    id: 'bain_impact',
    name: 'Bain Impact',
    description: 'Data-centric management consulting style. High-impact metrics, bold KPIs, and crimson accents.',
    icon: 'BarChart3',
    promptModifier: "Render the infographic in a premium 'Bain & Company' management consulting style. The design must be extremely data-centric, prioritizing the visualization of hard numbers, percentages, and key metrics. Use a professional color palette of deep crimson red, slate grey, and pure white. Features should include large call-out numbers for KPIs, structured data grids, and stylized business charts. The layout should be rigorous and logical, with clear horizontal or vertical flow, ensuring that the most important figures are the immediate focal point."
  },
  {
    id: 'tranh_dong_ho',
    name: 'Tranh Đông Hồ',
    description: 'Phong cách tranh dân gian Việt Nam truyền thống, in trên giấy điệp với màu sắc tự nhiên.',
    icon: 'Palette',
    promptModifier: "Render the infographic in the authentic Tranh Đông Hồ traditional Vietnamese folk art style. Use the aesthetic of a woodblock print on 'Giấy Điệp' (rough, sparkling handmade paper made from shell powder). The color palette must strictly use traditional natural pigments: vermillion red, charcoal black, oyster shell white, indigo blue, and turmeric yellow. Include thick, rustic black outlines and stylized, symbolic imagery. The overall composition should be flat, expressive, and carry the nostalgic charm of ancient Vietnamese rural art."
  },
  {
    id: 'cosmic_universe',
    name: 'Cosmic Universe',
    description: 'Awe-inspiring space theme featuring black holes, quasars, and vibrant nebulas.',
    icon: 'Orbit',
    promptModifier: "Render the infographic as a magnificent cosmic landscape set in deep space. The background should be a dense star field with vibrant, swirling nebulas in shades of deep violet, electric magenta, and celestial teal. Feature a massive black hole with a glowing, high-contrast accretion disk and brilliant relativistic jets. Integrate data points and text as glowing celestial markers, constellations, or energy streams emanating from a central quasar. The aesthetic should be epic, cinematic, and awe-inspiring, with a sense of immense scale and the mysterious beauty of the deep universe."
  },
  {
    id: 'engineering',
    name: 'Engineering Annotations',
    description: 'Technical overlays, handwritten labels, measurements, and schematic structures.',
    icon: 'PenTool',
    promptModifier: 'Overlay stylized technical engineering annotations and simplified diagrams directly onto the image. Include handwritten labels, key measurements, and schematic representations of internal structures, forces, or functional aspects. The annotations should follow an architectural or engineering notebook aesthetic: thin white lines, sketch-like strokes, clear text, and subtle glow. Integrate the annotations seamlessly, matching perspective and object contours.'
  },
  {
    id: 'whiteboard',
    name: "Professor's Whiteboard",
    description: 'Diagrams, arrows, and notes on a realistic whiteboard surface.',
    icon: 'Presentation',
    promptModifier: "Transform the content into the image of a professor's whiteboard. Create diagrams, connecting arrows, boxes, flowcharts, and summarizing captions that explain the core idea visually. Use a variety of colored dry-erase markers (black, red, blue, green). Make it look like a realistic photograph of a used whiteboard hanging on a wall, complete with eraser marks, smudges, reflections from overhead lights, and worn marker trays."
  },
  {
    id: 'naturalist',
    name: "Naturalist's Journal",
    description: '19th-century field guide aesthetic with watercolor and sepia notes.',
    icon: 'BookOpen',
    promptModifier: "Treat the image as a page in a 19th-century biologist’s field guide. Overlay detailed watercolor and ink illustrations that dissect or classify the subjects. Add handwritten cursive notes in sepia ink identifying species, behavioral observations, and cross-section diagrams. The aesthetic should feel organic, with textured paper grain, ink bleed, and a muted, natural color palette."
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk HUD',
    description: 'Neon augmented reality interface with tactical data and glitch effects.',
    icon: 'Cpu',
    promptModifier: "Transform the image into a first-person view through augmented reality glasses in a cyberpunk future. Overlay glowing, neon-colored digital information streams onto the environment. Include elements like tactical data, facial recognition brackets, GPS waypoints, hazard warnings, and scrolling code. The aesthetic should be high-tech, slightly glitched, with scan lines and lens flares, dominant in electric blues, purples, and greens."
  },
  {
    id: 'noir',
    name: 'Noir Detective Board',
    description: 'Cluttered corkboard with red string, polaroids, and clippings.',
    icon: 'Search',
    promptModifier: "Reorganize the subject onto a cluttered detective's corkboard. The image elements might be cut into 'polaroids' pinned to the board. Add red string connecting disparate clues, handwritten index cards with theories, newspaper clippings, thumbtacks, and coffee stains. The lighting should be dim and moody, suggesting a late-night investigation."
  },
  {
    id: 'blueprint',
    name: 'Vintage Sci-Fi Blueprint',
    description: 'Retro-futuristic cyanotype with pseudo-scientific labels.',
    icon: 'Binary',
    promptModifier: "Convert the image into a retro-futuristic blueprint from the 1950s (cyanotype). The image should be monochrome blue and white. Overlay fantastical, pseudo-scientific explanations for common objects, labeling them with retro fonts as if they were atomic-age inventions. Include stamp blocks for 'Top Secret clearance' and 'Department of Future Technology'."
  },
  {
    id: 'napkin',
    name: 'Napkin Pitch Sketch',
    description: 'Rough ballpoint pen sketch on a textured cocktail napkin.',
    icon: 'Coffee',
    promptModifier: "Visualize the concept as a quick, rough sketch on a cocktail napkin. The drawing should look hastily done with a cheap ballpoint pen, featuring simple stick figures, basic boxes and arrows, and underlined keywords. The napkin itself should look realistic, textured, slightly crumpled, perhaps with a coffee ring stain."
  },
  {
    id: 'magic',
    name: 'Arcane Mage Sight',
    description: 'Glowing sigils, runes, and energy leylines overlay.',
    icon: 'Sparkles',
    promptModifier: "View the reality through 'mage sight.' Overlay glowing, arcane sigils, geometric rune patterns, and flowing energy leylines. Show magical auras radiating from living things or powerful objects. The annotations should look like ancient, glowing script rather than technical data, using deep golds, ethereal blues, and fiery oranges. The energy should appear to warp the air slightly."
  },
  {
    id: 'game_gui',
    name: 'Video Game UI',
    description: 'Loot drops, health bars, and quest objectives overlay.',
    icon: 'Gamepad2',
    promptModifier: "Overlay a complete video game UI onto the scene. Turn objects into interactable loot with floating item descriptions and rarity colors. Add health and mana bars, a mini-map radar, and an active 'Quest Objective' text overlay related to the action in the image."
  },
  {
    id: 'ghost',
    name: 'Historical Ghost Layer',
    description: 'Semi-transparent historical outlines overlapping modern reality.',
    icon: 'Hourglass',
    promptModifier: "Overlay semi-transparent, ghostly outlines of the past onto the scene. Show previous architecture, horse-drawn carriages, or historical figures overlapping with the modern scene. Use a desaturated, sepia-toned, slightly blurry aesthetic for the historical layer to differentiate it from the sharp, full-color modern reality."
  },
  {
    id: 'emotional',
    name: 'Synesthetic Data Map',
    description: 'Abstract watercolors representing mood, sound, and emotion.',
    icon: 'Activity',
    promptModifier: "Overlay an abstract visualization of the mood or sound of the image. Use flowing, watercolor-like plumes of color to represent emotional tones (e.g., jagged red lines for stress, calm blue waves for quiet). Translate sounds into visual waveforms that ripple across the landscape. The aesthetic should be artistic and interpretive."
  },
  {
    id: 'ikea',
    name: 'Deconstructed Assembly',
    description: 'Isometric, exploded view diagrams with Swedish-style instructions.',
    icon: 'Box',
    promptModifier: "Explode the main subject into an isometric, wordless assembly diagram in the style of IKEA instructions. Show the components hovering apart with dotted lines indicating connections. Use thick black outlines, flat white fill, and the iconic confused little cartoon person. Add a fake product name in a faux-Swedish style."
  },
  {
    id: 'comic',
    name: 'Vintage Comic Panel',
    description: 'Bold ink lines, halftone dots, and dramatic speech bubbles.',
    icon: 'MessageSquare',
    promptModifier: "Render the image in the style of a vintage American comic book from the 1960s. Use bold black ink outlines, dramatic shading, and visible Ben-Day dots (halftone pattern). Colors should be vibrant but limited in palette (cyan, magenta, yellow, black). Add dramatic text captions in rectangular boxes and dynamic sound effect visualizations where appropriate."
  },
  {
    id: 'metro',
    name: 'Subway System Map',
    description: 'Abstract colored lines and station nodes connecting elements.',
    icon: 'Map',
    promptModifier: "Reimagine the image as a stylized transit map (like the London Tube or NYC Subway map). Represent key elements as 'stations' (white circles with black outlines) and connections as thick, color-coded geometric lines running at 45 or 90-degree angles. The background should be a clean, solid color (white or light beige). Simplify complex shapes into iconic symbols."
  },
  {
    id: 'origami',
    name: 'Papercraft World',
    description: 'Folded paper textures, sharp creases, and low-poly aesthetics.',
    icon: 'Send',
    promptModifier: "Transform everything in the scene into folded paper origami figures. The aesthetic should feature sharp creases, straight edges, and a low-poly geometric look. Use subtle paper textures and realistic lighting that casts soft shadows to emphasize the depth of the folds. The color palette should look like high-quality craft paper."
  },
  {
    id: 'xray',
    name: 'Medical X-Ray',
    description: 'Inverted monochrome transparency revealing internal structures.',
    icon: 'Scan',
    promptModifier: "Simulate a medical X-ray or MRI scan of the subject. The image should be monochrome (black, white, and shades of blue/grey) with an inverted appearance where dense materials are bright white and softer materials are translucent. Reveal hidden internal structures, skeletons, or mechanical frameworks beneath the surface. Add clinical cross-hairs and medical data overlays."
  },
  {
    id: 'neon',
    name: 'Neon Signage',
    description: 'Glowing glass tubes against a dark brick or night background.',
    icon: 'Lightbulb',
    promptModifier: "Convert the subject into a vibrant, glowing neon sign mounted on a dark, textured brick wall at night. The lines should be represented by bent glass tubes filled with luminescent gas (bright reds, blues, pinks, and greens). Include the mechanical details of the sign: black cables, metal supports, and transformers. Add a strong glow effect that illuminates the surrounding wall."
  },
  {
    id: 'clay',
    name: 'Plasticine Claymation',
    description: 'Soft, malleable clay textures with fingerprints and stop-motion feel.',
    icon: 'Smile',
    promptModifier: "Render the scene in a stop-motion claymation style (like Aardman Animations). Objects and characters should look like they are made of soft, malleable plasticine clay. Include subtle details like fingerprints on the surfaces and slightly imperfect, hand-sculpted shapes. The lighting should be studio-style, emphasizing the texture and volume of the clay."
  },
  {
    id: 'cartoon',
    name: 'Cartoon-ize',
    description: 'Vibrant 3D animation style with soft, rounded shapes and cinematic lighting.',
    icon: 'Brush',
    promptModifier: "Transform the image into a high-quality 3D animated movie style (like Pixar or Dreamworks). Use soft, rounded shapes, expressive features, and vibrant, saturated colors. The lighting should be warm and cinematic, emphasizing the volume, material texture, and character of every element in the scene."
  },
  {
    id: 'anime',
    name: 'Anime-ize',
    description: 'High-detail Japanese animation style with emotional lighting.',
    icon: 'Tv',
    promptModifier: "Render the scene in a high-detail modern anime style (reminiscent of Studio Ghibli or Makoto Shinkai films). Focus on cinematic lighting, dramatic lens flares, and painterly backgrounds. Use vibrant colors and a distinct cel-shaded aesthetic for characters and objects. The atmosphere should feel vast and emotionally resonant."
  },
  {
    id: 'consulting',
    name: 'McKenzie Slidedeck',
    description: 'Clean, structured strategy consulting aesthetic for high-level presentations.',
    icon: 'Layout',
    promptModifier: "Reformat the content into a high-end strategic consulting slide. Use a clean, minimalist layout with a professional corporate color palette (navy blue, slate grey, white). Include executive-level visual aids like structured frameworks, data-driven diagrams, and high-clarity typography. The overall aesthetic should be authoritative, sharp, and optimized for board-level presentations."
  }
];
